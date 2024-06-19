import * as yup from 'yup';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { HiArchive } from 'react-icons/hi';
import { useEffect } from 'react';
import { FileInputField, InputField } from '@/components';

const schema = yup.object().shape({
  name: yup.string().required('Ingredient name is required'),
  photo: yup.mixed().test('isFile', 'Ingredient photo is required', (value) => value instanceof File),
});

export function IngredientForm({ modalId, onSubmit, status, initialData }) {
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
      photo: initialData?.photo || '',
    },
  });

  useEffect(() => {
    if (status === 'failed') {
      setError('name');
      setError('photo');
    }
  }, [status, setError]);

  useEffect(() => {
    reset({
      name: initialData?.name || '',
      photo: initialData?.photo || null,
    });
  }, [initialData, reset]);

  useEffect(() => {
    const dialog = document.getElementById(modalId);
    if (dialog) {
      dialog.addEventListener('close', () => {
        reset(
          {
            name: '',
            photo: null,
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
        <FileInputField
          control={control}
          label="Ingredient Photo"
          name="photo"
          error={errors.photo}
          disabled={status === 'loading'}
        />
        <InputField
          control={control}
          icon={<HiArchive className="text-gray-700" />}
          type="text"
          label="Ingredient Name"
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

IngredientForm.propTypes = {
  status: PropTypes.string,
  onSubmit: PropTypes.func,
  modalId: PropTypes.string,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string,
  }),
};
