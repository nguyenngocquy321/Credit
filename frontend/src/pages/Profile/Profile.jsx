import React from 'react'

function Profile() {
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
            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold border-4 border-white shadow-md">
              AK
            </div>
            <div>
              <h2 className="text-lg font-bold">Akash Kumar</h2>
              <p className="text-sm text-gray-500">akash@example.com</p>
              <button className="mt-2 text-sm text-blue-600 font-medium hover:underline">Change Avatar</button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" className="w-full rounded-lg border border-gray-200 px-4 py-2" defaultValue="Akash Kumar" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" className="w-full rounded-lg border border-gray-200 px-4 py-2" defaultValue="akash@example.com" />
            </div>
          </div>
        </div>

        {/* Phần 2: Bảo mật */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Security</h3>
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-gray-500">Last updated 3 months ago</p>
            </div>
            <button className="text-sm font-semibold text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">Update</button>
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <button className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100">Enable</button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium">Cancel</button>
          <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Save Changes</button>
        </div>
      </div>
    </main>
  );
}

export default Profile;