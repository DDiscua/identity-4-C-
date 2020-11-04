
import {
  SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_ERROR, SIGNOUT_USER_ERROR, SIGNOUT_USER, SIGNOUT_USER_SUCCESS, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS
} from './types';

const INIT_STATE = {
  token: localStorage.getItem('id_token'),
  initURL: '',
  authUser: JSON.parse(localStorage.getItem('user')),
  isAuthenticated: false

};


export default (state, action) => {
  state = state || INIT_STATE;

  if (action.type === LOGIN_USER_SUCCESS) {
    console.log(action.payload);
    return { ...state, authUser: action.payload, token: action.payload.token };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return { ...state, user: null };
  }

  if (action.type === SIGNOUT_USER_SUCCESS) {
    return { ...state, authUser: null, token: null };
  }

  return state;
};
