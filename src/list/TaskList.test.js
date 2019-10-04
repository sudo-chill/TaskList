import React from 'react';
import {shallow, mount} from 'enzyme';

import TaskList from '../list/TaskList';
import { getLists } from '../service/ListService';

// this will automatically mock everything in the file being used as the first arg. Online posts make it unclear if this is supposed to be set before
// or after the import; this ordering seems to work for me so I'm not changing it.
jest.mock('../service/ListService');

describe('<TaskList />', () => {
  it('renders as loading when rendered without mounting', () => {
    const wrapper = shallow(<TaskList />);
    expect(wrapper).toMatchSnapshot();
  });

  /*
   * The following tests took FOREVER to get right. The TaskList component loads up and calls componentDidMount(). That calls getLists, which makes an
   * AJAX request to get list content from the server. When the lists are returned, the state of the component is changed.
   *
   * Testing this meant 3 ingredients:
   * - component simulation: we need to render the component in some way to get it to mount. This uses enzyme.
   * - mocking: we don't wanna call the server, so we have to properly mock getLists to return canned answers. This users jest, which mocks getLists
   *            'in general' above, and with specific behaviors below.
   * - expecting on async: if we simply mounted the component and started checking its state, it wouldn't work because the content we are waiting for
   *                       comes in via async action. We need to wait for it to finish and then run expectations on it in the context of the test
   *                       case, preferably in a way without race conditions.
   *
   * A few notes:
   * - notice that each test is async, and we use await on componentDidMount(); I'm not entirely sure why this ensures the async stuff finishes, since
   *   I'm not sure if componentDidMount is itself implicitly returning a promise, or if await simply operates on all actice promises. Either way, it
   *   seems to make things work.
   * - notice that each test is NOT using the done() callback; I suspect that including that changes how the test runner handles the test, and it
   *   messes with async/await logic.
   */
  describe('loads lists', () => {
    it('and sets error to true if an error occurs', async () => {
      getLists.mockImplementation(() => {
        return Promise.reject({error: new Error('test error')});
      });

      const wrapper = mount(<TaskList />);
      await wrapper.instance().componentDidMount();

      const state = wrapper.instance().state;
      expect(state.isLoaded).toBe(true);
      expect(state.lists.length).toEqual(0);
      expect(state.error.message).toEqual('test error');
    });

    it('and renders lists after they load', async () => {
      getLists.mockImplementation(() => {
        const fakeData = {lists: [
          {'_id': 1, '_title': 'test list', '_items': [{'shortDesc': 'something', 'checked': true}]},
          {'_id': 2, '_title': 'test list 2', '_items': [{'shortDesc': 'something', 'checked': false}]}
        ]};
        // We need to return a promise that can resolve to our test data so the componentDidMount method can call then on it.
        return new Promise((resolve) => resolve(fakeData));
      });

      const wrapper = mount(<TaskList />);
      await wrapper.instance().componentDidMount();

      const state = wrapper.instance().state;
      expect(state.isLoaded).toBe(true);
      expect(state.lists.length).toEqual(2);
      expect(state.lists[0].props.title).toEqual('test list');
      expect(state.lists[1].props.title).toEqual('test list 2');
    });
  });
});
