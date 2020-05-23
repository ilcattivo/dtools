import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER
} from '../actions/types';

const initialState = {
  currentUser: {}
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
    case REGISTER_USER:
    case AUTH_USER:
      return { ...state, currentUser: payload };
    case LOGOUT_USER:
      return { ...state, currentUser: {} };
    default:
      return state;
  }
};

export default userReducer;
