import React, { Fragment, Component } from 'react';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import PropTypes from 'prop-types';
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create(
  {
    AppHeader: {
      display: 'flex',
      color: 'rgb(231, 80, 80)',
      alignItems: 'center',
      borderBottom: 'thick solid rgb(231, 80, 80)',
    },
    
    AppHeaderH1: {
      margin: '0',
    },
    
    AppHeaderImg: {
      width: '150px',
    },
    
    AppBody: {
      padding: '2rem 0 0 2rem',
    },
    
    tags: {
      fontWeight: 'bold',
    },
    
    AppBodyInput: {
      marginRight: '1rem',
    },
    
    AppBodyButton: {
      cursor: 'pointer',
    },
    
    AppFooter: {
      textAlign: 'center',
      borderTop: 'thick solid rgb(231, 80, 80)',
      bottom: '0',
      position: 'fixed',
      fontStyle: 'italic',
      width: '100%',
    }
  }
);


class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleLogout);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleLogout);
  };

  handleLogout(e) {
    if (e.ctrlKey && e.key == 'h') {
      alert('Logging you out');
      this.props.logOut();
    };
  }

  render() {
    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];
    const { isLoggedIn } = this.props;
    return (
      <Fragment>
        <Notifications listNotifications={listNotifications} />
        <div className={css(styles.AppHeader)}>
          <Header />
        </div>
        <div className={css(styles.AppBody)}>
          {isLoggedIn ? (
            <BodySectionWithMarginBottom title='Course list'>
              <CourseList listCourses={listCourses} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title='Log in to continue'>
              <Login />
            </BodySectionWithMarginBottom>
          )}
        </div>
        <BodySection title='News from the School'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </BodySection>
        <div className={css(styles.AppFooter)}>
          <Footer />
        </div>
        
      </Fragment>
    );
  };
}

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => {undefined},
};
App.PropsTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

export default App;