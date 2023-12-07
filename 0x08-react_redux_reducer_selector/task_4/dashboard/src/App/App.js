import React, { Fragment, PureComponent } from 'react';
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
import { user, logOut } from './AppContext';
import AppContext from './AppContext';



const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];
export const initialListNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];




class App extends PureComponent {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);

    this.state = {
      displayDrawer: false, 
      user, 
      logOut, 
      listNotifications: initialListNotifications,
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleLogout);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleLogout);
  };
  
  handleDisplayDrawer() {
    this.setState((prevState) =>({
      ...prevState, displayDrawer: true
    }))
  }

  handleHideDrawer() {
    this.setState((prevState) =>({
      ...prevState, displayDrawer: false
    }))
  }

  handleLogout(e) {
    if (e.ctrlKey && e.key == 'h') {
      alert('Logging you out');
      this.props.logOut();
    };
  }


  handleLoginSubmit() {
    return this.logIn();
  }


  logIn = (email, password) => {
    this.setState((prevState) => ({
      ...prevState,
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    }));
  };

  logOut() {
    this.setState((prevState) => ({
      ...prevState.user, isLoggedIn: false
    }));
  }

  markNotificationAsRead(id) {
    this.setState({
      listNotifications: this.state.listNotifications.filter((notification) => {
        return notification.id !== id;
      }),
    });
  }

  
  


  render() {
    // const { isLoggedIn } = this.props;
    
    const {
       displayDrawer,
       user,
       user: { isLoggedIn },
       logOut,
       listNotifications,
      } = this.state;

      const value = { user, logOut }; 

    return (
      <Fragment>
        <AppContext.Provider value={value} >
          <Notifications
          listNotifications={listNotifications} 
          displayDrawer={displayDrawer}
          handleDisplayDrawer={this.handleDisplayDrawer}
          handleHideDrawer={this.handleHideDrawer}
          markNotificationAsRead={this.markNotificationAsRead}
          />
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
                <Login logIn={this.logIn}/>
              </BodySectionWithMarginBottom>
            )}
          </div>
          <div className={css(styles.AppBodyInput)}>
            <BodySection title='News from the School'>
              <p>
                llaborum cillum in nulla adipiscing do irure incididunt id id velit qui dolor lorem aliquip enim sunt. Excepteur eiusmod nostrud in voluptate sint laborum tempor aliqua ullamco labore exercitation laboris laborum officia dolore sit ipsum. et exercitation eu anim incididunt sint deserunt cillum ipsum enim ut incididunt ex aute do minim reprehenderit. ad dolor id non et mollit lorem aliqua nostrud velit irure anim Excepteur ex magna nulla pariatur id. deserunt sed cupidatat qui occaecat commodo laboris enim laborum incididunt esse aliqua occaecat Duis culpa in tempor quis minim.
              </p>
            </BodySection>
          </div>
          <div className={css(styles.AppFooter)}>
            <Footer />
          </div>
        </AppContext.Provider>
      </Fragment>
    );
  };
}

App.defaultProps = {
  // isLoggedIn: false,
  // logOut: () => {undefined},
};
App.PropsTypes = {
  // isLoggedIn: PropTypes.bool,
  // logOut: PropTypes.func,
};




const screenSize = {
  small: "@media screen and (max-width: 900px)",
};

const styles = StyleSheet.create(
  {
    AppHeader: {
      display: 'flex',
      color: 'rgb(231, 80, 80)',
      alignItems: 'center',
      borderBottom: 'thick solid rgb(231, 80, 80)',
      width: '100%'
    },
    
    AppHeaderH1: {
      margin: '0',
    },
    
    AppHeaderImg: {
      width: '15rem',
    },
    
    AppBody: {
      padding: '2rem 0 0 2rem',
    },
    
    tags: {
      fontWeight: 'bold',
    },
    
    AppBodyInput: {
      margin: '0 2rem',
    },
    
    AppBodyButton: {
      cursor: 'pointer',
    },
    
    AppFooter: {
      justifyContent: "center",
      borderTop: 'thick solid rgb(231, 80, 80)',
      bottom: '0',
      position: 'fixed',
      fontStyle: 'italic',
      width: '100%',
      display: 'flex',
      [screenSize.small]: {
        position: "static",
      },
    }
  }
);



export default App;