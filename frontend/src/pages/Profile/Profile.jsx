import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authProvider';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function Profile() {
  const { user, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const navigator = useNavigate();
  const token = Cookies.get('access_token');
  useEffect(() => {
    if (!loading && user) {
      setUserData(user);
    }
  }, [loading, user]);
  useEffect(() => {
    if (!token) {
      navigator('/login');
    }
  }, []);
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500">Manage your personal information and preferences.</p>
      </div>

      <div className="space-y-8">
        {/* Phần 1: Ảnh đại diện & Thông tin cơ bản */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-2xl font-bold text-blue-600 shadow-md">
              AK
            </div>
            <div>
              <h2 className="text-lg font-bold">{userData?.name || 'loading...'}</h2>
              <p className="text-sm text-gray-500">{userData?.email || 'loading...'}</p>
              <button className="mt-2 text-sm font-medium text-blue-600 hover:underline">
                Change Avatar
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-200 px-4 py-2"
                placeholder={userData?.name || 'loading...'}
              />
            </div>
          </div>
        </div>

        {/* Phần 2: Bảo mật */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-gray-900">Security</h3>
          <div className="flex items-center justify-between border-b border-gray-100 py-4">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-gray-500">Last updated 3 months ago</p>
            </div>
            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">
              Update
            </button>
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <button className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100">
              Enable
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button className="rounded-lg px-6 py-2 font-medium text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
