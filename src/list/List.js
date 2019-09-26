import React from 'react';
import Item from './Item';
import Ajax from '../common/Ajax';

/**
 * This is a UI list, which is mostly to use a collection of Items.
 */
class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      items: this.props.items || []
    };
    this.newItemSubmit = this.newItemSubmit.bind(this);
  }

  newItemSubmit(e) {
    e.preventDefault();
    let newItemData = {checked: false};
    const newItemInfo = document.getElementById(this.newItemInputId());
    if(newItemInfo.value && newItemInfo.value !== '') {
      newItemData.shortDesc = newItemInfo.value;
      const fetchArgs = {method: 'POST',
                         body: JSON.stringify({id: this.state.id, item: newItemData}),
                         headers: {'Content-Type': 'application/json'}};
      Ajax.fetchAjax('api/listing/create-item', fetchArgs)
        .then((result) => {
          newItemData.id = result.newId;
          console.log(newItemData);
          let items = this.state.items;
          items.push(newItemData);
          this.setState({items: items});
        });
    }
    return false;
  }

  newItemInputId() {
    return this.state.id + '-newItemInput';
  }
  
  render() {
    var transformedItems = this.state.items.map((item, index) => {
      return <Item key={index} id={this.state.id + '-' + item.id} shortDesc={item.shortDesc} checked={item.checked} />
    });
    return (
      <div>
        <h3>{this.state.title}</h3>
        <ul>
          {transformedItems}

          <form onSubmit={this.newItemSubmit}>
            <li><input type="text" placeholder="new item" id={this.newItemInputId()} onSubmit={(e) => this.newItemSubmit(e)}/></li>
            <input type="submit" value="Save" />
          </form>
        </ul>
      </div>
    );
  }
}

export default List;