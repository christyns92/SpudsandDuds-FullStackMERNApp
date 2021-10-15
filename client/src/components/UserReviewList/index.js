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
      margin: "2px",
    },
    isRounded: {
      borderRadius: "10px",
      margin: "2px",
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
                <div
                  key={review._id}
                  className="mx-auto card mb-3"
                  style={styles.isRounded}
                >
                  <h4
                    style={styles.isRounded}
                    className="card-header bg-primary text-light p-2 m-0"
                  >
                    {showUsername ? (
                      <Link
                        className="text-light"
                        to={`/profiles/${review.reviewAuthor}`}
                      >
                        {review.reviewAuthor} <br />
                        <h3>
                          Review for {review.movieTitle} <br />
                        </h3>
                        <p> posted on {review.createdAt}</p>
                      </Link>
                    ) : (
                      <>
                        <h3>
                          Review for {review.movieTitle} <br />
                        </h3>
                        <p> posted on {review.createdAt}</p>
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
                    <div className="potato-rating">
                      {[...Array(5)].map((potato, index) => {
                        index += 1;
                        return (
                          <button
                            type="button"
                            key={index}
                            className={
                              index <= review.potatoRating ? "on" : "off"
                            }
                          >
                            <span className="potato">&#129364;</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {editMode ? (
                    <div
                      style={styles.isRounded}
                      className="card-body bg-info p-2"
                    >
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
                      <button className="btn btn-info edit-review">
                        Finish Edit
                      </button>
                    </div>
                  ) : (
                    <div className="card-body bg-info p-2">
                      <p>{review.reviewText}</p>
                    </div>
                  )}
                  <button
                    onClick={() => setEditMode(true)}
                    type="button"
                    className="btn btn-info edit-review"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(event) => {
                      removeReviewHandler(event, review._id);
                    }}
                    className="btn btn-info delete-review"
                  >
                    Delete
                  </button>
                  <Link
                    style={styles.isRounded}
                    className="btn btn-info btn-block theMovieRundown radius-bottom no-radius-tl no-radius-tr"
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
