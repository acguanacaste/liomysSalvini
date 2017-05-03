// Import Actions
import { ADD_SIGHTING, ADD_SIGHTINGS, DELETE_SIGHTING } from './SightingActions';

// Initial State
const initialState = { data : [] };

const SightingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SIGHTING:
      return {
        data : [action.sightings, ...state.data],
      };
      break;
    case ADD_SIGHTINGS :
        return{
          data: action.sightings,
        };
      break;
    case DELETE_SIGHTING:
      return {
        data: state.data.filter(sighting => sighting.catalogNumber !== action.catalogNumber)
      };
      break;
    default:
      return state;
  }
};

/* Selectors */

//Get all sightings
export const getSightings = state => state.sightings.data;

//Get sighting by catalogNumber
export const getSighting = (state, catalogNumber) => state.sightings.data.filter(sighting => sighting.catalogNumber == catalogNumber)[0];

//Export Reducer
export default SightingReducer;
