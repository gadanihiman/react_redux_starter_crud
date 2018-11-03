import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

class Companies extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const postItems = this.props.posts.map((post, index) => 
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

    return (
      <div>
        <h1>Companies</h1>
        {this.props.posts.length > 0 
          ? postItems 
          : <h3>There is no office created yet</h3>}
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

export default connect(mapStateToProps, { fetchPosts })(Companies);
