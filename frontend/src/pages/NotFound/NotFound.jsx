import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      {/* Con số lớn làm điểm nhấn */}
      <h1 className="text-[120px] font-black text-gray-100 leading-none select-none">
        404
      </h1>
      
      {/* Thông báo lỗi */}
      <div className="relative -mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page not found</h2>
        <p className="text-gray-500 max-w-sm mx-auto mb-8">
          Sorry, we couldn't find the page you're looking for. Maybe you've mistyped the URL or the page has been moved.
        </p>
        
        {/* Nút điều hướng */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all hover:-translate-y-0.5"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;