import React from 'react';
import {shallow, mount} from 'enzyme';

import Item from './Item';

describe('<Item />', () => {
  describe('constructor()', () => {
    it('correctly sets initial state', () => {
      const wrapper = shallow(<Item id="1-1" shortDesc="a desc" checked={true} />);

      const state = wrapper.instance().state;
      expect(state.shortDesc).toEqual('a desc');
      expect(state.checked).toBe(true);
      expect(state.editing).toBe(false);
    });

    it('defaults checked to false if not provided', () => {
      const wrapper = shallow(<Item id="1-1" shortDesc="a desc" />);

      expect(wrapper.instance().state.checked).toBe(false);
    });
  });

  describe('handleClick()', () => {
    it('changes checkbox state', () => {
      const wrapper = shallow(<Item id="1-1" shortDesc="a desc" checked={false} />);
      wrapper.instance().handleClick();

      expect(wrapper.instance().state.checked).toBe(true);
    });
  });

  describe('toggleEdit()', () => {
    it('can toggle between editing and regular state, and applies changes to description', () => {
      const wrapper = mount(<Item id="1-1" shortDesc="a desc" checked={false} />);
      expect(wrapper.instance().state.editing).toBe(false);

      wrapper.instance().toggleEdit();
      expect(wrapper.instance().state.editing).toBe(true);

      wrapper.instance().descInput.current.value = "new desc";
      wrapper.instance().toggleEdit();

      const state = wrapper.instance().state;
      expect(state.editing).toBe(false);
      expect(state.shortDesc).toEqual('new desc');
    });
  });

  describe('render()', () => {
    it('renders default state as expected', () => {
      const wrapper = shallow(<Item id="1-1" shortDesc="a desc" checked={true} />);

      expect(wrapper).toMatchSnapshot();
    });

    it('renders an input when editing', () => {
      const wrapper = mount(<Item id="1-1" shortDesc="a desc" checked={true} />);
      wrapper.instance().toggleEdit();
      wrapper.update();

      expect(wrapper).toMatchSnapshot();
    });
  });
});