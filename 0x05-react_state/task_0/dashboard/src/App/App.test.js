import { shallow } from 'enzyme';
import React from 'react';
import App from './App';
import { StyleSheetTestUtils } from "aphrodite";

describe('<App />', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });
  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
  });

  it('contain Notifications component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Notifications')).toHaveLength(1);
  });

  it('contain Header component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Header')).toHaveLength(1);
  });

  it('contain Login component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Login')).toHaveLength(1);
  });

  it('contain Footer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Footer')).toHaveLength(1);
  });

  it('CourseList', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('CourseList')).toHaveLength(0);
  });

  it('isLoggedIn true', () => {
    const wrapper = shallow(<App isLoggedIn />);
    expect(wrapper.find('Login')).toHaveLength(0);
    expect(wrapper.find('CourseList')).toHaveLength(1);
  });

  it('logOut', () => {
    const logOut = jest.fn(() => undefined);
    const wrapper = shallow(<App logOut={logOut} />);
    const alert = jest.spyOn(global, 'alert');
    expect(alert);
    expect(logOut);
    jest.restoreAllMocks();
  });
  it("Has default state for displayDrawer false", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().displayDrawer).toEqual(false);
  });

  it("displayDrawer changes to true when calling handleDisplayDrawer", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().displayDrawer).toEqual(false);

    const instance = wrapper.instance();

    instance.handleDisplayDrawer();

    expect(wrapper.state().displayDrawer).toEqual(true);
  });

  it("displayDrawer changes to false when calling handleHideDrawer", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().displayDrawer).toEqual(false);

    // const instance = wrapper.instance();

    wrapper.instance().handleDisplayDrawer();

    expect(wrapper.state().displayDrawer).toEqual(true);

    wrapper.instance().handleHideDrawer();

    expect(wrapper.state().displayDrawer).toEqual(false);
  });
});