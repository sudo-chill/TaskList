import React from 'react';

/**
 * Represents an individual item. It currently always has a checkbox.
 * TODO: decompose into CheckedItem and NormalItem
 */
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortDesc: this.props.shortDesc,
      checked: this.props.checked || false,
      editing: false
    }
    this.descInput = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      checked: !this.state.checked
    }));
  }

  toggleEdit() {
    let newState = {'editing': !this.state.editing};
    if(this.state.editing) {
      newState['shortDesc'] = this.descInput.current.value;
    }
    this.setState(newState);
  }

  render() {
    let display;
    if(this.state.editing) {
      display = <input ref={this.descInput} type="text" defaultValue={this.state.shortDesc} />
    } else {
      display = <span className="short-desc">{this.state.shortDesc}</span>
    }
    return (
      <li className="task-item" id={this.props.id}>
        <input type="checkbox" defaultChecked={this.state.checked} onClick={this.handleClick} />
        {display}
        &nbsp;
        <span onClick={this.toggleEdit}>[...]</span>
      </li>
    )
  }
}

export default Item;