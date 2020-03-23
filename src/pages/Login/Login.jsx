import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import PropTypes from 'prop-types';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LoginValidationSchema from './helper';

const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 100,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  avatar: {
    margin: 20,
    backgroundColor: 'red',
  },
  submit: {
    marginTop: 50,
  },
  grid: {
    padding: 10,
  },
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValid: true,
      allErrors: {},
      touch: {
        Email: true,
        Password: true,
      },
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  hasError = (field) => {
    const {
      allErrors, email, password,
    } = this.state;
    LoginValidationSchema.validateAt(field, {
      Email: email,
      Password: password,
    }).then(() => {
      if (allErrors[field]) {
        delete allErrors[field];
        this.setState(allErrors);
      }
      return false;
    }).catch((error) => {
      if (allErrors[field] !== error.message) {
        this.setState({
          allErrors: {
            ...allErrors,
            [field]: error.message,
          },
        });
      }
      return true;
    });
  };

  getError = (field) => {
    const {
      touch, allErrors, isValid,
    } = this.state;
    this.hasError(field);
    if (!Object.keys(touch).length && !Object.keys(allErrors).length && isValid) {
      this.setState({ isValid: false });
    }
    if (allErrors[field] && !touch[field]) {
      if (!isValid) {
        this.setState({ isValid: true });
      }
      return allErrors[field];
    }
    return false;
  }

  isTouched = (value) => {
    const { touch } = this.state;
    delete touch[value];
    this.setState({ touch });
  };

  render = () => {
    const { classes } = this.props;
    const { isValid } = this.state;
    return (
      <div>
        <CssBaseline />
        <Grid container className={classes.container}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Login
            </Typography>
            <Grid item xs={12} className={classes.grid}>
              <TextField
                label="Email Address"
                error={this.getError('Email')}
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={this.handleEmailChange}
                helperText={this.getError('Email')}
                onBlur={() => this.isTouched('Email')}
              />
            </Grid>
            <Grid item xs={12} className={classes.grid}>
              <TextField
                label="Password"
                error={this.getError('Password')}
                type="password"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VisibilityOffIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={this.handlePasswordChange}
                helperText={this.getError('Password')}
                onBlur={() => this.isTouched('Password')}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isValid}
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </div>
        </Grid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.oneOfType(['object', 'string']).isRequired,
};

export default withStyles(styles)(LoginPage);
