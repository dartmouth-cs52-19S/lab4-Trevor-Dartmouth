import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { signinUser, signupUser } from '../actions';

/* Some UI Components adapted from Material UI */
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '70%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      isLogin: true,
    };
  }

  onEmailChange = (event) => {
    event.preventDefault();
    this.setState({ email: event.target.value });
  }

  onUsernameChange = (event) => {
    event.preventDefault();
    this.setState({ username: event.target.value });
  }

  onPasswordChange = (event) => {
    event.preventDefault();
    this.setState({ password: event.target.value });
  }

  onSignUp = (event) => {
    event.preventDefault();
    this.props.signupUser(this.state, this.props.history);
  }

  onSignIn = (event) => {
    event.preventDefault();
    this.props.signinUser(this.state, this.props.history);
  }

  onSwitchContext = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return { isLogin: !prevState.isLogin };
    });
  }

  renderLogIn = (classes) => {
    return (
      <div className="login">
        <h2>Login</h2>
        <TextField
          id="standard-uncontrolled"
          label="Username"
          className={classes.textField}
          onChange={this.onUsernameChange}
          value={this.state.username}
          margin="normal"
        />
        <TextField
          label="Password"
          className={classes.textField}
          type="password"
          onChange={this.onPasswordChange}
          value={this.state.password}
          margin="normal"
        />
        <div className="new-post-buttons">
          <Button variant="contained" color="secondary" onClick={this.onSwitchContext} className={classes.button}>
            Sign Up
          </Button>
          <Button variant="contained" color="secondary" onClick={this.onSignIn} className={classes.button}>
            Login
          </Button>
        </div>
        <Typography className="login-error" component="p" style={{ color: 'red', textAlign: 'center' }}>
          {this.props.error}
        </Typography>
      </div>
    );
  }

  renderSignUp = (classes) => {
    return (
      <div className="sign-up">
        <h2>Sign Up</h2>
        <TextField
          id="standard-uncontrolled"
          label="Email"
          className={classes.textField}
          onChange={this.onEmailChange}
          value={this.state.email}
          margin="normal"
        />
        <TextField
          label="Username"
          className={classes.textField}
          onChange={this.onUsernameChange}
          value={this.state.username}
          margin="normal"
        />
        <TextField
          label="Password"
          className={classes.textField}
          type="password"
          onChange={this.onPasswordChange}
          value={this.state.password}
          margin="normal"
        />
        <div className="new-post-buttons">
          <Button variant="contained" color="secondary" onClick={this.onSwitchContext} className={classes.button}>
            Log In
          </Button>
          <Button variant="contained" color="secondary" onClick={this.onSignUp} className={classes.button}>
            Sign Up
          </Button>
        </div>
        <Typography className="login-error" component="p" style={{ color: 'red', textAlign: 'center' }}>
          {this.props.error}
        </Typography>

      </div>
    );
  }

  render() {
    const { classes } = this.props;
    if (this.state.isLogin) {
      return (
        <div className="login-signup">
          {this.renderLogIn(classes)}
        </div>

      );
    }
    return (
      <div className="login-signup">
        {this.renderSignUp(classes)}
      </div>

    );
  }
}

const mapStateToProps = state => (
  {
    error: state.auth.error,
  }
);

export default withStyles(styles)(withRouter(connect(mapStateToProps, { signinUser, signupUser })(LoginPage)));
