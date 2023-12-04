import React, { Fragment } from "react";
import './Notifications.css';
import close_icon from '../assets/close-icon.png';
import NotificationItem from "./NotificationItem";
import PropTypes from 'prop-types';
import NotificationItemShape from './NotificationItemShape';



const handleClick = () => {
  console.log(`Close button has been clicked`);
};

const Notifications = ({ displayDrawer, listNotifications }) => {
  return (
    <Fragment>
      <div className="menuItem">
        <p>Your notifications</p>
      </div>
      {displayDrawer && (
        <div className="Notifications">
          <p>Here is the list of notifications</p>
          <ul>
            {listNotifications.length === 0 && (
              <NotificationItem value='No new notification for now' />
            )}
            {listNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                type={notification.type}
                value={notification.value}
                html={notification.html}
              />
            ))}
          </ul>
          <button type="button"
            aria-label="close"
            onClick={handleClick}
            style={{
              cursor: 'pointer',
              display: 'inline',
              background: 0,
              top: '1rem',
              right: '1rem',
              border: 'none',
              position: 'absolute'
            }}
          >
              <img src={close_icon} alt="close" style={{ width: '8px', height: '8px' }}/>
          </button>
        </div>
      )};
    </Fragment>
  );
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

export default Notifications;