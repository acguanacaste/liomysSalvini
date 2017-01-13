import { ADD_SIGHTING, ADD_SIGHTINGS, DELETE_SIGHTING } from './SightingActions';

// Initial State
const initialState = { data: [] };

const SightingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SIGHTING :
      return {
        data: [action.sighting, ...state.data],
      };

    case ADD_SIGHTINGS :
      return {
        data: action.sightings,
      };

    case DELETE_SIGHTING :
      return {
        data: state.data.filter(sighting => sighting.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getSightings = state => state.sightings.data;

// Get post by cuid
export const getSighting = (state, cuid) => state.sightings.data.filter(sighting => sighting.cuid === cuid)[0];

// Export Reducer
export default SightingReducer;
