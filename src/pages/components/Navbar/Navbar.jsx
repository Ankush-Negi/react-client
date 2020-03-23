import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: 6,
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  button: {
    fontSize: '0.8rem',
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography edge="start" variant="caption" className={classes.title}>
            Trainee Portal
          </Typography>
          <Button className={classes.button} color="inherit">TRAINEE</Button>
          <Button className={classes.button} color="inherit">TEXTFIELD DEMO</Button>
          <Button className={classes.button} color="inherit">INPUT DEMO</Button>
          <Button className={classes.button} color="inherit">CHILDREN DEMO</Button>
          <Button className={classes.button} color="inherit">LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
