import { lazy } from 'react';
import ForgotPassword from '@pages/ForgotPassword/ForgotPassword';
const Home = lazy(() => import('@pages/Home/Home'));
const Profile = lazy(() => import('@pages/Profile/Profile'));
const Login = lazy(() => import('@pages/Login/Login'));
const Register = lazy(() => import('@pages/Register/Register'));
const Pricing = lazy(() => import('@pages/Pricing/Pricing'));
const routers = [
  { path: '/', element: <Home /> },
  { path: '/profile', element: <Profile /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
   { path: '/pricing', element: <Pricing /> },
   {path:'forgot-password',element:<ForgotPassword/>}
];

export default routers;