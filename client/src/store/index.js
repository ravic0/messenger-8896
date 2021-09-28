import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import user from './user';
import conversations, { setNewMessage } from './conversations';
import activeConversation from './activeConversation';

const CLEAR_ON_LOGOUT = 'CLEAR_ON_LOGOUT';

export const clearOnLogout = () => {
  return {
    type: CLEAR_ON_LOGOUT,
  };
};

export const handleNewMessage = (message, sender, recipientId) => {
  return (dispatch, getState) => {
    const { activeConversation, user } = getState();
    if (user.id === recipientId) {
      dispatch(setNewMessage(message, sender, activeConversation));
    }
  };
};

const appReducer = combineReducers({
  user,
  conversations,
  activeConversation,
});
const rootReducer = (state, action) => {
  if (action.type === CLEAR_ON_LOGOUT) {
    // set state to initial state
    state = undefined;
  }
  return appReducer(state, action);
};

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
