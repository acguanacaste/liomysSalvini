import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import SightingList from '../../components/SightingList';
import SightingCreateWidget from '../../components/SightingCreateWidget/SightingCreateWidget';

// Import Actions
import { addSightingRequest, fetchSightings, deleteSightingsRequest } from '../../SightingActions';
import { toggleAddSighting } from '../../../App/AppActions';

// Import Selectors
//import { getShowAddPost } from '../../../App/AppReducer';
import { getSightings } from '../../SightingReducer';

class SightingListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchSightings());
  }

  handleDeleteSighting = sighting => {
    if (confirm('Do you want to delete this sighting')) { // eslint-disable-line
      this.props.dispatch(deleteSightingRequest(sighting));
    }
  };

  handleAddSighting = (scientificName, family, genus) => {
    this.props.dispatch(toggleAddSighting());
    this.props.dispatch(addSightingRequest({ scientificName, family, genus }));
  };

  render() {
    return (
      <div>
        <SightingCreateWidget addSighting={this.handleAddSighting} />
        <SightingList handleDeleteSighting={this.handleDeleteSighting} sightings={this.props.sightings} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
SightingListPage.need = [() => { return fetchSightings(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    sightings: getSightings(state),
  };
}

SightingListPage.propTypes = {
  sightings: PropTypes.arrayOf(PropTypes.shape({
    sicientificName: PropTypes.string.isRequired,
    family: PropTypes.string.isRequired,
    genus: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

SightingListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(SightingListPage);
