import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, createOffice } from '../actions/postActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class Companies extends Component {
  state = {
    openModal: false,
    id : '',
    open: false,
    message: '',
    vertical: 'top',
    idTemp: '',
    horizontal: 'center'
  }
  
  componentDidMount() {
    this.props.fetchPosts();
  }

  // function for open confirmation delete modal
  handleClickOpen = (e, id) => this.setState({ openModal: true, idTemp: id });
  // function for close confirmation delete modal
  handleClose = () => this.setState({ openModal: false, idTemp: '' });

  // function for delete office
  deleteOffice = () => {
    // get all offices
    let allOffices = JSON.parse(localStorage.getItem('Offices'));
    // find index of office that selected
    let officeSelected = allOffices.findIndex(office => office.id === this.state.idTemp);
    // delete office data that return deleted office    
    let officesDeleted = allOffices.splice(officeSelected, 1);
    // set offices storage to empty array
    localStorage.setItem("Offices", JSON.stringify([]));
    // display notification for deletting office
    this.setState({ open: true, message: `${officesDeleted[0].name} has been deleted!` });
    if (allOffices.length === 0) {
      localStorage.removeItem('Offices');
    } else {
      // create new offices data from data array that had spliced. Use createOffice redux action
      this.props.createOffice(allOffices);
    }
    // close confirmation's modal 
    this.handleClose();
  }

  render() {
    const { vertical, horizontal, open, message } = this.state;

    // change link and bring id to the location state 
    const officesDetails = (e, companyId) => {
      const { history } = this.props;
      let id = companyId;
      history.push("/office", {id});
    }
    
    // get all companies data from storage
    var allCompanies = JSON.parse(localStorage.getItem('Companies'));
    // get all offices data from storage    
    var allOffices = JSON.parse(localStorage.getItem('Offices'));
    
    // filter all offices data that should be viewed depends of the company id
    const officesData = this.props.location.state
      && allOffices && allOffices.filter(office => office.company === this.props.location.state.id);
    
    // filter a company data that should be viewed depends of the company id
    const companyDetail = this.props.location.state
      && allCompanies && allCompanies.filter(company => company.id === this.props.location.state.id);
    
    // Component List of all companies, displayed on card
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

    // Component List of all offices, displayed on card
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
            <Button onClick={e => this.handleClickOpen(e, office.id)} variant="fab" mini color="primary" aria-label="Add">
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
    
    // Container component for listing all of the companies
    const ListCompanies = () => 
      <span>
        <h1>Companies <span style={{ fontSize: '12px' }}> (Click card for see all company's offices) </span> </h1>
          {allCompanies && allCompanies.length > 0 
            ? companiesCard 
            : <h3>There is no office created yet</h3>}
      </span>

    // Container component for listing all of the offices with it's company    
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
        {/* display snackbar alert/notification */}
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            ContentProps={{ 'aria-describedby': 'message-id' }}
            message={<span id="message-id">{message}</span>}
          />
        <Dialog
          open={this.state.openModal}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Warning!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure want to delete this Office ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteOffice} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        {this.props.items === 'company'
          ? <ListCompanies />
          : <ListOffices />}
      </div>
    );
  }
}

Companies.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  createOffice: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newCompany: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  newCompany: state.posts.item
});

export default withRouter(connect(mapStateToProps, { fetchPosts, createOffice })(withMobileDialog()(Companies)));
