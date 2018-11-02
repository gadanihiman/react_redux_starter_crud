import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCompany } from '../actions/postActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import '../assets/style.css'
import PhoneInput from 'react-phone-number-input'

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  menu: {
    width: 200,
  },
};

class CompanyForm extends Component {
  state = {
    name: '',
    address: '',
    revenue: '',
    phone: ''
  };

  onChange = e => 
    this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const post = {
      name: this.state.name,
      address: this.state.address,
      revenue: this.state.revenue,
      phone: this.state.phone
    };

    return this.props.createCompany(post);
  }

  render() {
    const { name, address, revenue, phone} = this.state;
    return (
      <div>
        <h2 style={{ marginBottom: '22px' }}>Create Company</h2>
        <form className={styles.container} onSubmit={this.onSubmit}>
          <TextField
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
          <TextField
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
          <TextField
            type='number'
            name="revenue"
            autoComplete={'false'}
            id="standard-textarea"
            label="Revenue"
            placeholder="Insert Revenue"
            onChange={e => this.onChange(e)}
            value={revenue}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginTop: '0px', width: '80%' }}
            margin="normal"
          />
          <br/>
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
          {/* <button type="submit">Submit</button> */}
        </form>
      </div>
    );
  }
}

CompanyForm.propTypes = {
  createCompany: PropTypes.func.isRequired
};

export default connect(null, { createCompany })(CompanyForm);
