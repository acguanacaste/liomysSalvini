import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './SightingCreateWidget.css';

export class SightingCreateWidget extends Component {
  addSighting = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addSighting(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddSighting ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewSighting" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.postTitle} className={styles['form-field']} ref="title" />
          <textarea placeholder={this.props.intl.messages.postContent} className={styles['form-field']} ref="content" />
          <a className={styles['sighting-submit-button']} href="#" onClick={this.addSighting}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

SightingCreateWidget.propTypes = {
  addSighting: PropTypes.func.isRequired,
  showAddSighting: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(SightingCreateWidget);
