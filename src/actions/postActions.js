import { FETCH_POSTS, NEW_COMPANY_POST, NEW_OFFICE_POST } from './types';

export const fetchPosts = () => dispatch => {
  dispatch({
    type: FETCH_POSTS,
    payload: []
  })
};

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

export const createOffice = officeData => dispatch => {
  // get all offices data from storage
  let officeStorageData = JSON.parse(localStorage.getItem('Offices'));
  // checking data for different actions  
  if(!officeStorageData) {
    let emptyArr = [officeData];
    localStorage.setItem("Offices", JSON.stringify(emptyArr));
  } else if (officeStorageData.length > 0) {
    officeStorageData.unshift(officeData);
    localStorage.setItem("Offices", JSON.stringify(officeStorageData));
  } else if (officeStorageData.length === 0) {
    localStorage.setItem("Offices", JSON.stringify(officeData));
  }
  // dispatch the action
  dispatch({
    type: NEW_OFFICE_POST,
    payload: officeData
  })
  // check length array if more that 1, then unshift the data object
  
  // let wait = async () => {
  //   let officeStorageData = await JSON.parse(localStorage.getItem('Offices'));
  //   console.log('officeStorageData', officeStorageData);
  //   await officeStorageData.unshift(officeData);
  //   console.log('offices', officeStorageData.unshift(officeData))
  //   await localStorage.setItem("Offices", JSON.stringify(officeStorageData.unshift(officeData)));  
  // dispatch({
  //   type: NEW_OFFICE_POST,
  //   payload: officeData
  // })
  // }
  // wait();
};

