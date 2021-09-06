import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from '@material-ui/icons/ThumbDown';


function Like() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(JSON.parse(window.localStorage.getItem('count')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('count', count);
  }, [count]);

  const increaseCount = () => {
    return setCount(count + 1);
  }
  const decreaseCount = () => {
    return setCount(count - 1)
  }

  return (
    <div className="App">
      <h3>{count}</h3>
      <button className="likeIcon" onClick={increaseCount}><ThumbUpIcon></ThumbUpIcon></button>
      <button className="likeIcon" onClick={decreaseCount}><ThumbDownIcon></ThumbDownIcon></button>
    </div>
  );
}
export default Like;