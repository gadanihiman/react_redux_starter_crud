import { FETCH_POSTS, NEW_COMPANY_POST, NEW_OFFICE_POST } from '../actions/types';

const initialState = {
  items: [],
  item: {},
  offices: localStorage.getItem('offices') || [],
  office: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      };
    case NEW_COMPANY_POST:
      return {
        ...state,
        item: action.payload
      };
    case NEW_OFFICE_POST:
      return {
        ...state,
        office: action.payload
      };
    default:
      return state;
  }
}
