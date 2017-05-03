// Import Actions
import { TOGGLE_ADD_POST } from './AppActions';
import { TOGGLE_ADD_SIGHTING } from './AppActions';
// Initial State
const initialState = {
  showAddPost: false,
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
        showAddPost: !state.showAddPost,
      };
      break;
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Export Reducer
export default AppReducer;
