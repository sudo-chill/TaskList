import React from 'react';
import {shallow, mount} from 'enzyme';

import List from '../list/List';
import { createItem } from '../service/ListService';

jest.mock('../service/ListService');

describe('<List />', () => {
  describe('constructor()', () => {
    it('assigns correct state values from props', () => {
      const wrapper = mount(<List id={1} title="a title" />);

      expect(wrapper.instance().createInput).toBeTruthy();
      const state = wrapper.instance().state;
      expect(state.items).toEqual([]);
    });

    it('optionally adds items from props if present', () => {
      const items = [{id: 1, shortDesc: 'an item', checked: true}];
      const wrapper = shallow(<List id={1} title="a title" items={items} />);
      const state = wrapper.instance().state;

      expect(state.items).toEqual(items);
    });
  });

  describe('newItemSubmit()', () => {
    it('creates a new item with the given input', async () => {
      const fakeEvent = {preventDefault: () => {/* do nothing*/}};
      createItem.mockImplementation(() => {
        const fakeItem = {id: 2};
        return new Promise((resolve) => resolve(fakeItem));
      });

      // we include the attachTo part to avoid attaching directly to the document body, which is considered a bad practice
      const wrapper = mount(<List id={1} title="a title"/>, {attachTo: document.getElementById('root')});
      //createInput is a ref on the List component. It's accessed as a top-level property of the wrapper
      wrapper.instance().createInput.current.value = 'some text';
      // just like componentDidMount for TaskList, this uses await to make sure api call finishes before we run expectations
      await wrapper.instance().newItemSubmit(fakeEvent);

      const state = wrapper.instance().state;
      expect(state.items.length).toEqual(1);
    });
  });

  describe('render()', () => {
    it('renders empty when there are no items', () => {
      const wrapper = shallow(<List id={1} title="a title" />);

      expect(wrapper).toMatchSnapshot();
    });

    it('renders items when they are present', () => {
      const items = [{id: 1, shortDesc: 'an item', checked: true}];
      const wrapper = mount(<List id={1} title="a title" items={items} />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});