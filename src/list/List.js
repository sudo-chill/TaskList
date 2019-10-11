import React from 'react';
import Item from './Item';
import { createItem } from '../service/ListService';

/**
 * This is a UI list, which is mostly to use a collection of Items.
 */
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items || [],
    };
    this.createInput = React.createRef();
    this.newItemSubmit = this.newItemSubmit.bind(this);
  }

  async newItemSubmit(e) {
    e.preventDefault();
    let newItemData = {checked: false};
    const newItemInfo = this.createInput.current;
    if(newItemInfo.value && newItemInfo.value !== '') {
      newItemData.shortDesc = newItemInfo.value;
      const fetchArgs = {method: 'POST',
                         body: JSON.stringify({id: this.props.id, item: newItemData}),
                         headers: {'Content-Type': 'application/json'}};
      createItem(fetchArgs)
        .then((result) => {
          newItemData.id = result.newId;
          let items = this.state.items;
          items.push(newItemData);
          this.setState({items: items});
        });
    }
    return false;
  }

  newItemInputId() {
    return `list-${this.props.id}-newItemInput`;
  }

  render() {
    let itemBody;
    if(this.state.items.length === 0) {
      itemBody = <p>You have no items! You can add one below</p>
    } else {
      var transformedItems = this.state.items.map((item, index) => {
        return <Item key={index} id={`list-${this.props.id}-${item.id}`} shortDesc={item.shortDesc} checked={item.checked} />
      });
      itemBody = <ul>{transformedItems}</ul>
    }

    return (
      <div id={`list-${this.props.id}`}>
        <h3>{this.props.title}</h3>
        {itemBody}
        <form onSubmit={this.newItemSubmit}>
          <p><input type="text" placeholder="new item" ref={this.createInput} onSubmit={(e) => this.newItemSubmit(e)} /></p>
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default List;