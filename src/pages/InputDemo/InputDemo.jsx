import React from 'react';
import { options, footballRadioOptions, cricketRadioOptions } from '../../configs/constants';
import { TextField } from '../../components/TextField';
import { SelectField } from '../../components/SelectField';
import { RadioGroup } from '../../components/RadioGroup/index';


class InputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
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
    } else {
      this.setState({ cricket: '', football: '' });
    }
  };

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
    console.log(this.state);
    const { sport } = this.state;
    return (
      <>
        <p>Name</p>
        <TextField error="" value="Ankush" onChange={this.handleNameChange} />
        <p>Select the game you play?</p>
        <SelectField error="" onChange={this.handleSportChange} options={options} />
        <div>
          {
            (sport === '' || sport === 'Select') ? ''
              : (
                <>
                  <p>What you do?</p>
                  <RadioGroup error="" options={this.radioOption()} onChange={this.handleChange} />
                </>
              )
          }
        </div>
      </>
    );
  }
}

export default InputDemo;
