
# React Redux Implementation for CRUD

## Quick Start

```bash
# Install dependencies
npm install

# Serve on localhost:3000
npm start

Please enable javascript and it using localStorage for saving data.
```

## Simple Docs

How the apps save the data?
It's using localstorage browser to store all the data.

Where are Redux Implementation ?
First i use component state to hold the data when user typing inside the input form.

Here is the CompanyForm components form for the example:

```
<!-- uuid package -->
const uuidv1 = require('uuid/v1');

<!-- all input form state -->
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

<!-- function for change state when typing -->
  onChange = e => this.setState({ [e.target.name]: e.target.value });

<!-- handle submit form -->
  onSubmit = e => {
    e.preventDefault();
    const { name, address, revenue, phone } = this.state;
    <!-- check validation for every input     -->
    let response = (name === '' || address === '' || this.phoneValidation(phone) || this.revenueValidation(revenue))
      ? {
          errName : (name === '') ? 'Name is required' : null,
          errAddress : (address === '') ? 'Address is required' : null,
          errRevenue : this.revenueValidation(revenue),
          errPhone : this.phoneValidation(phone),
          status : 'error'
        }
      : `Company ${name} created!`;

    <!-- make new id from uuid package -->
    let id = uuidv1();
    
    <!-- create body post -->
    const post = {
      id, name, address,
      revenue, phone,
      response
    };

    // make time for showing out the modal
    setTimeout(() => this.setState({ open: false }), 5000)
    
    // check if there's a 'status' property it will handle all each error message, 
    // otherwise it will send data
    return (post.response.hasOwnProperty('status'))
      ? this.handleError(response)
      : this.postCompany(post);
  }

```
Then make some validation instead.

```
// set revenue validation rules
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

  // set phone validation rules
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

  // handle error message
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

```

Then reset input form, and make a postCompany function for sending data to redux state and take FIX DATA object as a parameter.

```

  // function for send body data to redux action
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

```

This is simple redux implementation for storing the object data that received.
Data will be push to an array then store it to localStorage.

```
import { NEW_COMPANY_POST } from './types';

export const createCompany = companiesData => dispatch => {
  // get all companies from storage
  let companyStorageData = JSON.parse(localStorage.getItem('Companies'));
  // checking data for different actions
  if(!companyStorageData) {
    let emptyArr = [companiesData];
    localStorage.setItem("Companies", JSON.stringify(emptyArr));
  } else if (companyStorageData.length > 0) {
    companyStorageData.unshift(companiesData);
    localStorage.setItem("Companies", JSON.stringify(companyStorageData));
  }
  // dispatch the action
  dispatch({
    type: NEW_COMPANY_POST,
    payload: companiesData
  })
};

```

And at the end

> Sorry for my bad english

Thanks for giving me chance to explain you for what that i've done.