// import React, { createContext, useContext } from "react";
// import { useReviewReducer } from './reducers'

// const ReviewContext = createContext();
// const { Provider } = ReviewContext;

// const ReviewProvider = ({ value = [], ...props }) => {
//   const [state, dispatch] = useReviewReducer({
//     reviews: [],
//     comments: [],
//   });

//   return <Provider value={[state, dispatch]} {...props} />;
// };

// const useReviewContext = () => {
//   return useContext(ReviewContext);
// };

// export { ReviewProvider, useReviewContext };