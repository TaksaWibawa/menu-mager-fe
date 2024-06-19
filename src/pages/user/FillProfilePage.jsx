import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetAddress, selectUserSubscription, setAddress, setUser } from '@/slices';
import { LayoutUser } from '@/layouts';
import { InputField } from '@/components';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  province: yup.string().required('Province is required'),
  district: yup.string().required('District is required'),
  subDistrict: yup.string().required('Sub District is required'),
  postCode: yup
    .string()
    .matches(/^[0-9]{5}$/, 'Post Code must be exactly 5 digits')
    .required('Post Code is required'),
  village: yup.string().required('Village is required'),
  rt: yup
    .string()
    .matches(/^[0-9]{1,3}$/, 'RT must be 1-3 digits')
    .required('RT is required'),
  rw: yup
    .string()
    .matches(/^[0-9]{1,3}$/, 'RW must be 1-3 digits')
    .required('RW is required'),
});

export function FillProfilePage() {
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

  const onSubmit = (data) => {
    const address = {
      province: data.province,
      district: data.district,
      subDistrict: data.subDistrict,
      postCode: data.postCode,
      village: data.village,
      rt: data.rt,
      rw: data.rw,
    };

    const name = {
      name: data.name,
    };

    dispatch(setUser(name));
    dispatch(setAddress(address));
    reset();
    navigate('/order/select-meals');
  };

  useEffect(() => {
    dispatch(resetAddress());
  }, [dispatch]);

  useEffect(() => {
    const account = data?.user;
    if (!account || !account.email || !account.password) {
      navigate('/order/fill-account');
    }
  }, [navigate]);

  return (
    <LayoutUser>
      <div className="flex flex-col items-center justify-center h-full py-28">
        <h1 className="text-2xl font-bold">Fill Your Contact</h1>
        <p className="text-sm text-gray-500 mt-2">We will send your order to this address</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8"
        >
          <div className="col-span-2">
            <InputField
              control={control}
              name="name"
              label="Name"
              error={errors.name}
            />
          </div>
          <div className="col-span-2">
            <InputField
              control={control}
              name="province"
              label="Province"
              error={errors.province}
            />
          </div>
          <div className="flex col-span-2 gap-4">
            <InputField
              control={control}
              name="district"
              label="District"
              error={errors.district}
            />

            <InputField
              control={control}
              name="subDistrict"
              label="Sub District"
              error={errors.subDistrict}
            />
          </div>
          <div className="col-span-2">
            <InputField
              control={control}
              name="postCode"
              label="Post Code"
              error={errors.postCode}
            />
          </div>
          <div className="col-span-2">
            <InputField
              control={control}
              name="village"
              label="Village"
              error={errors.village}
            />
          </div>
          <div className="flex col-span-2 gap-4">
            <InputField
              control={control}
              type="number"
              name="rt"
              label="RT"
              error={errors.rt}
            />

            <InputField
              control={control}
              type="number"
              name="rw"
              label="RW"
              error={errors.rw}
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
