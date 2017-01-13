import React, { PropTypes } from 'react';

// Import Components
import PostListItem from './SightingListItem/SightingListItem';

function SightingList(props) {
  return (
    <div className="listView">
      {
        props.sightings.map(sighting => (
          <SightingListItem
            sighting={sighting}
            key={sighting.cuid}
            onDelete={() => props.handleDeleteSighting(sighting.cuid)}
          />
        ))
      }
    </div>
  );
}

SightingList.propTypes = {
  sightings: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default SightingList;
