import React from "react";
import { shallow } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils';

Enzyme.configure({ adapter: new Adapter() });


let wrapper = shallow(<Notifications />);
describe('Notifications component', () => {
  it('Renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('renders NotificationItem elements', () => {
    wrapper = shallow(<Notifications displayDrawer={true} />);
    const nItem = wrapper.find('NotificationItem');
    expect(nItem).toBeTruthy();
    expect(nItem).toBeDefined();
  });
  it('renders the text Here is the list of notifications', () => {
    wrapper = shallow(<Notifications displayDrawer={true} />);
    const result = wrapper.find('.Notifications p').text();
    expect(result).toBe('Here is the list of notifications');
  });
  it('menuItem with displayDrawer false', () => {
    const wrapper = shallow(<Notifications />);
    const mItem = wrapper.find('div.menuItem');
    expect(mItem).toHaveLength(1);
  });

  it('Notification with displayDrawer false', () => {
    const wrapper = shallow(<Notifications />);
    const dNoti = wrapper.find('div.Notifications');
    expect(dNoti).toHaveLength(0);
  });

  it('menuItem with displayDrawer true', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    const mItem = wrapper.find('div.menuItem');
    expect(mItem).toHaveLength(1);
  });

  it('displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    const dNoti = wrapper.find('div.Notifications');
    expect(dNoti).toHaveLength(1);
  });
});

describe('listNotifications with values', () => {
  let latestNotification = undefined;
  let listNotifications = undefined;

  beforeEach(() => {
    latestNotification = getLatestNotification();
    listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: latestNotification } },
    ];
  });

  it('values', () => {
    const wrapper = shallow(
      <Notifications displayDrawer listNotifications={listNotifications} />
    );
    expect(wrapper.exists());
    const nItem = wrapper.find('NotificationItem');
    expect(nItem).toBeDefined();
    expect(nItem).toHaveLength(3);
    expect(nItem.at(0).html()).toEqual(
      '<li data-notification-type="default">New course available</li>'
    );
    expect(nItem.at(1).html()).toEqual(
      '<li data-notification-type="urgent">New resume available</li>'
    );
    expect(nItem.at(2).html()).toEqual(
      `<li data-notification-type="urgent">${latestNotification}</li>`
    );
  });
});

describe('listNotifications without values', () => {
  let listNotifications = undefined;
  beforeEach(() => {
    listNotifications = [];
  });

  it('empty', () => {
    const wrapper = shallow(
      <Notifications displayDrawer listNotifications={listNotifications} />
    );
    expect(wrapper.exists());
    const nItem = wrapper.find('NotificationItem');
    expect(nItem).toHaveLength(1);
    expect(nItem.html()).toEqual(
      '<li data-notification-type="default">No new notification for now</li>'
    );
  });

  it('without listNotifications', () => {
    const wrapper = shallow(<Notifications displayDrawer />);
    const nItem = wrapper.find('NotificationItem');
    expect(nItem).toHaveLength(1);
    expect(nItem.html()).toEqual(
      '<li data-notification-type="default">No new notification for now</li>'
    );
  });
});