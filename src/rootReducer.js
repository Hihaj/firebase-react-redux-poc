import { combineReducers } from 'redux';
import { reducer as accounts } from './modules/accounts';

export default combineReducers({
  accounts
});