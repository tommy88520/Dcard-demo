import React from 'react';
import CustomButton from '~/components/customButton/customButton';
import './signIn.scss';
// import { logIn } from '../../features/userSlice';

import { Form, Input } from 'antd';
const SignIn = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const user = {
      username: values.email,
      password: values.password,
    };
    // dispatch(logIn(user));
  };
  const handleLogin = async () => {
    window.open(`${import.meta.env.VITE_APP_BACKEND_BASE_URL}user/github/login`, '_self');
  };
  return (
    <div className='login-container'>
      <div className='login-container__box'>
        <div className='login-container__content'>
          <h2>Management Your Repo</h2>
          <p>It's the moment you've always dreamed of</p>
          <CustomButton text='Github登入' onClick={handleLogin} />
        </div>
      </div>
    </div>
  );
};
export default SignIn;
