import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './SightingListItem.css';

function SightingListItem(props) {
  return (
    <div className={styles['single-sighting']}>
      <h3 className={styles['sighting-title']}>
        <Link to={`/sightings/${props.sighting.slug}-${props.sighitng.cuid}`} >
          {props.sighting.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.sighting.name}</p>
      <p className={styles['sighting-desc']}>{props.sighting.content}</p>
      <p className={styles['sighting-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteSighting" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

SightingListItem.propTypes = {
  sighting: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SightingListItem;
