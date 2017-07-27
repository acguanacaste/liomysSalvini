// Import Actions
import { TOGGLE_ADD_POST } from './AppActions';
import { TOGGLE_ADD_SIGHTING } from './AppActions';
import { TOGGLE_ADD_CSV } from './AppActions';


// Initial State
const initialState = {
  showAddPost: false,
  showAddSighting: false,
  showAddCSV: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };
      break;
    case (TOGGLE_ADD_SIGHTING):
      return {
        showAddSighting: !state.showAddSighting,
      };
      break;

    case (TOGGLE_ADD_CSV):
      return{
        showAddCSV: !state.showAddCSV,
      };
      break;
    default:
      return state;
}
};

/* Selectors */
// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

export const getShowAddSighting = state => state.app.showAddSighting;

export const getShowAddCSV = state => state.app.showAddCSV;

// Export Reducer
export default AppReducer;
