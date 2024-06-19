import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser, selectUserSubscription, setUser } from '@/slices';
import { LayoutUser } from '@/layouts';
import { InputField, PasswordField } from '@/components';
import { HiUser } from 'react-icons/hi';

const schema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

export function FillAccountPage() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(selectUserSubscription);
  const showToast = useToast();

  const onSubmit = (data) => {
    dispatch(setUser(data));
    reset();
    navigate('/order/fill-address');
  };

  useEffect(() => {
    dispatch(resetUser());
  }, [dispatch]);

  useEffect(() => {
    const subscriptionDetail = data?.subscriptionDetail;
    if (!subscriptionDetail || !subscriptionDetail.numOfPeople || !subscriptionDetail.mealsPerWeek) {
      showToast('Please select subscription plan first', 'error');
      navigate('/order/select-plan');
    }
  }, [navigate]);

  return (
    <LayoutUser>
      <div className="flex flex-col items-center justify-center h-full py-28">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-sm text-gray-500 mt-2">Create your account first</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8"
        >
          <div className="col-span-2">
            <InputField
              icon={<HiUser />}
              control={control}
              name="email"
              label="Email"
              error={errors.email}
            />
          </div>

          <div className="col-span-2">
            <PasswordField
              control={control}
              name="password"
              label="Password"
              error={errors.password}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-full col-span-2 text-white"
          >
            Continue
          </button>
        </form>
      </div>
    </LayoutUser>
  );
}
