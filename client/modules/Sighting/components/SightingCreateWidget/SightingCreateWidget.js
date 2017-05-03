import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './SightingCreateWidget.css';

export class SightingCreateWidget extends Component {
  addSighting = () => {
    const scientificNameRef = this.refs.sicientificName;
    const familyRef = this.refs.family;
    const genusRef = this.refs.genus;
    if (scientificNameRef.value && scientificNameRef.value && genusRef.value) {
      this.props.addSighting(scientificNameRef.value, familyRef.value, genusRef.value);
      scientificNameRef.value = familyRef.value = genusRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddSighting ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewPost" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.postTitle} className={styles['form-field']} ref="title" />
          <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} ref="content" />
          <a className={styles['sighting-submit-button']} href="#" onClick={this.addSightings}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

SightingCreateWidget.propTypes = {
  addSighting: PropTypes.func.isRequired,
  showAddPosts: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(SightingCreateWidget);
