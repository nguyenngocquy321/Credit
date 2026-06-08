import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa'; // Icon user
import { FiLogOut } from 'react-icons/fi'; // Icon logout

function UserSucces({ handleLogout }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      {/* Avatar Icon */}
      <div className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-gray-200 shadow-sm transition hover:ring-2 hover:ring-indigo-400">
        <FaUser className="text-gray-500" size={16} />
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        /* Sử dụng absolute top-full (ngay dưới nút) và thêm pt-2 để tạo cầu nối */
        <div className="absolute top-full right-0 z-50 w-40 pt-2">
          <div className="animate-in fade-in zoom-in rounded-xl border border-gray-100 bg-white p-1 shadow-xl duration-200">
            <button
              onClick={() => handleLogout()}
              className="flex w-full cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <FiLogOut className="mr-2" size={16} /> Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default UserSucces;
