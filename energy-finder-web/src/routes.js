import Login from './pages/Login/index';
import Home from './pages/Home/index';

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
      <Routes>
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;