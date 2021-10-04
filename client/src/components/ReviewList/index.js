import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { REMOVE_REVIEW } from "../../utils/mutations";
import { EDIT_REVIEW } from "../../utils/mutations";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import Like from "../Like";

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

  if (!reviews.length) {
    return <h3>No Reviews Yet</h3>;
  }

  return (
    <div className="theMovieRundown">
      {showTitle && <h3 className="text-align-left">{title}</h3>}
      {post &&
        post.map((review) => (
          <div
            key={review._id}
            className="mx-auto card mb-4 row reviewListContainer"
          >
            <div className="col-lg-4 col-md-12 posterContainer bg-primary">
              <img
                alt={review.movieTitle}
                className="img-fluid reviewListPoster"
                src={review.movieImg}
              />
            </div>
            <div className="col-lg-8 col-md-12 reviewContainer bg-primary">
              <h4 className="card-header bg-primary text-light p-2 text-align-left">
                {showUsername ? (
                  <div>
                    <div className="row">
                      <Link
                        className="text-light col-lg-4"
                        to={`/profiles/${review.reviewAuthor}`}
                      >
                        <h3 className="movieTitle">{review.reviewAuthor}</h3>
                        <span> reviewed</span>
                      </Link>
                      <div className="col-lg-8 reviewList potato-rating text-align-right">
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
                              <span className="potato">&#129364; </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div></div>
                    <h2 className="col-md-12 text-info movieTitle">
                      {review.movieTitle}
                    </h2>
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
                {review.reviewAuthor === user.username ? (
                  <div className="text-align-right">
                    <button
                      onClick={() => setEditMode(true)}
                      type="button"
                      className="btn btn-info edit-review"
                    >
                      <EditIcon />
                    </button>

                    <button
                      onClick={(event) => {
                        removeReviewHandler(event, review._id);
                      }}
                      className="btn btn-info delete-review"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                ) : (
                  <div className="hiddenDiv"></div>
                )}
              </div>

              <div>
                {review.reviewAuthor === user.username && editMode ? (
                  <div className="card-body bg-primary p-2 theMovieRundown">
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
                  <div className="card-body theMovieRundown bg-info p-2">
                    <p>{review.reviewText}</p>
                  </div>
                )}

                <h6 className="timeStamp">on {review.createdAt}</h6>
              </div>
              {/* <h3>How was this review?</h3> */}
              <div className="likeCountContainer text-align-center">
                <Like reviewId={review._id} />
              </div>

              {/* end of right hand side div */}
            </div>
            <Link
              className="btn btn-info btn-block theMovieRundown radius-bottom no-radius-tl no-radius-tr"
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
