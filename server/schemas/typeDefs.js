const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    reviews: [Review]!
  }

  type Review {
    _id: ID
    reviewText: String
    reviewAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview(reviewText: String!): Thought
    addComment(reviewId: ID!, commentText: String!): Review
    removeTReview(reviewId: ID!): Review
    removeComment(reviewId: ID!, commentId: ID!): Review
  }
`;

module.exports = typeDefs;
