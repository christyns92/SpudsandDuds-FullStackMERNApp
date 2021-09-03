import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from "@apollo/client";
import { REMOVE_REVIEW } from "../../utils/mutations";
import { QUERY_REVIEWS } from "../../utils/queries";

import Auth from "../../utils/auth";

const UserReviewList = ({
  reviews,
  title,
  showTitle = true,
  showUsername = true,
  }) => {

  const [removeReview, { error }] = useMutation(REMOVE_REVIEW, {
    update(cache, { data: { review } }) {
      try {
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

        const newReviews = reviews.filter((r) => (r._id !== review._id));

        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: { reviews: [...newReviews] },
        });

      } catch (e) {
        console.error(e);
      }
    }
  })

  const removeCommentHandler = async (event, _id) => {
    event.preventDefault();

    try {
      const { data } = await removeReview({
        variables: {
          reviewId: _id
        },
      });

      removeReview();

    } catch (err) {
      console.error(err);
    }
  };

  if (!reviews.length) {
    return <h3>No Reviews Yet</h3>;
  }


  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {Auth.loggedIn() ? (
        <>
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${review.reviewAuthor}`}
                >
                  {review.reviewAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this review on {review.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this review on {review.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{review.reviewText}</p>
            </div>
            <button type="button" className="btn btn-default edit-review">Edit</button>
            <button onClick={(event) => {removeCommentHandler(event, review._id)}} className="btn btn-default delete-review">Delete</button>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/reviews/${review._id}`}
            >
              Join the discussion on this review.
            </Link>
          </div>
        ))}
        </>
        ) : (
          <p>
            You need to be logged in to share your reviews. Please{' '}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
          )}
    </div>
  );
};

export default UserReviewList;
