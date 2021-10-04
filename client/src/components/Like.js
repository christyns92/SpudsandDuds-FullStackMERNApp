import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

function Like(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(JSON.parse(window.localStorage.getItem('count')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('count', count);
  }, [count]);

  const handleDislike = () => {
    console.log(`Dislike clicked for ${props.reviewId}`);
    return setCount(count - 1)
  }

  const handleLike = () => {
    console.log(`Like clicked for ${props.reviewId}`);
    return setCount(count + 1);
  };

  return (
    <div className="App">
      <h3>{count}</h3>
      <button className="likeIcon" onClick={handleLike}><ThumbUpIcon></ThumbUpIcon></button>
      <button className="likeIcon" onClick={handleDislike}><ThumbDownIcon></ThumbDownIcon></button>
    </div>
  );
}
export default Like;