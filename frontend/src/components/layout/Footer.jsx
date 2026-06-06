import React from 'react'

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Phần chính của Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Cột 1: Logo & Slogan */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">C</div>
              <span className="text-xl font-bold tracking-tight text-gray-900">CreditApp</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">
              Managing your digital credits with simplicity and security. Built for the modern creator.
            </p>
          </div>

          {/* Cột 2: Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-600 transition">Features</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Pricing</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">API</a></li>
            </ul>
          </div>

          {/* Cột 3: Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-600 transition">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Đường kẻ mỏng & Bản quyền */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} CreditApp Inc. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="text-xs text-gray-400">Made with ❤️ in Vietnam</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;