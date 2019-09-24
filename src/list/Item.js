import React from 'react';

/**
 * Represents an individual item. It currently always has a checkbox.
 * TODO: decompose into CheckedItem and NormalItem
 */
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
      display = <span className="short-desc">{this.state.shortDesc}</span>
    }
    return (
      <li className="task-item" id={this.state.id}>
        <input type="checkbox" defaultChecked={this.state.checked} onClick={this.handleClick}/>
        {display}
        &nbsp;
        <span onClick={(e) => this.toggleEdit(this.state.id)}>[...]</span>
      </li>
    )
  }
}

export default Item;