const { AuthenticationError } = require("apollo-server-express");
const { User, Review } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("reviews");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("reviews");
    },
    reviews: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Review.find(params).sort({ createdAt: -1 });
    },
    review: async (parent, { reviewId }) => {
      return Review.findOne({ _id: reviewId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them (?)
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("reviews");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addReview: async (parent, { reviewText, movieTitle, movieImg, potatoRating }, context) => {
      if (context.user) {
        const review = await Review.create({
          reviewText,
          reviewAuthor: context.user.username,
          movieTitle,
          movieImg,
          potatoRating
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { reviews: review._id } }
        );

        return review;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { reviewId, commentText }, context) => {
      if (context.user) {
        return Review.findOneAndUpdate(
          { _id: reviewId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    editReview: async (_, { reviewId, reviewText }) => {
      const review = await Review.findOneAndUpdate(
        { _id: reviewId },
        { reviewText: reviewText },
        { new: true }
      );
      if (!review) {
        throw new Error(`Couldn’t find review with id ${reviewId}`);
      }
      console.log(review);
      return review;
    },
    removeReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const review = await Review.findOneAndDelete({
          _id: reviewId,
          reviewAuthor: context.user.username,
        });

        const userReviews = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { reviews: review._id } },
          { new: true }
        );

        return review;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
