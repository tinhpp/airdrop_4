import { combineReducers } from 'redux';
import authReducer from './authSlice';
import pageReducer from './pageSlice';
import noteReducer from './noteSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  pages: pageReducer,
  notes: noteReducer,
});
