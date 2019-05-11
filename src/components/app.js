/* eslint-disable new-cap */
import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, NavLink,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import RequireAuth from './requireAuth';
import Post from './post';
import NewPost from './newPost';
import HomePage from './homePage';
import LoginPage from './loginPage';
import { signoutUser } from '../actions';

/* Some UI Components adapted from Material UI */
const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
};

const App = (props) => {
  console.log(props);
  const FallBack = () => {
    return (
      <div>
        URL Not Found
      </div>
    );
  };

  const signOut = (event) => {
    event.preventDefault();
    console.log(props);
    props.signoutUser(props.history);
  };

  const renderSignIn = () => {
    if (props.authenticated) {
      return (
        <NavLink variant="h6" style={{ textDecoration: 'none', color: 'white', marginLeft: '3%' }} exact to="/">
          <div onClick={signOut} role="button" tabIndex={0}>
            Sign Out
          </div>
        </NavLink>
      );
    } else {
      return <NavLink variant="h6" style={{ textDecoration: 'none', color: 'white', marginLeft: '3%' }} to="/login">Sign In</NavLink>;
    }
  };

  const Nav = () => {
    const classes = props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <div className="menu-toolbar">
              <div className="header-left">
                <NavLink variant="h6" style={{ textDecoration: 'none', color: 'white' }} exact to="/">Home</NavLink>
                {renderSignIn()}
              </div>
              <div className="header-center">
                <Typography variant="h4" color="inherit">
                  Welcome to the CS52 Community Meme Page
                </Typography>
              </div>
              <div className="header-right">
                <NavLink variant="h6" style={{ textDecoration: 'none', color: 'white' }} to="/post/new">Add New Post</NavLink>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  };
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/post/new" component={RequireAuth(NewPost)} />
          <Route path="/posts/:postID" component={Post} />
          <Route path="/login" component={LoginPage} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default withStyles(styles)((connect(mapStateToProps, signoutUser)(App)));
