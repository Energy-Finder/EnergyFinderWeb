import Login from './pages/Login/index';

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Login />} />
      </Routes>


    </BrowserRouter>
  );
}

export default AppRoutes;