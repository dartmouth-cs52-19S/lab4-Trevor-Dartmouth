/* eslint-disable new-cap */
import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch,
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import RequireAuth from './requireAuth';
import NavBar from './navBar';
import Post from './post';
import NewPost from './newPost';
import HomePage from './homePage';
import LoginPage from './loginPage';

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
  const FallBack = () => {
    return (
      <div>
        URL Not Found
      </div>
    );
  };

  return (
    <Router>
      <div>
        <NavBar />
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

export default withStyles(styles)(App);
