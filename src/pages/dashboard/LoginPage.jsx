import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@/hooks';
import { LoginForm } from '@/components';
import { LayoutCenter } from '@/layouts';
import { adminSelector, login } from '@/slices';

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector(adminSelector);
  const showToast = useToast();

  const onSubmit = async ({ email, password }) => {
    dispatch(login({ email, password })).then((result) => {
      if (login.fulfilled.match(result)) {
        showToast('Login success', 'success');
        navigate('/dashboard');
      } else if (login.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  return (
    <LayoutCenter className="bg-gray-200">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Sign in as Admin</h1>
        </div>
        <LoginForm
          onSubmit={onSubmit}
          status={status}
        />
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 italic">&copy; 2024 MenuMager All rights reserved.</p>
        </div>
      </div>
    </LayoutCenter>
  );
}
