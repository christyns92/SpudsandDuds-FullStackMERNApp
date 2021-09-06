import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { REMOVE_REVIEW } from "../../utils/mutations";
import { EDIT_REVIEW } from "../../utils/mutations";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import Like from "../Like"

const ReviewList = ({
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

  const { username: userParam } = useParams();

  // If there is no `username` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // console.log(user.username);

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
  console.log(editMode);

  // let rating = 3;

  if (!reviews.length) {
    return <h3>No Reviews Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3 className="text-align-center">{title}</h3>}
      {post &&
        post.map((review) => (
          <div key={review._id} className="mx-auto card mb-3" style={styles.isRounded}>
            <h4
              style={styles.isRounded}
              className="card-header bg-info text-light p-2 m-0"
            >
              {showUsername ? (
                <div>

                <Link
                  className="text-light col-6"
                  to={`/profiles/${review.reviewAuthor}`}
                >
                  {review.reviewAuthor} <br />
                  <span style={{ fontSize: "1rem" }}>
                    Review for {review.movieTitle} <br />
                    posted on {review.createdAt}
                  </span>
                </Link>
                <span style={{ fontSize: "1rem" }}>
              </span>

                </div>
                
              ) : (
                <>
                  <span style={{ fontSize: "1rem" }}>
                    You had this review on {review.createdAt}
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
            <div className="potato-rating">
              {[...Array(5)].map((potato, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={index <= (review.potatoRating) ? "on" : "off"}
                  >
                    <span className="potato">&#129364;</span>
                  </button>
                );
              })}
            </div>
            <div style={styles.isRounded}>
              {review.reviewAuthor === user.username && editMode ? (
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
                <div
                  style={styles.isRounded}
                  className="card-body bg-light p-2"
                >
                  <p>{review.reviewText}</p>
                </div>
              )}
            </div>
            <div>
              {review.reviewAuthor === user.username ? (
                <div>
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
                </div>
              ) : null}
            </div>
            <Like reviewId={review._id} />
            <Link
              style={styles.isRounded}
              className="btn btn-info btn-block btn-squared"
              to={`/reviews/${review._id}`}
            >
              Join the discussion on this review.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ReviewList;
