import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCompany } from '../actions/postActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
};

class OfficeForm extends Component {
  state = {
    name: '',
    lat: '',
    long: '',
    location: {},
    date: '2018-11-02',
    company: ''
  };

  onChange = e => 
    this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const {lat, long, name, date, company} = this.state;
    const post = {
      name,
      location: {
        lat,
        long
      },
      date,
      company
    };

    return this.props.createCompany(post);
  }

  render() {
    const { name, lat, long, date, company} = this.state;
    return (
      <div>
        <h2 style={{ marginBottom: '5px' }}>Create Office</h2>
        <form className={styles.container} onSubmit={this.onSubmit}>
          <TextField
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
          <h4 style={{marginTop: 2, marginBottom: 2}}>Location</h4>
          <TextField
            name="lat"
            autoComplete={'false'}
            label="Latitude"
            placeholder="Insert Office Latitude"
            onChange={e => this.onChange(e)}
            value={lat}
            multiline
            style={{ marginTop: '0px', width: '40%' }}
            margin="normal"
          />
          <TextField
            name="long"
            autoComplete={'false'}
            label="Longitude"
            placeholder="Insert Office Longitude"
            onChange={e => this.onChange(e)}
            value={long}
            multiline
            style={{ marginTop: '0px', width: '40%' }}
            margin="normal"
          />
          <br/>
          <TextField
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
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <br/>
          <Button style={{width: '80%'}} variant="contained" color="primary">
            Create
          </Button>
          {/* <button type="submit">Submit</button> */}
        </form>
      </div>
    );
  }
}

OfficeForm.propTypes = {
  createCompany: PropTypes.func.isRequired
};

export default connect(null, { createCompany })(OfficeForm);