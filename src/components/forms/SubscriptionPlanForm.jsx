import PropTypes from 'prop-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { HiCash, HiHeart } from 'react-icons/hi';
import { InputField, SelectInputField } from '@/components';
import { capitalize } from '@/utils';

const schema = yup.object().shape({
  pricePerServing: yup
    .number()
    .required('Price per serving is required')
    .min(0, 'Price per serving must be greater than 0'),
  preferences: yup.array().min(1, 'At least one preference is required'),
});

export function SubscriptionPlanForm({ onSubmit, status, initialData, options }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      pricePerServing: initialData?.price_per_serving || '',
      preferences:
        initialData?.subscription_plan_preferences?.map((preference) => ({
          label: capitalize(preference.preferences.name),
          value: preference.preferences.name,
        })) || [],
    },
  });

  const onSubmitForm = (data) => {
    const newData = {
      pricePerServing: data.pricePerServing,
      preferences: data.preferences?.map((item) => ({ name: item.value })),
    };
    onSubmit(newData);
  };

  useEffect(() => {
    if (status === 'failed') {
      setError('pricePerServing');
      setError('preferences');
    }
  }, [status, setError]);

  useEffect(() => {
    reset({
      pricePerServing: initialData?.price_per_serving || '',
      preferences:
        initialData?.subscription_plan_preferences?.map((preference) => ({
          label: capitalize(preference.preferences.name),
          value: preference.preferences.name,
        })) || [],
    });
  }, [initialData, reset]);

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <div className="rounded-md shadow-sm space-y-6">
        <InputField
          control={control}
          icon={<HiCash className="text-gray-700" />}
          type="number"
          label="Price per Serving"
          name="pricePerServing"
          error={errors.pricePerServing}
          disabled={status === 'loading'}
        />
        <SelectInputField
          control={control}
          icon={<HiHeart className="text-gray-700" />}
          label="Preferences"
          name="preferences"
          options={options.preferences}
          isMulti
          error={errors.preferences}
          disabled={status === 'loading'}
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`btn group relative w-full flex justify-center border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover ${
            status === 'loading' ? 'btn-disabled' : ''
          }`}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

SubscriptionPlanForm.propTypes = {
  status: PropTypes.string,
  onSubmit: PropTypes.func,
  modalId: PropTypes.string,
  initialData: PropTypes.shape({
    price_per_serving: PropTypes.number,
    subscription_plan_preferences: PropTypes.arrayOf(PropTypes.object),
  }),
  options: PropTypes.shape({
    preferences: PropTypes.arrayOf(PropTypes.object),
  }),
};
