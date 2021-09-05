import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_REVIEW } from "../../utils/mutations";
import { QUERY_REVIEWS, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import PotatoRating from "../PotatoRating/PotatoRating";

const ReviewForm = () => {
  const [reviewText, setReviewText] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addReview, { error }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      try {
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: { reviews: [addReview, ...reviews] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // console.log(me);
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, reviews: [...me.reviews, addReview] } },
      // });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addReview({
        variables: {
          reviewText,
          reviewAuthor: Auth.getProfile().data.username,
        },
      });

      setReviewText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "reviewText" && value.length <= 280) {
      setReviewText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>

      <br></br>
      
      

      {Auth.loggedIn() ? (
        
      <div className="reviewContainer">
      <h3>Was this movie a Spud or Dud?</h3>
      <div className="row">
        <br></br>
      <h5 className="col-12">Give it a rating and leave a review!</h5>
      <div className="col-12"><PotatoRating/></div>

      </div>
      
      
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9 no-padding">
              <textarea
                name="reviewText"
                placeholder="my Spud or Dud review..."
                value={reviewText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-info py-3" type="submit">Submit
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
          </div>
      ) : (
        <p>
          You need to be logged in to share your reviews. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ReviewForm;
