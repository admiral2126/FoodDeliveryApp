import {combineReducers} from 'redux';
import {AuthReducer} from './reducer/AuthReducer';
import {MainUserReducer} from './reducer/MainUserReducer';
import {MainDriverReducer} from './reducer/MainDriverReducer';

export const rootReducer = combineReducers({
  auth: AuthReducer,
  main: MainUserReducer,
  driver: MainDriverReducer,
});
