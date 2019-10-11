import React from 'react';
import './TaskList.css';
import List from './List';
import { getLists } from '../service/ListService';

/**
 * Controls the entire task list, which includes making nested lists.
 */
class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      lists: []
    };
  }

  /**
   * This method is called by default when it's loaded. This is like an 'onready' event handler.
   * Here, we ask the server for all of the lists we can get. Currently, lists are global.
   * TODO: partition lists by user.
   */
  async componentDidMount() {
    var result, error;
    try {
      result = await getLists();
    } catch(res) {
      error = res.error;
    }

    if(error) {
      this.setState({
        error: error,
        isLoaded: true
      });
    } else {
      if(result && result.lists) {
        let listObjects = result.lists.map((list, i) => {
          return <List key={i} id={list._id} title={list._title} items={list._items} />;
        });
        this.setState({
          isLoaded: true,
          lists: listObjects
        });
      }
    }
  }

  render() {
    let body;
    const {error, isLoaded} = this.state;
    if(!isLoaded) {
      body = <p>Loading...</p>;
    } else if(error) {
      if(error.error) {
        body = <h3>Error: {error.error}</h3>;
      } else {
        body = <h3>An unknown error occurred</h3>
      }
    } else if(this.state.lists.length === 0) {
      body = <h3>No lists! You should create one somehow</h3>
    } else {
      body = this.state.lists;
    }

    return (
      <div className="TaskList">
        <h1>Your Lists</h1>
        {body}
      </div>
    );
  }
}

export default TaskList;
