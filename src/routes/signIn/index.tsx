import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomButton from '~/components/customButton/customButton';
import { useUserStore } from '~/store/userStore';
import { useLoginStore } from '~/store/';

import './signIn.scss';

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search).get('token');
  const { getUserData } = useUserStore((state) => state);
  const { login } = useLoginStore((state) => state);

  useEffect(() => {
    if (params) localStorage.setItem('dcard-login', JSON.stringify(params));
    getUserData();
    if (login) navigate('/repo');
  }, [login]);
  const handleLogin = async () => {
    window.open(
      `${import.meta.env.VITE_APP_BACKEND_BASE_URL || 'http://localhost:3333/'}user/github/login`,
      '_self',
    );
  };
  return (
    <div className='login-container'>
      <div className='login-container__box-background'>
        <div className='login-container__box'></div>
        <div className='login-container__box2'>
          <div className='login-container__content'>
            <h2>Management Your Repo</h2>
            <p>It's the moment resolve an ISSUE</p>
            <CustomButton text='Github登入' onClick={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
