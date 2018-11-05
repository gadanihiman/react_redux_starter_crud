import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCompany } from '../actions/postActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../assets/style.css'
import PhoneInput from 'react-phone-number-input'
import Snackbar from '@material-ui/core/Snackbar';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  menu: {
    width: 200,
  },
};

const uuidv1 = require('uuid/v1');

class CompanyForm extends Component {
  state = {
    open: false,
    vertical: 'top',
    horizontal: 'center',
    errMessage: 'Error',
    name: '',
    address: '',
    revenue: '',
    phone: '',
    errResponse: {}
  };
  

  onChange = e => 
    this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { name, address, revenue, phone } = this.state;
    let response = (name === '' || address === '' || this.phoneValidation(phone) || this.revenueValidation(revenue))
      ? {
          errName : (name === '') ? 'Name is required' : null,
          errAddress : (address === '') ? 'Address is required' : null,
          errRevenue : this.revenueValidation(revenue),
          errPhone : this.phoneValidation(phone),
          status : 'error'
        }
      : `Company ${name} created!`;
      
    let id = uuidv1();
    const post = {
      id, name, address,
      revenue, phone,
      response
    };

    setTimeout(() => this.setState({ open: false }), 5000)

    return (post.response.hasOwnProperty('status'))
      ? this.handleError(response)
      : this.postCompany(post);
  }

  revenueValidation = inputStateName =>  {
    var valMessage = null;
    if (inputStateName === '') {
      valMessage = `Revenue is required`;
    } else if(Math.sign(inputStateName) === -1) {
      valMessage = `Revenue should be positive number`;
    } else {
      valMessage = null;
    }
    return valMessage;
  }

  phoneValidation = inputStateName =>  {
    var valMessage = null;
    if (inputStateName === '') {
      valMessage = `Phone is required`;
    } else if(Math.sign(inputStateName) === -1 && Number.isInteger(inputStateName)) {
      valMessage = `Phone should be positive integer number`;
    } else {
      valMessage = null;
    }
    return valMessage;
  }

  postCompany = postData => {
    // reset input data state
    this.setState({
      open: true,
      errMessage: postData.response,
      name: '',
      address: '',
      revenue: '',
      phone: '',
      errResponse: {}
    })
    // post company to redux
    this.props.createCompany(postData);
  }

  handleError = errResponse => {
    this.setState({errResponse})
    // show single first error message with snackbar alert
    this.handleSingleErrAlert(errResponse)
  }

  // handle single alert message and view it on snackbar alert
  handleSingleErrAlert = errMessage => {    
    errMessage = errMessage.errName || errMessage.errAddress || errMessage.errRevenue || errMessage.errPhone ;
    return this.setState({ open: true, errMessage });
  }

  render() {
    const { name, address, revenue, phone, vertical, horizontal, open, errMessage, errResponse } = this.state;
    return (
      <div>
        <h2 style={{ marginBottom: '5px' }}>Create Company</h2>
        <form className={styles.container} onSubmit={this.onSubmit}>
          { errResponse.errName &&
            <p style={{marginBottom:0, color:'red'}}> 
              {errResponse.errName}
            </p>}
          <TextField
            error={ errResponse.errName && true }
            name="name"
            autoComplete={'false'}
            id="standard-textarea"
            label="Company Name"
            placeholder="Insert Company Name"
            onChange={e => this.onChange(e)}
            value={name}
            multiline
            style={{ marginTop: '0px', width: '80%' }}
            margin="normal"
          />
          <br/>
          { errResponse.errAddress &&
            <p style={{marginBottom:0, color:'red'}}> 
              {errResponse.errAddress}
            </p>}
          <TextField
            error={ errResponse.errAddress && true }
            name="address"
            autoComplete={'false'}
            id="standard-textarea"
            label="Company Address"
            placeholder="Insert Company Address"
            onChange={e => this.onChange(e)}
            value={address}
            multiline
            style={{ marginTop: '0px', width: '80%' }}
            margin="normal"
          />
          <br/>
          { errResponse.errRevenue &&
            <p style={{marginBottom:0, color:'red'}}> 
              {errResponse.errRevenue}
            </p>}
          <TextField
            error={ errResponse.errRevenue && true }
            type='number'
            name="revenue"
            autoComplete={'false'}
            id="standard-textarea"
            label="Revenue"
            placeholder="Insert Revenue"
            onChange={e => this.onChange(e)}
            value={revenue}
            InputLabelProps={{ shrink: true }}
            style={{ marginTop: '0px', width: '80%' }}
            margin="normal"
          />
          <br/>
          { errResponse.errPhone &&
            <p style={{marginBottom:0, color:'red'}}> 
              {errResponse.errPhone}
            </p>}
          <h4 style={{marginTop: 7, marginBottom: 5}}>Phone</h4>
          <PhoneInput
            style={{ marginTop: '0px', width: '80%' }}
            placeholder="Enter phone number"
            value={ phone }
            onChange={ phone => this.setState({ phone }) } />
          <br/>
          <Button type="submit" style={{width: '80%'}} variant="contained" color="primary">
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

CompanyForm.propTypes = {
  createCompany: PropTypes.func.isRequired
};

export default connect(null, { createCompany })(CompanyForm);
