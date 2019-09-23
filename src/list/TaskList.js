import React from 'react';
import './TaskList.css';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortDesc: this.props.shortDesc
    }
  }

  render() {
    return (
      <li>{this.state.shortDesc}</li>
    )
  }
}


class List extends React.Component {
  constructor(props) {
    super(props);
    let itemDescs = ['test1', 'test2', 'test3', 'test4'];
    this.state = {
      title: 'I am a list!',
      items: itemDescs.map(function(desc, index) {
        return <Item shortDesc={desc} />
      })
    };
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.state.title}</h1>
        <ul>
          {this.state.items.map(function(item, index) {
            return (<li key={index}>{item}</li>);
          })}
        </ul>
      </React.Fragment>
    );
  }
}

function TaskList() {
  return (
    <div className="TaskList">
      <List />
    </div>
  );
}

export default TaskList;
