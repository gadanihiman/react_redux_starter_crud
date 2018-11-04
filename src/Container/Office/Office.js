import React, { Component } from 'react';
import Companies from '../../components/Companies';
import { withRouter } from 'react-router-dom';

class Office extends Component {
  render() {
    return (
      <div>
        <Companies items='office' />
      </div>
    );
  }
}

export default withRouter(Office);
