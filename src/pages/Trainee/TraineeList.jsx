import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { AddDialog, TableComponent } from './components/index';
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
    };
  }

   handleClickOpen = () => {
     this.setState({ open: true });
   };

   handleClose = () => {
     this.setState({ open: false });
   };

   onSubmitHandle = (values) => {
     this.setState({ open: false });
     console.log(values);
   }

   render() {
     const { open } = this.state;
     const { match: { url }, classes } = this.props;
     return (
       <>
         <div className={classes.button}>
           <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
       Add Trainee
           </Button>
         </div>
         <AddDialog open={open} onClose={this.handleClose} onSubmit={this.onSubmitHandle} />
         <TableComponent

           id="id"

           data={trainee}

           column={[{
             field: 'name',
             label: 'Name',
             align: 'center',
           },
           {
             field: 'email',
             label: 'Email-Address',

           }]}

         />
         <ul>
           {trainee.length && trainee.map((data) => (
             <Fragment key={data.id}>
               <li>
                 <Link to={`${url}/${data.id}`}>{data.name}</Link>
               </li>

             </Fragment>
           ))}
         </ul>
       </>
     );
   }
}
export default withStyles(useStyles, { withTheme: true })(TraineeList);
