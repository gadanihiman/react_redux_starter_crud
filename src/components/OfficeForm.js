import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createOffice } from '../actions/postActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
};

const uuidv1 = require('uuid/v1');

class OfficeForm extends Component {
  state = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    name: '',
    lat: '',
    long: '',
    location: {},
    date: '2018-11-02',
    errMessage: 'Error',
    company: '',
    errResponse: {}
  };

  componentWillUpdate(nextProps) {
    if (nextProps.newCompany.response) {
      this.props.companies.unshift(nextProps.newCompany);
      this.props.companies.map(company => company.response = null);
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const {lat, long, name, date, company} = this.state;
    let response = (name === '' || company === '' || lat === '' 
    || long === '' || date === '' )
      ? {
          errName : (name === '') ? 'Name is required' : null,
          errDate : (date === '') ? 'Date is required' : null,
          errLat : this.latValidation(lat),
          errLong : this.longValidation(long),
          errCompany : (company === '') ? 'Company is required' : null,
          status : 'error'
        }
      : `Office ${name} created!`;
    
    let id = uuidv1();    
    const post = {
      id, name,
      location: {
        lat,
        long
      }, date, company, response
    };

    setTimeout(() => this.setState({ open: false }), 5000);

    return (post.response.hasOwnProperty('status'))
      ? this.handleError(response)
      : this.postOffice(post);
  }

  latValidation = inputStateName =>  {
    var valMessage = null;
    if (inputStateName === '') {
      valMessage = `Latitude is required`;
    } else if(Math.sign(inputStateName) === -1) {
      valMessage = `Latitude should be positive number`;
    } else {
      valMessage = null;
    }
    return valMessage;
  }

  longValidation = inputStateName =>  {
    var valMessage = null;
    if (inputStateName === '') {
      valMessage = `Longitude is required`;
    } else if(Math.sign(inputStateName) === -1) {
      valMessage = `Longitude should be positive number`;
    } else {
      valMessage = null;
    }
    return valMessage;
  }

  postOffice = postData => {
    // reset input data state
    this.setState({
      open: true,
      errMessage: postData.response,
      name: '',
      lat: '',
      long: '',
      date: '',
      company: '',
      errResponse: {}
    })
    // post office to redux
    this.props.createOffice(postData);
  }

  handleError = errResponse => {
    this.setState({errResponse})
    // show single first error message with snackbar alert
    this.handleSingleErrAlert(errResponse)
  }

  // handle single alert message and view it on snackbar alert
  handleSingleErrAlert = errMessage => {    
    errMessage = errMessage.errName || errMessage.errLat || errMessage.errLong || errMessage.errDate || errMessage.errCompany;
    return this.setState({ open: true, errMessage });
  }

  render() {
    const { name, lat, long, date, company, vertical, horizontal, open, errResponse, errMessage } = this.state;
    var allCompanies = JSON.parse(localStorage.getItem('Companies'));
    const listCompany = allCompanies && allCompanies.map((company, index) => 
      <MenuItem key={index} value={company.id}>{company.name}</MenuItem>);

    return (
      <div>
        <h2 style={{ marginBottom: '5px' }}>Create Office</h2>
        <form className={styles.container} onSubmit={this.onSubmit}>
        {errResponse.errName &&
            <p style={{marginBottom:0, color:'red'}}> 
              {errResponse.errName}
            </p>}
          <TextField
            error={ errResponse.errName && true }
            name="name"
            autoComplete={'false'}
            label="Office Name"
            placeholder="Insert Office Name"
            onChange={e => this.onChange(e)}
            value={name}
            multiline
            style={{ marginTop: '0px', width: '80%' }}
            margin="normal"
          />
          <br/>
          {errResponse.errLat &&
            <p style={{marginBottom:0, color:'red'}}> 
              {errResponse.errLat}
            </p>}
          <h4 style={{marginTop: 2, marginBottom: 2}}>Location</h4>
          <TextField
            type='number'
            error={ errResponse.errLat && true }
            name="lat"
            autoComplete={'false'}
            label="Latitude"
            value={lat}
            margin="normal"
            placeholder="Insert Office Latitude"
            onChange={e => this.onChange(e)}
            InputLabelProps={{ shrink: true }}
            style={{ marginTop: '0px', width: '40%' }}
          />
          {errResponse.errLong &&
            <p style={{marginBottom:0, color:'red'}}> 
              {errResponse.errLong}
            </p>}
          <TextField
            type='number'
            error={ errResponse.errLong && true }
            name="long"
            autoComplete={'false'}
            label="Longitude"
            value={long}
            margin="normal"
            placeholder="Insert Office Longitude"
            onChange={e => this.onChange(e)}
            InputLabelProps={{ shrink: true }}
            style={{ marginTop: '0px', width: '40%' }}
          />
          <br/>
          {errResponse.errDate &&
            <p style={{marginBottom:0, color:'red'}}> 
              {errResponse.errDate}
            </p>}
          <TextField
            error={ errResponse.errDate && true }
            type='date'
            name="date"
            autoComplete={'false'}
            label="Office Start Date"
            placeholder="Insert Start Date"
            onChange={e => this.onChange(e)}
            value={date}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginTop: '0px', width: '80%' }}
          />
          <br/>
          {errResponse.errCompany &&
            <p style={{marginBottom:0, color:'red'}}> 
              {errResponse.errCompany}
            </p>}
          <FormControl style={{ marginTop: '0px', marginBottom: '10px', width: '80%' }}>
            <InputLabel htmlFor="company">Company</InputLabel>
            <Select
              value={company}
              onChange={e => this.onChange(e)}
              inputProps={{
                name: 'company',
                id: 'company',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {listCompany}
            </Select>
          </FormControl>
          <br/>
          <Button type='submit' style={{width: '80%'}} variant="contained" color="primary">
            Create
          </Button>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={this.handleCloseSnackbar}
            ContentProps={{ 'aria-describedby': 'message-id' }}
            message={<span id="message-id">{errMessage}</span>}
          />
        </form>
      </div>
    );
  }
}

OfficeForm.propTypes = {
  createOffice: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired,
  offices: PropTypes.array.isRequired,
  newCompany: PropTypes.object,
  newOffice: PropTypes.object
};

const mapStateToProps = state => ({
  companies: state.posts.items,
  offices: state.posts.offices,
  newCompany: state.posts.item,
  newOffice: state.posts.office
});

export default connect(mapStateToProps, { createOffice })(OfficeForm);