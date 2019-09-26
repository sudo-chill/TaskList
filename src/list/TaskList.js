import React from 'react';
import './TaskList.css';
import List from './List';
import '../common/Ajax';
import Ajax from '../common/Ajax';

/**
 * Controls the entire task list, which includes making nested lists.
 */
class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: null,
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
    Ajax.fetchAjax('api/listing/list?asXhr=true')
      .then(
        (result) => {
          let listObjects = result.lists.map((l, i) => {
            return <List key={i} id={l._id} title={l._title} items={l._items} />
          });
          this.setState({
            isLoaded: true,
            lists: listObjects
          });
        })
      .catch(
        (error) => {
          if(error.json) {
            error = error.json;
          }
          this.setState({
            isLoaded: true,
            error: true,
            errorMessage: error
          });
        });
  }

  render() {
    const {error, errorMessage, isLoaded} = this.state;
    if(error) {
      if(errorMessage) {
        return <div><h1>Error: {errorMessage}</h1></div>
      } else {
        return <div><h1>An unknown error occurred</h1></div>
      }
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
