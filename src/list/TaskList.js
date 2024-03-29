import React from 'react';
import './TaskList.css';
import List from './List';
import { getLists, deleteListById, createNewList } from '../service/ListService';

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
    this.newList = React.createRef();
    this.deleteList = this.deleteList.bind(this);
    this.createList = this.createList.bind(this);
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
        this.setState({
          isLoaded: true,
          lists: result.lists
        });
      }
    }
  }

  clearError() {
    this.setState({error: null});
  }

  async createList() {
    let newListTitle = this.newList.current.value;
    if(!newListTitle) {
      newListTitle = '';
    }
    newListTitle = newListTitle.trim();
    if(newListTitle !== '') {
        createNewList(newListTitle)
          .then((result) => {
            let newListData = {id: result.listId, title: newListTitle};
            let lists = this.state.lists;
            lists.push(newListData);
            this.setState({lists: lists});
            this.newList.current.value = '';
          });
    }
  }

  async deleteList(id) {
    if(window.confirm('Are you sure?')) {
      this.clearError();
      var error;
      try {
        await deleteListById(id);
      } catch(res) {
        error = res.error ? res.error : res;
      }

      if(error) {
        this.setState({
          error: error
        });
      } else {
        const updatedLists = this.state.lists.filter((l) => {
          return l._id !== id;
        });

        this.setState({
          lists: updatedLists
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
      body = <h3>No lists! You should create one.</h3>
    } else {
      let listObjects = this.state.lists.map((list, i) => {
        return (
          <div key={i} className="list" id={`list-${list._id}`}>
            <p className="delete-list" onClick={() => {this.deleteList(list._id)}}>X</p>
            <List id={list._id} title={list._title} items={list._items} />
          </div>
        );
      });
      body = listObjects;
    }

    const newList = (
      <div className="newList list" id="new-list">
        <input ref={this.newList} type="text" placeholder="new list title" />
        <p className="addList" onClick={this.createList}>+</p>
      </div>
    );

    return (
      <div className="TaskList">
        <h1>Your Lists</h1>
        <hr />
        {body}
        {newList}
      </div>
    );
  }
}

export default TaskList;
