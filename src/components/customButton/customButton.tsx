import { Button, Form } from 'antd';
import React from 'react';
import logo from '~/assets/github.svg';
import './customButton.scss';
const CustomButton = ({ text, ...otherProps }) => {
  return (
    <Button type='primary' {...otherProps}>
      <img src={logo} alt='github' className='github-logo' />
      {text}
    </Button>
  );
};

export default CustomButton;
