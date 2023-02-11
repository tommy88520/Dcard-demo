import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './routes/navigation';

const SignIn = lazy(() => import('./routes/signIn'));
const Repo = lazy(() => import('./routes/repo'));
const Issue = lazy(() => import('./routes/issue'));
const Example2 = lazy(() => import('./routes/testPost/example2'));
const NotFound = lazy(() => import('~/components/404'));
import PrivateRoutes from './utils/authguard';
import Spinner from './components/spinner/spinner';

import { useUserStore } from './store/userStore';

import 'antd/dist/reset.css';
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search).get('token');
  const url = location.pathname;
  const { getUserData } = useUserStore((state) => state);
  useEffect(() => {
    if (params) localStorage.setItem('dcard-login', JSON.stringify(params));
    getUserData();
    navigate(url);
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<SignIn />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/repo/:name' element={<Issue />} />
            <Route path='repo' element={<Repo />} />
            <Route path='post' element={<Example2 />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
