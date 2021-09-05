import React, { useState } from "react";
import "./PotatoRating.css";

const PotatoRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  console.log(rating);

  return (
    <div className="potato-rating">
      {[...Array(5)].map((potato, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="potato">&#129364;</span>
          </button>
        );
      })}
    </div>
  );
};

export default PotatoRating;
