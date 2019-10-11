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
    const {error, isLoaded} = this.state;
    if(!isLoaded) return <div>Loading...</div>;

    if(error) {
      if(error.error) {
        return <div><h1>Error: {error.error}</h1></div>
      } else {
        return <div><h1>An unknown error occurred</h1></div>
      }
    }

    if(this.state.lists.length === 0) {
      return (
        <h1>No lists! You should create one somehow</h1>
      );
    }

    return (
      <div className="TaskList">
        {this.state.lists}
      </div>
    );
  }
}

export default TaskList;
