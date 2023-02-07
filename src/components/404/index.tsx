import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  const [errorCountdown, setErrorCountDown] = useState(5);
  useEffect(() => {
    setInterval(() => {
      setErrorCountDown(errorCountdown - 1);
      if (errorCountdown === 0) {
        navigate(`/sign-in`);
      }
    }, 1000);
  }, [errorCountdown]);
  return (
    <div>
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <Link to='/sign-in'>Login</Link>
      <Link to='/repo'>Repo</Link>
      <div className='callback__error-countdown'>{`${errorCountdown}秒後自動返回登入畫面`}</div>
    </div>
  );
}
