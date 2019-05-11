import React, { Component } from 'react';
import {
  withRouter, NavLink,
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { connect } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { signoutUser } from '../actions/index';

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

class NavBar extends Component {
  signOut = (event) => {
    event.preventDefault();
    this.props.signoutUser(this.props.history);
  };

  renderSignIn = () => {
    if (this.props.authenticated) {
      return (
        <NavLink variant="h6" style={{ textDecoration: 'none', color: 'white', marginLeft: '3%' }} exact to="/">
          <div onClick={this.signOut} role="button" tabIndex={0}>
            Sign Out
          </div>
        </NavLink>
      );
    } else {
      return <NavLink variant="h6" style={{ textDecoration: 'none', color: 'white', marginLeft: '3%' }} to="/login">Sign In</NavLink>;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <div className="menu-toolbar">
              <div className="header-left">
                <NavLink variant="h6" style={{ textDecoration: 'none', color: 'white' }} exact to="/">Home</NavLink>
                {this.renderSignIn()}
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
  }
}

const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default withStyles(styles)(withRouter(connect(mapStateToProps, { signoutUser })(NavBar)));
