import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRegisterStore } from '@store/authStore';
import Cookies from 'js-cookie';
const passwordRules = [
  { label: 'Ít nhất 8 ký tự', test: (val) => val.length >= 8 },
  { label: 'Có chữ hoa', test: (val) => /[A-Z]/.test(val) },
  { label: 'Có chữ thường', test: (val) => /[a-z]/.test(val) },
  { label: 'Có chữ số', test: (val) => /\d/.test(val) },
  { label: 'Có ký tự đặc biệt', test: (val) => /[@$!%*?&]/.test(val) },
];
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Tên là bắt buộc'),
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  password: Yup.string()
    .required('Mật khẩu là bắt buộc')
    .test('password-strength', 'Mật khẩu của bạn chưa an toàn', (value) => {
      return passwordRules.every((rule) => rule.test(value || ''));
    }),
});
function Register() {
  const setData = useRegisterStore((state) => state.setData);
  const register = useRegisterStore((state) => state.register);
  const loading = useRegisterStore((state) => state.loading);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setData(values);
      const status = await register();
      if (status.success) {
        navigate('/');
      }
      console.log(status);
    },
  });
  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      navigate('/');
    }
  }, []);
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
        <form className="space-y-4" onSubmit={formik.handleSubmit} method="POST">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="John Doe"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email address</label>
            <input
              type="text  "
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="name@company.com"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 transition outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: 'red' }}>{formik.errors.password}</div>
            )}
            {formik.touched.password && formik.values.password.length > 0 && (
              <div style={{ marginTop: '8px' }}>
                {passwordRules.map((rule, index) => {
                  const isPassed = rule.test(formik.values.password || '');
                  return (
                    <div
                      key={index}
                      style={{
                        color: isPassed ? 'green' : 'red',
                        fontSize: '12px',
                        transition: 'color 0.2s',
                      }}
                    >
                      {isPassed ? '✓' : '○'} {rule.label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button className="mt-4 w-full cursor-pointer rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
            Create account
          </button>
        </form>

        {/* Footer */}
        <Link to="/login" className="mt-6 block text-center text-sm text-gray-500">
          Already have an account?{' '}
          <span className="font-semibold text-blue-600 hover:underline">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default Register;
