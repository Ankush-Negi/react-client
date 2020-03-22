import React from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './components';

class TraineeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onSubmit = (values) => {
    this.setState({ open: false });
    console.log(values);
  };

  render = () => {
    const { open } = this.state;
    return (
      <>
        <Button variant="outlined" color="primary" onClick={this.handleOpen}>
          Add Trainee
        </Button>
        <AddDialog
          open={open}
          onClose={this.handleClose}
          onSubmit={this.onSubmit}
        />
      </>
    );
  };
}

export default TraineeComponent;
