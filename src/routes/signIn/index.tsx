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
  const onFinishFailed = (errorInfo) => {
    // console.log('Failed:', errorInfo);
  };
  return (
    <div className='sign-in'>
      <h2>已經有帳號了嗎？</h2>
      <p>請登入</p>
      <Form
        form={form}
        name='signIn'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
        className='sign-in__form'
      >
        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password autoComplete='off' />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password autoComplete='off' />
        </Form.Item>
        <Form.Item className='submit-item'>
          <CustomButton htmlType='submit' text='送出' />
        </Form.Item>
        <div className='sign-in__google-login'>
          <CustomButton text='google註冊/登入' onClick={handleLogin} />
        </div>
      </Form>
    </div>
  );
};
export default SignIn;
