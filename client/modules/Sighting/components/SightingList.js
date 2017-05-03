import React, { PropTypes } from 'react';

// Import Components
import SightingListItem from './SightingListItem/SightingListItem';

function SightingList(props) {
  return (
    <div className="listView">
      {
        props.sightings.map(sighting => (
          <SightingListItem
            sighting={sighting}
            key={sighting.catalogNumber}
            onDelete={() => props.handleDeleteSighting(sighting.catalogNumber)}
          />
        ))
      }
    </div>
  );
}

SightingList.propTypes = {
  sightings: PropTypes.arrayOf(PropTypes.shape({
    scientificName: PropTypes.string.isRequired,
    family: PropTypes.string.isRequired,
    genus: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    catalogNumber: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteSigting: PropTypes.func.isRequired,
};

export default SightingList;
