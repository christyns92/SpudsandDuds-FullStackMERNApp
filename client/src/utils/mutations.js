import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($reviewText: String!, $movieTitle: String!, $movieImg: String!, $potatoRating: Int!) {
    addReview(reviewText: $reviewText, movieTitle: $movieTitle, movieImg: $movieImg, potatoRating: $potatoRating) {
      _id
      reviewText
      reviewAuthor
      createdAt
      movieTitle
      movieImg
      potatoRating
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($reviewId: ID!, $commentText: String!) {
    addComment(reviewId: $reviewId, commentText: $commentText) {
      _id
      reviewText
      reviewAuthor
      createdAt
      movieTitle
      movieImg
      potatoRating
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_REVIEW = gql`
  mutation removeReview($reviewId: ID!) {
    removeReview(reviewId: $reviewId) {
      _id
    }
  }
`;

export const REMOVE_MAINREVIEW = gql`
  mutation removeMainReview($reviewId: ID!) {
    removeMainReview(reviewId: $reviewId) {
      _id
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($reviewId: ID!, $commentId: ID!) {
    removeComment(reviewId: $reviewId, commentId: $commentId) {
      _id
      comments {
        _id
      }
    }
  }
`;

export const EDIT_REVIEW = gql`
  mutation editReview($reviewId: ID!, $reviewText: String!) {
    editReview(reviewId: $reviewId, reviewText: $reviewText) {
      _id
      reviewText
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation editComment($reviewId: ID!, $commentId: ID!, $commentText: String!) {
    editComment(
      reviewId: $reviewId
      commentId: $commentId
      commentText: $commentText
    ) {
      _id
      comments {
        _id
        commentText
      }
    }
  }
`;
