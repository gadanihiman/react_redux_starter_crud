import React, { Component } from 'react';
import Companies from '../../components/Companies';
import { withRouter } from 'react-router-dom';

class Office extends Component {
  render() {
    return (
      //check if location state is undefine will show page not found
      <div>
        {this.props.location.state
          ? <Companies items='office' />
          : <h1 style={{ color: 'red' }}> 
              Page Not Found
            </h1>}
      </div>
    );
  }
}

export default withRouter(Office);
