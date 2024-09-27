import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import Home from './pages/home';
import AccountLayout from './components/layouts/accountLayout';
import PostProfile from './pages/postProfile';
import EditProfile from './pages/editProfile';
import Notifications from './pages/notifications';
import NotFound from './pages/notFound';
import RequestReset from './pages/requestReset';
import ResetPassword from './pages/resetPassword';

const Logout = () => {
  localStorage.clear();
  return <Login />
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/request-reset" element={<RequestReset />} />
        <Route path="/reset/:uidb64/:token" element={<ResetPassword />} />
        <Route element={<AccountLayout />}>
          <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path="/profile/:id" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
          <Route path="/post/:postID" element={<ProtectedRoutes><PostProfile /></ProtectedRoutes>} />
          <Route path="/edit/:id" element={<ProtectedRoutes><EditProfile /></ProtectedRoutes>} />
          <Route path="/notifications" element={<ProtectedRoutes><Notifications /></ProtectedRoutes>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
