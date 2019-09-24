import React from 'react';
import Item from './Item'

/**
 * This is a UI list, which is mostly to use a collection of Items.
 */
class List extends React.Component {
  constructor(props) {
    super(props);
    let itemDescs = props.items || [];
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
        <h3>{this.state.title}</h3>
        <ul>
          {this.state.items}
        </ul>
      </div>
    );
  }
}

export default List;