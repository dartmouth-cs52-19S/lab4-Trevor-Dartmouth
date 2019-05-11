import { combineReducers } from 'redux';
import PostReducer from './postReducer';
import AuthReducer from './authReducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  auth: AuthReducer,
});

export default rootReducer;
