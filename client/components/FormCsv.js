import React, { Component, PropTypes } from 'react';
import styles from './FormCsv.css';
import Dropzone from 'react-dropzone';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import intl from '../modules/Intl/IntlReducer';
import callApi from '../util/apiCaller';
import axios from 'axios';
import Modal from 'react-modal';

class FormCsv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      modalIsOpen: false,
      files : null,
      csv : '',
      appName: '',
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleChooseFile = this.handleChooseFile.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onDrop = this.onDrop.bind(this);
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.handleSubmitNewApp = this.handleSubmitNewApp.bind(this);
      this.handleCsvButton = this.handleCsvButton.bind(this);
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
    handleCsvButton(){
      const nameCsv = this.state.csv.name;
      callApi('Observaciones/csv','post',{
        nameCsv: nameCsv,
      }).then(function(res){
        if(res.Result =="OK")
          alert("Se insertaron los documentos");
      });
      //procesaCsv('muestra1.csv','','');
    }
    handleSubmitNewApp = (event) => {
      const nameRef = this.refs.name;
      const decryptRef = this.refs.decrypt;
      const descriptionRef = this.refs.description;

      callApi('Aplicaciones', 'post', {
        app: {
          name: nameRef.value,
          decrypToken: decryptRef.value,
          description: descriptionRef.value,
        },
      }).then(function(res){
        alert(res.app.name);
        this.setState({appName:res.app.name}); 
      });

      this.closeModal();

      //procesaCsv(this.state.csv.name,'','');
    }
    handleSubmit(){
      let data = new FormData();
      let file = this.state.csv;
      if(file !== ''){
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

      this.openModal();
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
        <button type= "button" className={styles['csv-submit-button']} onClick={this.handleSubmit}><FormattedMessage id="submitFiles" /></button>
        <button type="button" className={styles['csv-run-button']} onClick={this.handleCsvButton}> <FormattedMessage id="runCsv"/></button>
        <Modal ref='modal'
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel= 'Create New App'>
        <div>
          <div className={styles['form-content']}>
            <h2 className={styles['form-title']}><FormattedMessage id="createNewApp" /></h2>
            <input placeholder="App Name" className={styles['form-field']} ref="name" />
            <input placeholder='App Decrypt Token' className={styles['form-field']} ref="decrypt" />
            <input placeholder="App Description" className={styles['form-field']} ref="description" />
            <button className={styles['csv-submit-button']} onClick={this.handleSubmitNewApp}><FormattedMessage id="submit" /></button>
          </div>
          </div>
        </Modal>
        </form>
      </div>
    );
  }
}


export default FormCsv;
