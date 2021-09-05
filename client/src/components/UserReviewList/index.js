import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { REMOVE_REVIEW } from "../../utils/mutations";
import { EDIT_REVIEW } from "../../utils/mutations";

import Auth from "../../utils/auth";

const UserReviewList = ({
  reviews,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  const styles = {
    editText: {
      border: "2px solid rgb(112, 70, 46)",
      borderRadius: "4px",
    },
  };

  const [post, setPost] = useState("");
  useEffect(() => {
    setPost(reviews);
  }, [reviews]);

  const [removeReview, { error }] = useMutation(REMOVE_REVIEW);

  const removeReviewHandler = async (event, _id) => {
    event.preventDefault();

    try {
      const { data } = await removeReview({
        variables: {
          reviewId: _id,
        },
      });
      console.log(data);
      const newReviews = await post.filter(
        (r) => r._id !== data.removeReview._id
      );

      setPost(newReviews);
      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const [editReview, { err }] = useMutation(EDIT_REVIEW);

  const handleEdit = async (_id, textContent) => {
    try {
      const { data } = await editReview({
        variables: {
          reviewId: _id,
          reviewText: textContent,
        },
      });

      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const [editMode, setEditMode] = useState(false);

  if (!reviews.length) {
    return <h3>No Reviews Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {Auth.loggedIn() ? (
        <>
          {post
            ? post.map((review) => (
                <div key={review._id} className="card mb-3">
                  <h4 className="card-header bg-primary text-light p-2 m-0">
                    {showUsername ? (
                      <Link
                        className="text-light"
                        to={`/profiles/${review.reviewAuthor}`}
                      >
                        {review.reviewAuthor} <br />
                        <span style={{ fontSize: "1rem" }}>
                        Review for {review.movieTitle} <br />
                        posted on {review.createdAt}
                        </span>
                      </Link>
                    ) : (
                      <>
                        <span style={{ fontSize: "1rem" }}>
                        Review for {review.movieTitle} <br />
                        posted on {review.createdAt}
                        </span>
                      </>
                    )}
                  </h4>
                  <div>
                    <img
                      alt={review.movieTitle}
                      className="img-fluid"
                      src={review.movieImg}
                      style={{ margin: "0 auto" }}
                    />
                  </div>
                  {editMode ? (
                    <div className="card-body bg-light p-2">
                      <p
                        style={styles.editText}
                        contentEditable="true"
                        suppressContentEditableWarning={true}
                        onBlur={(e) =>
                          handleEdit(review._id, e.currentTarget.textContent)
                        }
                      >
                        {review.reviewText}
                      </p>
                    <button>Finish Edit</button>
                    </div>
                  ) : (
                    <div className="card-body bg-light p-2">
                      <p>{review.reviewText}</p>
                    </div>
                  )}
                  <button
                    onClick={() => setEditMode(true)}
                    type="button"
                    className="btn btn-default edit-review"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(event) => {
                      removeReviewHandler(event, review._id);
                    }}
                    className="btn btn-default delete-review"
                  >
                    Delete
                  </button>
                  <Link
                    className="btn btn-primary btn-block btn-squared"
                    to={`/reviews/${review._id}`}
                  >
                    Join the discussion on this review.
                  </Link>
                </div>
              ))
            : null}
        </>
      ) : (
        <p>
          You need to be logged in to share your reviews. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default UserReviewList;
