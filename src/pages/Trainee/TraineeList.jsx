import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';
import * as moment from 'moment';
import { AddDialog, TableComponent } from './components';
import trainee from './data/trainee';

const useStyles = {

  button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};
class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      order: 'asc',
      orderBy: 'Date',
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (values) => {
    this.setState({ open: false });
    console.log(values);
  }

  handleSort = (value) => {
    const { orderBy, order } = this.state;
    const isAsc = orderBy === value && order === 'asc';
    const data = isAsc ? 'desc' : 'asc';
    this.setState({
      order: data,
      orderBy: value,
    });
  }

  handleSelectChange = (value) => {
    console.log(value);
  }


  render() {
    const { open, order, orderBy } = this.state;
    const { classes } = this.props;
    const getDateFormatted = (date) => moment(date).format('dddd,MMMM Do YYYY, h:mm:ss a');
    return (
      <>
        <div className={classes.button}>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Add Trainee
          </Button>
        </div>
        <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
        <TableComponent
          id="id"
          data={trainee}
          column={[{
            field: 'name',
            label: 'Name',
          },
          {
            field: 'email',
            label: 'Email-Address',
            format: (value) => value && value.toUpperCase(),

          },
          {
            field: 'createdAt',
            label: 'Date',
            align: 'right',
            format: getDateFormatted,
          }]}

          order={order}
          orderBy={orderBy}
          onSort={this.handleSort}
          onSelect={this.handleSelectChange}

        />
      </>
    );
  }
}
export default withStyles(useStyles, { withTheme: true })(TraineeList);
TraineeList.propTypes = {
  // used in previous task
  // match: propTypes.objectOf(propTypes.any).isRequired,
  classes: propTypes.objectOf(propTypes.any).isRequired,
};
