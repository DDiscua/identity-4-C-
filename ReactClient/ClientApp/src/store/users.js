
import {
  GET_USERS_SUCCESS, GET_USERS_ERROR
} from './types';

const INIT_STATE = {
  users: []
};


export default (state, action) => {
  state = state || INIT_STATE;

  if (action.type === GET_USERS_SUCCESS) {
    return { ...state, user: action.payload.users };
  }

  if (action.type === GET_USERS_ERROR) {
    return { ...state, users: [] };
  }

  return state;
};
