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
    this.onEnter = this.onEnter.bind(this);
  }

  async onEnter(e) {
    if(e.key === 'Enter') {
      return this.newItemSubmit();
    }
  }

  async newItemSubmit() {
    let newItemData = {checked: false};
    let newItemInfo = this.createInput.current.value;
    if(!newItemInfo) {
      newItemInfo = '';
    }
    newItemInfo = newItemInfo.trim();
    if(newItemInfo !== '') {
      newItemData.shortDesc = newItemInfo;
      const fetchArgs = {method: 'POST',
                         body: JSON.stringify({id: this.props.id, item: newItemData}),
                         headers: {'Content-Type': 'application/json'}};
      createItem(fetchArgs)
        .then((result) => {
          newItemData.id = result.newId;
          let items = this.state.items;
          items.push(newItemData);
          this.setState({items: items});
          this.createInput.current.value = '';
        });
    }
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
      <React.Fragment>
        <h3 className="list-title">{this.props.title}</h3>
        {itemBody}
        <div className="new-item">
          <p>
            <input type="text" className="new-item-desc" placeholder="new item" ref={this.createInput} onKeyDown={this.onEnter} />
            &nbsp;
            <span className="new-item-submit" onClick={this.newItemSubmit}>+</span>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default List;