import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

class Companies extends Component {
  state = {
    id : ''
  }
  
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const officesDetails = (e, companyId) => {
      const { history } = this.props;
      let id = companyId;
      history.push("/office", {id});
    }
    
    var allCompanies = JSON.parse(localStorage.getItem('Companies'));
    
    var allOffices = JSON.parse(localStorage.getItem('Offices'));
    const officesData = this.props.location.state
      && allOffices && allOffices.filter(office => office.company === this.props.location.state.id);

    const companyDetail = this.props.location.state
      && allCompanies && allCompanies.filter(company => company.id === this.props.location.state.id);
    
    const companiesCard = allCompanies && allCompanies.map((post, index) => 
      <Card 
        onClick={e => officesDetails(e, post.id)}
        key={index} 
        style={{ 
          display: 'inline-block', 
          width: '40%', 
          marginLeft: 15, 
          marginRight: 15, 
          marginBottom: 10 
        }}>
        <CardContent>
          <Typography style={{fontSize: 17}} color="textSecondary" gutterBottom>
            {post.name}
          </Typography>
          <hr></hr>
          <Typography variant="h6" component="h6">
            Address:
          </Typography>
          <Typography style={{fontSize: 18, marginBottom: 12}} color="textSecondary">
            {post.address}
          </Typography>
          <Typography variant="h6" component="h6">
            Revenue:
          </Typography>
          <Typography style={{fontSize: 18, marginBottom: 12}} color="textSecondary">
            {post.revenue}
          </Typography>
          <Typography variant="h6" component="h6">
            Phone No:
          </Typography>
          <Typography style={{fontSize: 18, marginBottom: 12}} color="textSecondary">
            {post.phone}
          </Typography>
        </CardContent>
      </Card>
    );

    const officesCard = officesData && officesData.map((office, index) => 
      <Card 
        key={index} 
        style={{ 
          display: 'inline-block', 
          width: '40%', 
          marginLeft: 15, 
          marginRight: 15, 
          marginBottom: 10 
        }}>
        <CardContent>
          <div style={{ display: 'inline-block', width: '50%' }}>
            <Typography style={{fontSize: 17}} color="textSecondary" gutterBottom>
              {office.name}
            </Typography>
          </div>
          <div style={{ display: 'inline-block', width: '50%', textAlign: 'right' }}>
            <Button variant="fab" mini color="primary" aria-label="Add">
              <DeleteIcon fontSize="small"/>
            </Button>
          </div>
          <hr/>
          <Typography variant="h6" component="h6">
            Location:
          </Typography>
          <Typography style={{fontSize: 18, marginBottom: 12}} color="textSecondary">
            Lat: {office.location.lat}
          </Typography>
          <Typography style={{fontSize: 18, marginBottom: 12}} color="textSecondary">
            Long: {office.location.long}
          </Typography>
          <Typography variant="h6" component="h6">
            Office Start Date:
          </Typography>
          <Typography style={{fontSize: 18, marginBottom: 12}} color="textSecondary">
            {office.date}
          </Typography>
        </CardContent>
      </Card>
    );

    const ListCompanies = () => 
      <span>
        <h1>Companies</h1>
          {allCompanies && allCompanies.length > 0 
            ? companiesCard 
            : <h3>There is no office created yet</h3>}
      </span>

    const ListOffices = () => 
      <span>
        <h1>{companyDetail[0].name}</h1>
        <hr/>
        <Typography variant="h6" component="h6">
          Address:
        </Typography>
        <Typography style={{fontSize: 18, marginBottom: 12}} color="textSecondary">
          {companyDetail[0].address}
        </Typography>
        <Typography variant="h6" component="h6">
          Revenue:
        </Typography>
        <Typography style={{fontSize: 18, marginBottom: 12}} color="textSecondary">
          {companyDetail[0].revenue}
        </Typography>
        <Typography variant="h6" component="h6">
          Phone No:
        </Typography>
        <div style={{ display: 'inline-block', width: '50%' }}>
          <Typography style={{fontSize: 18, marginBottom: 12}} color="textSecondary">
            {companyDetail[0].phone}
          </Typography>
        </div>
        <div style={{ display: 'inline-block', width: '50%', textAlign: 'right' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}> 
            <Button variant="contained">
              Back To Overview
            </Button>
          </Link>
        </div>
        <hr/>
        <h1>Offices</h1>
          {officesData && officesData.length > 0 
            ? officesCard 
            : <h3>There is no office created yet</h3>}
      </span>
    
    return (
      <div>
        {this.props.items == 'company'
          ? <ListCompanies />
          : <ListOffices />}
      </div>
    );
  }
}

Companies.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newCompany: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  newCompany: state.posts.item
});

export default withRouter(connect(mapStateToProps, { fetchPosts })(Companies));
