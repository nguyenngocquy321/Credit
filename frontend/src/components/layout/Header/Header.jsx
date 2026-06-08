import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineHome, HiOutlineUser, HiOutlineClock, HiOutlineCog } from 'react-icons/hi';
import { MdOutlineCreditCard, MdLogin } from 'react-icons/md';
import menu from './contans/contans';
import UserSucces from './UserSucces/UserSucces';
import Cookies from 'js-cookie';
import { useRegisterStore } from '@store/authStore';
import { AuthContext } from '@contexts/authProvider';
import { logOut } from '@apis/services/authService';
function Header() {
  const location = useLocation();
  const [path, setPath] = useState('/');
  const { user } = useContext(AuthContext);
  const [isUser, setIsUser] = useState(false);
  const token = Cookies.get('access_token');
  const navigator = useNavigate();
  const formatMoney = (value) => {
    const num = Number(value);

    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };
  useEffect(() => {
    setPath(location.pathname);
  }, [location, user]);
  const handleLogout = async () => {
    const token = Cookies.get('access_token');
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    await logOut(token);
    navigator('/login');
  };
  const getIcon = (label) => {
    switch (label) {
      case 'Dashboard':
        return <HiOutlineHome size={20} />;
      case 'Profile':
        return <HiOutlineUser size={20} />;
      case 'History':
        return <HiOutlineClock size={20} />;
      case 'Settings':
        return <HiOutlineCog size={20} />;
      default:
        return null;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-lg">
            C
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">CreditApp</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {menu.map((it) => (
            <Link
              to={it.href}
              key={it.href}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                path === it.href
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {getIcon(it.label)}
              {it.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 transition-all hover:shadow-sm">
            <MdOutlineCreditCard size={16} className="text-gray-400" />
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              Credits
            </span>
            <span className="rounded-md bg-blue-100 px-2 py-0.5 font-mono text-sm font-bold text-blue-600">
              {formatMoney(user?.total_credits || 0)} VNĐ
            </span>
          </div>
          {token ? (
            <UserSucces handleLogout={handleLogout} />
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
            >
              <MdLogin size={20} />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
