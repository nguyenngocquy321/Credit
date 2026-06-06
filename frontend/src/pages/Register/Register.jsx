import React from 'react'
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {/* Header Register */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-500/20">
            C
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
          <p className="text-sm text-gray-500">Join CreditApp to start managing your credits</p>
        </div>

        {/* Form Register */}
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" 
              placeholder="John Doe" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email address</label>
            <input 
              type="email" 
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" 
              placeholder="name@company.com" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition" 
              placeholder="••••••••" 
            />
          </div>

          <button className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition mt-4">
            Create account
          </button>
        </form>

        {/* Footer */}
        <Link to="/login" className="mt-6 text-center block text-sm text-gray-500">
          Already have an account? <span className="font-semibold text-blue-600 hover:underline">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default Register;