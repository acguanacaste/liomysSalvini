import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_SIGHTING = 'ADD_SIGHTING';
export const ADD_SIGHTINGS = 'ADD_SIGHTINGS';
export const DELETE_SIGHTING = 'DELETE_SIGHTING';

// Export Actions
export function addSighting(sighting) {
  return {
    type: ADD_SIGHTING,
    post,
  };
}

export function addPostRequest(sighting) {
  return (dispatch) => {
    return callApi('sightings', 'sighting', {
      sighting: {
        name: sighting.name,
        title: sighting.title,
        content: sighting.content,
      },
    }).then(res => dispatch(addSighting(res.sighting)));
  };
}

export function addSightings(sightings) {
  return {
    type: ADD_SIGHTINGS,
    sightings,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('sightings').then(res => {
      dispatch(addSightings(res.sightings));
    });
  };
}

export function fetchSighting(cuid) {
  return (dispatch) => {
    return callApi(`sightings/${cuid}`).then(res => dispatch(addSighting(res.sighting)));
  };
}

export function deleteSighting(cuid) {
  return {
    type: DELETE_SIGHTING,
    cuid,
  };
}

export function deleteSightingRequest(cuid) {
  return (dispatch) => {
    return callApi(`sightings/${cuid}`, 'delete').then(() => dispatch(deleteSighting(cuid)));
  };
}
