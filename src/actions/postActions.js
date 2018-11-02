import { FETCH_POSTS, NEW_POST } from './types';

export const fetchPosts = () => dispatch => {
  dispatch({
    type: FETCH_POSTS,
    payload: []
  })
  // fetch('https://jsonplaceholder.typicode.com/posts')
  //   .then(res => res.json())
  //   .then(posts =>
  //     dispatch({
  //       type: FETCH_POSTS,
  //       payload: posts
  //     })
  //   );
};

export const createCompany = companiesData => dispatch => {
  console.log(companiesData);
  dispatch({
    type: NEW_POST,
    payload: companiesData
  })
  // fetch('https://jsonplaceholder.typicode.com/posts', {
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/json'
  //   },
  //   body: JSON.stringify(companiesData)
  // })
  //   .then(res => res.json())
  //   .then(post =>
  //     dispatch({
  //       type: NEW_POST,
  //       payload: post
  //     })
  //   );
};
