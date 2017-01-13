import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import SightingList from '../../components/SightingList';
import SightingCreateWidget from '../../components/SightingCreateWidget/SightingCreateWidget';

// Import Actions
import { addSightingRequest, fetchSightings, deleteSightingRequest } from '../../SightingActions';
import { toggleAddSighting } from '../../../App/AppActions';

// Import Selectors
import { getShowAddSighting } from '../../../App/AppReducer';
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

  handleAddSighting = (name, title, content) => {
    this.props.dispatch(toggleAddSighting());
    this.props.dispatch(addSightingRequest({ name, title, content }));
  };

  render() {
    return (
      <div>
        <SightingCreateWidget addPSighting={this.handleAddSighting} showAddSighting={this.props.showAddSighting} />
        <SightingList handleDeleteSighting={this.handleDeleteSighting} sighitngs={this.props.sighitngs} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
SightingListPage.need = [() => { return fetchSightings(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddSighting: getShowAddSighting(state),
    sightings: getSightings(state),
  };
}

SightingListPage.propTypes = {
  sightings: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  showAddSighting: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

SightingListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(SightingListPage);
