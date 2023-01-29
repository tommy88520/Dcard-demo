import { Fragment, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '~/assets/crown.svg';
// import CartIcon from '../../components/cartIcon/cart-icon';
// import logo from '~/logo.svg';
import { useLoginStore } from '~/store';
import { useUserStore } from '~/store/userStore';
import './navigation.scss';

const Navigation = () => {
  const { toggleLogOut, login } = useLoginStore((state) => state);
  const { userData } = useUserStore((state) => state);
  const linkData = [
    {
      url: '',
      text: 'Home',
    },
    {
      url: 'repo',
      text: 'Repo',
    },
  ];

  const SignOut = () => {
    toggleLogOut();
  };
  return (
    <Fragment>
      <div className='navigation-link'>
        <div className='navigation-link__logo-container'>
          <Link className='navigation-link__logo' to='/'>
            <img src={logo} alt='Logo' />
          </Link>
          <h3>Hello! {userData.username} </h3>
        </div>
        <div className='navigation-link__container'>
          {linkData.map((res, index) => {
            return (
              <Link key={index} className='navigation-link__container-link' to={`/${res.url}`}>
                {res.text}
              </Link>
            );
          })}
          {login ? (
            <Link className='navigation-link__container-link' onClick={SignOut} to={'/'}>
              SignOut
            </Link>
          ) : (
            <div className='navigation-link__sign-in'>
              <Link className='navigation-link__container-link' to='/sign-in'>
                SignIN
              </Link>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
