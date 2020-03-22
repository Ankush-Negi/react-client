import React from 'react';
import propTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ValidationSchema from './helper';

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isValid: true,
      allErrors: {},
      touch: {
        Name: true,
        Email: true,
        Password: true,
        ConfirmPassword: true,
      },
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleConfirmPasswordChange = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  hasError = (field) => {
    const {
      allErrors, name, email, password, confirmPassword,
    } = this.state;
    ValidationSchema.validateAt(field, {
      Name: name,
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword,
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
    const {
      open, onClose, onSubmit,
    } = this.props;
    const {
      isValid, name, email, password,
    } = this.state;
    return (
      <div>
        <Dialog open={open} fullWidth maxWidth="lg" onClose={onClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter you trainee details
            </DialogContentText>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name *"
                    error={this.getError('Name')}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={this.handleNameChange}
                    helperText={this.getError('Name')}
                    onBlur={() => this.isTouched('Name')}
                  />
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                  <TextField
                    error={this.getError('ConfirmPassword')}
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VisibilityOffIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={this.handleConfirmPasswordChange}
                    helperText={this.getError('ConfirmPassword')}
                    onBlur={() => this.isTouched('ConfirmPassword')}
                  />
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={isValid}
              onClick={() => {
                onSubmit({ name, email, password });
              }}
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
AddDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
};

export default AddDialog;
