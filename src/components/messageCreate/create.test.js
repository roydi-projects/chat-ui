import React from 'react';
import MessageCreate from '../messageCreate';
import renderer from 'react-test-renderer';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    if (key === 'avatar') {
      return 'https://spotim-demo-chat-server.herokuapp.com/avatars/004-jigglypuff.png';
    }

    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
};

global.localStorage = new LocalStorageMock;

test('Should pass a Component snapshot test', () => {
  const sendMessage = null;
  const onSetUsername = null;
  const component = renderer.create(
    <MessageCreate sendMessage={sendMessage} onSetUsername={onSetUsername}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Should not send the message', () => {
  const sendMessageMock = jest.fn();
  const onSetUsername = null;
  const component = mount(
    <MessageCreate sendMessage={sendMessageMock} onSetUsername={onSetUsername}/>,
  );
  component.instance().setState({message: ''});
  const button = component.find('[data-test="test-btn"]').hostNodes().simulate('click');
  expect(sendMessageMock.mock.calls.length).toEqual(0);
});

// test('Should send the message', () => {
//   const sendMessageMock = jest.fn();
//   const onSetUsername = null;
//   const component = mount(
//     <MessageCreate sendMessage={sendMessageMock} onSetUsername={onSetUsername}/>,
//   );
//   component.instance().setState({message: 'test'});
//   const button = component.find('[data-test="test-btn"]').hostNodes().simulate('click');
//   expect(sendMessageMock.mock.calls.length).toEqual(1);
// });
