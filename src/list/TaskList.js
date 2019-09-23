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
    let itemDescs = [{desc: 'test1', checked: true},
                     {desc: 'test2', checked: false},
                     {desc: 'test3', checked: false},
                     {desc: 'test4', checked: true}];
    this.state = {
      id: this.props.id,
      title: 'I am a list!',
      items: itemDescs.map((item, index) =>
        <Item key={index} id={this.props.id + '-' + index} shortDesc={item['desc']} checked={item['checked']} />
      )
    };
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.title}</h1>
        <ul>
          {this.state.items}
        </ul>
      </React.Fragment>
    );
  }
}

function TaskList() {
  return (
    <div className="TaskList">
      <List id="1"/>
    </div>
  );
}

export default TaskList;
