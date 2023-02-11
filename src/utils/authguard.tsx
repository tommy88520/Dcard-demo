import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { useLoginStore } from '../store/';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const PrivateRoutes = () => {
  // const auth = { token: false };
  const navigate = useNavigate();
  const auth = localStorage.getItem('dcard-login');
  const { login } = useLoginStore((state) => state);

  useEffect(() => {
    if (!auth || !login) {
      Swal.fire('未登入或是登入時效已到期，請重新登入');
      navigate('/');
    }
  }, [login, auth]);
  return <Outlet />;
};

export default PrivateRoutes;
