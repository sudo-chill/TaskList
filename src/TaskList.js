import React from 'react';
import logo from './logo.svg';
import './TaskList.css';

function TaskList() {
  return (
    <div className="TaskList">
      <header className="TaskList-header">
        <img src={logo} className="TaskList-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="TaskList-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default TaskList;
