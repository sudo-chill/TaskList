import React from 'react';
import {shallow, mount} from 'enzyme';

import List from '../list/List';
import Item from './Item';
import { createItem } from '../service/ListService';

jest.mock('../service/ListService');

describe('<List />', () => {
  describe('constructor()', () => {
    it('assigns correct state values from props', () => {
      const wrapper = mount(<List id={1} title={"a title"} />);

      expect(wrapper.instance().createInput).toBeTruthy();
      const state = wrapper.instance().state;
      expect(state.id).toEqual(1);
      expect(state.title).toEqual("a title");
      expect(state.items).toEqual([]);
    });

    it('optionally adds items from props if present', () => {
      const items = [{id: 1, shortDesc: 'an item', checked: true}];
      const wrapper = shallow(<List id={1} title={"a title"} items={items} />);
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

      const wrapper = mount(<List id={1} title={'a title'}/>, {attachTo: document.getElementById('root')});
      wrapper.instance().createInput.current.value = 'some text';
      await wrapper.instance().newItemSubmit(fakeEvent);

      const state = wrapper.instance().state;
      expect(state.items.length).toEqual(1);
    });
  });

  describe('render()', () => {

  });
});