import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './SightingListItem.css';

function SightingListItem(props) {
  return (
    <div className={styles['single-sighting']}>
      <h3 className={styles['sighting-title']}>
        <Link to={`/sightings/${props.sighting.catalogNumber}`}>
          {props.sighting.scientificname}
        </Link>
      </h3>
      <p className={styles['scientific-name']}>Familia: {props.sighting.family}</p>
      <p className={styles['sighting-desc']}>Genero: {props.sighting.genus}</p>
      <p className={styles['sighting-desc']}>Vista: {props.sighting.vista}</p>
      <figure className="media-left">
        <img className="media-object" width="120px" src={props.sighting.urlPhoto}/>
      </figure>
      <p className={styles['sighting-desc']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deletePost"/></a></p>
      <hr className={styles.divider}/>
    </div>
  );
}

SightingListItem.propTypes = {
  sighting: PropTypes.shape({
    sicientificName: PropTypes.string.isRequired,
    family: PropTypes.string.isRequired,
    genus: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
    catalogNumber: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SightingListItem;
