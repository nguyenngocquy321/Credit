import React from 'react'

function Content() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      {/* Header của phần nội dung */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, check your credit usage below.</p>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">
          Buy Credits
        </button>
      </div>

      {/* Khu vực hiển thị thông tin chính (Grid) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        
        {/* Card 1 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Used</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">1,204</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Remaining</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">150</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Next Billing</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">12 Days</p>
        </div>
      </div>

      {/* Khu vực bảng dữ liệu hoặc danh sách */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Recent Activity</h2>
        <div className="h-48 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-100 text-gray-400">
          No activities yet
        </div>
      </div>
    </main>
  );
}

export default Content;