import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
//import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import reactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducers';


function saveToLocalStorage(state) {
    try {
        const seriliazedState = JSON.stringify(state);
        localStorage.setItem('store', seriliazedState);
    } catch (err) {
        console.log(err);
    }
}


function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('store');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        console.log(err);
        return undefined;
    }
};
const persistedState = loadFromLocalStorage();
console.log(persistedState);
let store = createStore(
    allReducers,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStorage(store.getState()));

// store.dispatch(increment());

// //=====STORE -- GLOBALIZED STATE

// //=====ACTION- IT DESCRIBE WHAT U WANT TO DO INCREMENT - function that return an object

// const increment = () => {
//     return {
//         type: 'INCREMENT'
//     }
// }
// const decrement = () => {
//     return {
//         type: 'DECREMENT'
//     }
// }

// //=====REDUCER, DESCRIBE HOW ACTION TRANSFORM ONE ACTION TO ANOTHER
// const counter = (state = 0, action) => {
//     switch (action.type) {
//         case 'INCREMENT':
//             return state + 1;
//         case 'DECREMENT':
//             return state -1;
//     }
// }

// let store = createStore(counter);


// //====display it in console
// store.subscribe(() => console.log(store.getState()));


// //=====DISPATCH- EXECUTING THE ACTION
// store.dispatch(increment());
// store.dispatch(decrement());


reactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));  