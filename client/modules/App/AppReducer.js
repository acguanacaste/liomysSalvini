// Import Actions
import { TOGGLE_ADD_POST } from './AppActions';
import { TOGGLE_ADD_SIGHTING } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  showAddSighting: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
        };
      case TOGGLE_ADD_SIGHTING:
          return {
            showAddSighting: !state.showAddSighting,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;
export const getShowAddSighting = state => state.app.showAddSighting;
// Export Reducer
export default AppReducer;
