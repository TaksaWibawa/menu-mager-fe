import * as yup from 'yup';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { HiArchive } from 'react-icons/hi';
import { useEffect } from 'react';
import { InputField } from '@/components';

const schema = yup.object().shape({
  name: yup.string().required('Allergy name is required'),
});

export function AllergyForm({ modalId, onSubmit, status, initialData }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: initialData?.name || '',
    },
  });

  useEffect(() => {
    if (status === 'failed') {
      setError('name');
    }
  }, [status, setError]);

  useEffect(() => {
    reset({
      name: initialData?.name || '',
    });
  }, [initialData, reset]);

  useEffect(() => {
    const dialog = document.getElementById(modalId);
    if (dialog) {
      dialog.addEventListener('close', () => {
        reset(
          {
            name: '',
          },
          {
            errors: false,
            isDirty: false,
            isSubmitted: false,
            touched: false,
            isValid: false,
            submitCount: false,
          }
        );
      });
    }
  }, [modalId, reset]);

  return (
    <form
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="rounded-md shadow-sm space-y-6">
        <InputField
          control={control}
          icon={<HiArchive className="text-gray-700" />}
          type="text"
          label="Allergy Name"
          name="name"
          error={errors.name}
          autoComplete="off"
          disabled={status === 'loading'}
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`btn group relative w-full flex justify-center border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover  ${
            status === 'loading' ? 'btn-disabled' : ''
          }`}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

AllergyForm.propTypes = {
  status: PropTypes.string,
  onSubmit: PropTypes.func,
  modalId: PropTypes.string,
  initialData: PropTypes.shape({
    name: PropTypes.string,
  }),
};
