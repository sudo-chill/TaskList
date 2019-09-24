import React from 'react';
import './TaskList.css';
import List from './List'

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
  componentDidMount() {
    fetch('api/listing/list')
      .then(res => res.json())
      .then(
        (result) => {
          let listObjects = result.lists.map((l, i) => {
            return <List key={i} id={i} title={l._title} items={l._items} />
          });
          this.setState({
            isLoaded: true,
            lists: listObjects
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      );
  }

  render() {
    const {error, isLoaded} = this.state;
    if(error) {
      return <div>Error: {error.message}</div>
    } else if(!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="TaskList">
          {this.state.lists}
        </div>
      );
    }
  }
}

export default TaskList;
