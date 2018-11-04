import React, { Component } from 'react';
import Companies from '../../components/Companies';
import OfficeForm from '../../components/OfficeForm';
import CompanyForm from '../../components/CompanyForm';
import { withRouter } from 'react-router-dom';

class Company extends Component {
  render() {
    return (
      <div>
        <div style={{ display: 'inline-block', width: '45%' }}>
            <CompanyForm />
        </div>
        <div style={{ display: 'inline-block', width: '45%', marginRight: '20px' }}>
            <OfficeForm />
        </div>
        <Companies items='company' />
      </div>
    );
  }
}

export default withRouter(Company);
