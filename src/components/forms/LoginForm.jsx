import * as yup from 'yup';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { HiMail } from 'react-icons/hi';
import { useEffect } from 'react';
import { PasswordField, InputField } from '@/components';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is not valid'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

export function LoginForm({ onSubmit, status }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (status === 'fail') {
      setError('email');
      setError('password');
    }
  }, [status, setError]);

  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="rounded-md shadow-sm space-y-6">
        <div>
          <InputField
            control={control}
            icon={<HiMail className="text-gray-700" />}
            type="email"
            label="Email address"
            name="email"
            error={errors.email}
            autoComplete="email"
            disabled={status === 'loading'}
          />
        </div>
        <div>
          <PasswordField
            control={control}
            label="Password"
            name="password"
            error={errors.password}
            autoComplete="current-password"
            disabled={status === 'loading'}
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`btn group relative w-full flex justify-center border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover  ${
            status === 'loading' ? 'btn-disabled' : ''
          }`}
        >
          Sign in
        </button>
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  status: PropTypes.string,
};
