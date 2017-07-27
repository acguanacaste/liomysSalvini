import React, { Component, PropTypes } from 'react';
//import { Csv } from '../../server/csv';
import styles from './FormCsv.css';
import Dropzone from 'react-dropzone';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import callApi from '../util/apiCaller';
import axios from 'axios';


class FormCsv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      modalIsOpen: false,
      files : null,
      csv : ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleChooseFile = this.handleChooseFile.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onDrop = this.onDrop.bind(this);
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
      this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
      // references are now sync'd and can be accessed.
      this.subtitle.style.color = '#f00';
    }

    closeModal() {
      this.setState({modalIsOpen: !this.state.modalIsOpen});
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleChooseFile = (event) =>{
      this.setState({csv:event.target.files[0]});
      /*
      let data = new FormData();
      let file = event.target.files[0];
      data.append('file', file);

    axios.post('/csv/upload', data).then((response) => {
      console.log(response.data); // do something with the response
    });
    */
    }
    handleSubmit(){
      let data = new FormData();
      let file = this.state.csv;
      data.append('file', file);

      axios.post('/csv/upload', data).then((response) => {
        console.log(response.data); // do something with the response
      });

      let files = this.state.files;
      files.forEach(file => {
        data = new FormData();
        data.append('file', file);
        axios.post('/csv/upload/photos', data).then((response) => {
          console.log(response.data); // do something with the response
        });
      });
    }


    onDrop(acceptedFiles, rejectedFiles) {
      this.setState({ files : acceptedFiles });



    }



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>CSV Form</h2>
        </div>
        <form>
        <div className= {styles.body}>

        <label>
          Archivo CVS:
          <input type="file" ref="upload"
            onChange={this.handleChooseFile}
          />
          </label>
          <h2>Agregue las imagenes correspondientes</h2>
          <Dropzone onDrop={this.onDrop} accept="image/jpeg, image/png">

          </Dropzone>
        </div>
        <button type= "button" className={styles['csv-submit-button']} onClick={this.handleSubmit}><FormattedMessage id="submit" /></button>
        </form>
      </div>
    );
  }
}


export default FormCsv;
