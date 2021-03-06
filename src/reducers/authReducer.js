import { ActionTypes } from '../actions';

/* worked with John Sullivan */
const AuthReducer = (state = {
  authenticated: false,
  user: null,
  error: '',
}, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return Object.assign({}, state, { authenticated: true, user: action.payload, error: '' });
    case ActionTypes.DEAUTH_USER:
      return Object.assign({}, state, { authenticated: false, user: null, error: '' });
    case ActionTypes.AUTH_ERROR:
      return Object.assign({}, state, { authenticated: false, error: action.message });
    default:
      return state;
  }
};

export default AuthReducer;
