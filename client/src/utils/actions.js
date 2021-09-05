/*
 * REMOVE_REVIEW:
 * - takes a review ID as payload
 * - finds review based on ID and removes via splice() the targeted review
 * - updates review array
 */
// export const REMOVE_REVIEW = 'REMOVE_REVIEW';

/*
 * UPDATE_REVIEW:
 * - takes object with id and updated values for review parameter(s)
 * - finds review based on ID and updates object
 * - updates object in-place within copy of review array
 * - updates review array
 */
// export const UPDATE_REVIEW = 'UPDATE_REVIEW';