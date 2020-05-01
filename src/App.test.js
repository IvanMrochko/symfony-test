import React from 'react';
import App from './App';
import { mount } from 'enzyme';
import Input from '@material-ui/core/Input';
const setupBy = (method, Component, props) => method(<Component {...props} />);

const setup = (props) => setupBy(mount, App, props)
describe('test app', () => {

  const onChange = jest.fn();
  const props = { onChange, value: '' };
  it('hasTextInput', () => {
    const component = setup({ ...props });
    expect(component.exists(Input)).toBeTruthy();
  });

  // it('onChangeTrigger', () => {
  //   const component = setup({ ...props });
  //   // const component = setup({ ...props });
  //   // const readAsText = jest.fn();
  //   const fileContents = 'json.json';
  //   // const blob = new Blob([fileContents], { type: 'text/plain' });
  //   // const addEventListener = jest.fn((_, evtHandler) => { evtHandler(); });
  //   // const dummyFileReader = { addEventListener, readAsText, result: fileContents };
  //   // window.FileReader = jest.fn(() => dummyFileReader);

  //   component.find(Input).invoke('onChange')({ target: { files: [fileContents] } });

  //   // expect(FileReader).toHaveBeenCalled();
  //   // expect(addEventListener).toHaveBeenCalledWith('onload', () => { });
  //   // expect(readAsText).toHaveBeenCalledWith(blob);
  //   expect(component.find(Input).text()).toEqual(fileContents);
  // })
})
