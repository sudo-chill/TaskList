//https://dev.to/jhotterbeekx/testing-asynchronous-lifecycle-methods-with-jest-13jo


import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount} from 'enzyme';

import TaskList from '../list/TaskList';
import { fail } from 'assert';
import { getLists } from '../service/ListService';

jest.mock('../service/ListService');

const fake = {lists: [
  {'_id': 1, '_title': 'test list', '_items': [{'shortDesc': 'something', 'checked': true}]}
]};

describe('TaskList', () => {

  /*it('renders as loading when rendered without mounting', () => {
    const wrapper = shallow(<TaskList />);
    expect(wrapper).toMatchSnapshot();
  });*/

  it('sets error to true if an error occurs', async () => {
    getLists.mockImplementation(() => {
      return Promise.reject({error: new Error('blah')});
    });
    
    const wrapper = mount(<TaskList />);
    await wrapper.instance().componentDidMount();
    
    expect(wrapper.instance().state.isLoaded).toBe(true);
    expect(wrapper.instance().state.lists.length).toEqual(0);
    expect(wrapper.instance().state.error.message).toEqual('blah');
  });

  it('renders lists after they load', async () => {
    getLists.mockImplementation(() => {
      return new Promise((resolve, reject) => resolve(fake));
    });
    
    const wrapper = mount(<TaskList />);
    await wrapper.instance().componentDidMount();
    wrapper.instance().forceUpdate();
    
    expect(wrapper.instance().state.isLoaded).toBe(true);
    expect(wrapper.instance().state.lists.length).toEqual(1)
  });
});
