import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './routes/navigation';

const Home = lazy(() => import('./routes/home/home'));
const SignIn = lazy(() => import('./routes/signIn'));
const Repo = lazy(() => import('./routes/repo'));
const Issue = lazy(() => import('./routes/issue'));
const EditIssue = lazy(() => import('./routes/editIssue'));
import Spinner from './components/spinner/spinner';

import 'antd/dist/reset.css';

import { useUserStore } from './store/userStore';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search).get('token');
  const url = location.pathname;
  const { getUserData } = useUserStore((state) => state);
  useEffect(() => {
    if (params) localStorage.setItem('dcard-login', JSON.stringify(params));
    if (localStorage.getItem('dcard-login')) getUserData();
    navigate(url);
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='sign-in' element={<SignIn />} />
          {/* <Route path='/repo/:name/:issue' element={<EditIssue />} /> */}
          <Route path='/repo/:name' element={<Issue />} />
          <Route path='repo' element={<Repo />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
