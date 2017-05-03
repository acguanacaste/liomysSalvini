import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_SIGHTING = 'ADD_SIGHTING';
export const ADD_SIGHTINGS = 'ADD_SIGHTINGS';
export const DELETE_SIGHTING = 'DELETE_SIGHTING';

// Export Actions
export function addSighting(sighting){
  return{
    type: ADD_SIGHTING,
    sighting,
  };
}

export function addSightingRequest(sighting){
  return (dispatch) => {
    return callApi('Observaciones', 'sighting',{
      sighting: {
        catalogNumber: sighting.catalogNumber,
        scientificName: sighting.scientificName,
        urlPhoto: sighting.urlPhoto,

      },
    }).then(res => dispatch(addSighting(res.sighting)));
  };
}

export function addSightings(sightings){
  return {
    type: ADD_SIGHTINGS,
    sightings,
  };
}

export function fetchSightings(){
  return (dispatch) => {
    return callApi('Observaciones').then(res => {
      let sightings = res.responseResult;
      dispatch(addSightings(sightings));
    });
  };
}

export function fetchSighting(catalogNumber){
  return(dispatch) => {
    return callApi(`Observaciones/${catalogNumber}`).then(res => dispatch(addSighting(res.sighting)));
  };
}

export function deleteSighting(catalogNumber){
  return{
    type: DELETE_SIGHTING,
    catalogNumber,
  };
}

export function deleteSightingRequest(catalogNumber){
  return (dispatch) => {
    return callApi(`observaciones/${catalogNumber}`, 'delete').then(() => dispatch(deleteSighting(catalogNumber)));
  };
}
