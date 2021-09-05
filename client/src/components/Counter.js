import React, { useState } from "react";
import FaThumbsUp from "react-icons/fa";
const App = () => {
  const [count, setCount] = useState(0);
  const inc = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={inc}>+</button>
      {count}
    </div>
  );
};
export default App;
