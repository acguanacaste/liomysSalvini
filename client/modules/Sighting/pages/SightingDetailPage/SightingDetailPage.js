import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/SightingListItem/SightingListItem.css';

// Import Actions
import { fetchSighting } from '../../SightingActions';

// Import Selectors
import { getSighting } from '../../SightingReducer';

export function SightingDetailPage(props) {
  return (
    <div>
      <Helmet title={props.sighting.title} />
      <div className={`${styles['single-sighting']} ${styles['sighting-detail']}`}>
        <h3 className={styles['sighting-title']}>{props.sighting.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.sighting.name}</p>
        <p className={styles['sighting-desc']}>{props.sighting.content}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
SightingDetailPage.need = [params => {
  return fetchSightings(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    sighting: getSighting(state, props.params.cuid),
  };
}

SightingDetailPage.propTypes = {
  sighting: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(SightingDetailPage);
