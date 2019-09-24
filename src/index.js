import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TaskList from './list/TaskList';
import * as serviceWorker from './serviceWorker';

// Entry point of app. This adds our application's root element under the intended div located in
// public/index.html.
ReactDOM.render(<TaskList />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
