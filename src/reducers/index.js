import counterReducer from './counter';
import loggedReducer from './isLogged';
import senderReducer from './senderReducer';
import receiverReducer from './receiverReducer';
import {combineReducers} from 'redux';

const allReducers= combineReducers({
    counter : counterReducer,
    isLogged: loggedReducer,
    sender: senderReducer,
    receiver: receiverReducer
});

export default allReducers;
