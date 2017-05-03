// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const TOGGLE_ADD_SIGHTING = 'TOGGLE_ADD_SIGHTING';
// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export function toggleAddSighting() {
  return {
    type: TOGGLE_ADD_SIGHTING,
  };
}
