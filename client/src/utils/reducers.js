import { useReducer } from 'react';
// Import our actions from our actions file
import {
    REMOVE_REVIEW,
    UPDATE_REVIEW,
  } from './actions';
  
  // Create a function that will handle combining two objects. Accepts state and an action as an argument.
  // export default function reducer(state, action) {
    // Depending on the action we create a new version of state after the desired action is preformed
    // switch (action.type) {
      // Take a copy of state and return it with a modified version of the students array excluding the `student.id` in `action.payload`
      // case REMOVE_REVIEW: {
      //   return {
      //     ...state,
      //     reviews: [...state.reviews].filter(
      //       (review) => review.id !== action.payload
      //     ),
      //   };
      // }
      // case UPDATE_REVIEW: {
        // Find the index of the student who has an id that matches the one in the payload
        // const reviewIndex = state.reviews.findIndex(
        //   (review) => review._id === action.payload.id
        // );
  
        // Variable to hold our student object with the updated values from our action
        // const updatedReview = {
        //   ...state.reviews[reviewIndex],
        //   ...action.payload,
        // };
  
        // Make a copy of our current students array
        // const newReviewsList = [...state.reviews];
  
        // Assign the updated student to their existing position in the newStudentsList
        // newReviewsList[reviewIndex] = updatedReview;
  
        // Return a copy of state with our new student list
      //   return {
      //     ...state,
      //     reviews: newReviewsList,
      //   };
      // }
      // Default to returning the state as is in our switch statement
  //     default:
  //       return state;
  //   }
  // }

  // export function useReviewReducer(initialState) {
  //   return useReducer(reducer, initialState);
  // }