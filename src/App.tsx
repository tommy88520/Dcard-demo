import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation';

const SignIn = lazy(() => import('./routes/signIn'));
const Repo = lazy(() => import('./routes/repo'));
const Issue = lazy(() => import('./routes/issue'));
const NotFound = lazy(() => import('~/components/notFound'));
import PrivateRoutes from './utils/authguard';
import Spinner from './components/spinner/spinner';

import 'antd/dist/reset.css';
import 'sweetalert2/src/sweetalert2.scss';

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<SignIn />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/repo/:name' element={<Issue />} />
            <Route path='repo' element={<Repo />} />
          </Route>
          <Route path='/notFound' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
