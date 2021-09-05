import React, { useState } from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const App = () => {
  const [count, setCount] = useState(0);
  const inc = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={inc}>
        <ThumbUpIcon></ThumbUpIcon>
      </button>
      {count}
    </div>
  );
};
export default App;
