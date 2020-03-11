import React, { Component } from 'react';
import propTypes from 'prop-types';
import { getNextRoundRobin, getRandomNumber } from '../../lib/utils/math';
import { DEFAULT_BANNER_IMAGE, PUBLIC_IMAGE_FOLDER } from './configs/constants';
import Image from './style';

class Slider extends Component {
  constructor(props) {
    console.log('Inside constructor');
    super(props);
    this.state = {
      path: '',
      index: 0,
    };
  }

  componentDidMount() {
    console.log('Inside DidMount');
    const {
      banners, duration, random, defaultBanner,
    } = this.props;
    console.log('Type Of Banners: ', typeof banners);
    this.timer = setInterval(() => {
      console.log('Logging this.state inside setInterval', this.state);
      const { index } = this.state;
      let imageIndex = 0;
      let imagePath = `${defaultBanner}`;
      if (banners && banners.length) {
        imageIndex = random ? getRandomNumber(banners.length)
          : getNextRoundRobin(banners.length, index);
          console.log('##########################', `${PUBLIC_IMAGE_FOLDER}${banners[imageIndex]}`)
        imagePath = `${PUBLIC_IMAGE_FOLDER}${banners[imageIndex]}`;
      }
      this.setState({
        path: imagePath,
        index: imageIndex,
      });
    }, duration);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { path } = this.state;
    // console.log('Logging this.state inside render', this.state);
    const { height, altText } = this.props;
    // console.log('Inside Render', path, height, altText);
    return (
      <>
        <Image src={path} alt={altText} height={height} />
      </>
    );
  }
}

Slider.propTypes = {
  altText: propTypes.string,
  banners: propTypes.arrayOf(propTypes.string),
  defaultBanner: propTypes.string,
  duration: propTypes.number,
  height: propTypes.number,
  random: propTypes.bool,
};

Slider.defaultProps = {
  altText: 'Default Banner',
  banners: [],
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
};

export default Slider;
