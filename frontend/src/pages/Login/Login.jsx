import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRegisterStore } from '@store/authStore';
const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email là không được để trống'),
  password: Yup.string().required('Mật khẩu không được để trống'),
});
function Login() {
  const setData = useRegisterStore((state) => state.setData);
  const loginAuth = useRegisterStore((state) => state.loginAuth);
  const loading = useRegisterStore((state) => state.loading);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setData(values);
      const status = await loginAuth();
      if (status.success) {
        navigate('/');
      }
      console.log(status);
    },
  });
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {/* Header Login */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-500/20">
            C
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <form className="space-y-4" method="post" onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email address</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="name@company.com"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <Link to="/register" className="mt-6 block text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <span className="font-semibold text-blue-600 hover:underline">Sign up</span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
