import React from 'react';
import * as yup from 'yup';
import { options, footballRadioOptions, cricketRadioOptions } from '../../configs/constants';
import { TextField } from '../../components/TextField';
import { SelectField } from '../../components/SelectField';
import { RadioGroup } from '../../components/RadioGroup/index';
import { Button } from '../../components/button';

const ValidationSchema = yup.object().shape({
  TextField: yup
    .string()
    .required('Name is a required field')
    .min(3)
    .matches('^[A-Za-z\\s]+$'),
  SelectField: yup
    .string()
    .required('Sport is a required field'),
  RadioGroup: yup
    .string()
    .required('What you do is a required field'),
});


class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      isValid: false,
      allError: {},
      touch: {
        TextField: false,
        SelectField: false,
        RadioGroup: false,
      },
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value }, () => console.log(this.state));
  };

  handleSportChange = (e) => {
    this.setState({ sport: e.target.value }, () => console.log(this.state));
    if (e.target.value === 'cricket') {
      this.setState({ football: '' });
    }
    if (e.target.value === 'football') {
      this.setState({ cricket: '' });
    }
    if (e.target.value === 'select') {
      this.setState({ sport: '', cricket: '', football: '' });
    } else {
      this.setState({ cricket: '', football: '' });
    }
  };

  hasError = () => {
    const {
      name, sport, football, cricket, isValid,
    } = this.state;
    ValidationSchema.isValid({
      TextField: name,
      SelectField: sport,
      RadioGroup: cricket || football,
    }, { abortEarly: false })
      .then((value) => {
        if (isValid !== value) {
          this.setState({ isValid: value });
        }
      });
    return isValid;
  };

  isTouched = (value) => {
    const { touch } = this.state;
    this.setState({
      touch: {
        ...touch,
        [value]: true,
      },
    });
  };

  getError = (field) => {
    const { touch, allError } = this.state;
    if (!this.hasError() && touch[field]) {
      const {
        name, sport, football, cricket,
      } = this.state;
      ValidationSchema.validateAt(field, {
        TextField: name,
        SelectField: sport,
        RadioGroup: cricket || football,
      }).then(() => {
        if (allError[field] !== undefined) {
          this.setState({
            allError: {
              ...allError,
              [field]: undefined,
            },
          });
        }
      }).catch((error) => {
        if (allError[field] !== error.message) {
          this.setState({
            allError: {
              ...allError,
              [field]: error.message,
            },
          });
        }
      });
    }
    return allError[field];
  }

  handleChange = (e) => {
    const { sport } = this.state;
    if (sport === 'cricket') {
      this.setState({ cricket: e.target.value });
    }
    if (sport === 'football') {
      this.setState({ football: e.target.value });
    }
  };

  radioOption = () => {
    let { radioValue } = this.state;
    const { sport } = this.state;
    if (sport === 'cricket') {
      radioValue = cricketRadioOptions;
    }
    if (sport === 'football') {
      radioValue = footballRadioOptions;
    }
    return radioValue;
  };

  render() {
    const { sport, isValid } = this.state;
    return (
      <>
        <p>Name</p>
        <TextField error={this.getError('TextField')} onChange={this.handleNameChange} onBlur={() => this.isTouched('TextField')} />
        <p>Select the game you play?</p>
        <SelectField error={this.getError('SelectField')} onChange={this.handleSportChange} options={options} onBlur={() => this.isTouched('SelectField')} />
        <div>
          {
            (sport === '' || sport === 'Select') ? ''
              : (
                <>
                  <p>What you do?</p>
                  <RadioGroup error={this.getError('RadioGroup')} options={this.radioOption()} onChange={this.handleChange} onBlur={() => this.isTouched('RadioGroup')} />
                </>
              )
          }
        </div>
        <>
          <div align="right">
            <Button value="Cancel" />
            <Button value="Submit" disabled={!isValid} />
          </div>
        </>
      </>
    );
  }
}

export default InputDemo;
