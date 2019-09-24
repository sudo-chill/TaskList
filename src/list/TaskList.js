import React from 'react';
import './TaskList.css';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      shortDesc: this.props.shortDesc,
      checked: this.props.checked,
      editing: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      shortDesc: state.shortDesc,
      checked: !this.state.checked
    }));
  }

  toggleEdit(elemId) {
    let newState = {};
    newState['checked'] = this.state.checked;
    if(this.state.editing) {
      let _item = document.getElementById(elemId);
      console.log(_item);
      let input = _item.getElementsByTagName('input')[1]; //[0] is the checkbox
      newState['shortDesc'] = input.value;
    } else {
      newState['shortDesc'] = this.state.shortDesc;
    }
    newState['editing'] = !this.state.editing;
    this.setState(newState);
  }

  render() {
    let display;
    if(this.state.editing) {
      display = <input type="text" defaultValue={this.state.shortDesc} />
    } else {
      display = <span class="short-desc">{this.state.shortDesc}</span>
    }
    return (
      <li class="task-item" id={this.state.id}>
        <input type="checkbox" defaultChecked={this.state.checked} onClick={this.handleClick}/>
        {display}
        &nbsp;
        <span onClick={(e) => this.toggleEdit(this.state.id)}>[...]</span>
      </li>
    )
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    let itemDescs = props.items || [{desc: 'test1', checked: true},
                                    {desc: 'test2', checked: false},
                                    {desc: 'test3', checked: false},
                                    {desc: 'test4', checked: true}];
    this.state = {
      id: this.props.id,
      title: this.props.title,
      items: itemDescs.map((item, index) =>
        <Item key={index} id={this.props.id + '-' + index} shortDesc={item['desc']} checked={item['checked']} />
      )
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <ul>
          {this.state.items}
        </ul>
      </div>
    );
  }
}

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      lists: []
    };
  }

  componentDidMount() {
    fetch('api/lists/list')
      .then(res => res.json())
      .then(
        (result) => {
          let listObjects = result.lists.map((l, i) => {
            console.log(l);
            return <List key={i} id={i} title={l._title} items={l._items} />
          });
          const id = listObjects.length;
          listObjects.push(<List key={id} id={id} title="default list" />);
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
    const {error, isLoaded, lists} = this.state;
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
