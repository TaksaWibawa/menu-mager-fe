/* eslint-disable indent */
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { HiCalendar, HiClipboardList } from 'react-icons/hi';
import { InputField, SelectInputField } from '@/components';
import { capitalize } from '../../utils';

const schema = yup.object().shape({
  startDate: yup.date().required('Start Date is required'),
  recipe: yup.array().of(yup.object()).required('Available Meals is required'),
});

export function PlanForm({ modalId, onSubmit, status, initialData, options }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startDate: initialData?.start_date ? new Date(initialData.start_date).toISOString().slice(0, 10) : '',
      recipe:
        initialData?.available_food_recipe?.map((recipe) => ({
          label: capitalize(recipe.recipe.name),
          value: recipe.recipe.name,
        })) || [],
    },
  });

  useEffect(() => {
    if (status === 'failed') {
      setError('startDate');
      setError('recipe');
    }
  }, [status, setError]);

  const onSubmitForm = (data) => {
    const newData = {
      startDate: new Date(data.startDate).toISOString(),
      recipe: data.recipe?.map((item) => ({ name: item.value })),
    };
    onSubmit(newData);
  };

  useEffect(() => {
    reset({
      startDate: initialData?.start_date ? new Date(initialData.start_date).toISOString().slice(0, 10) : '',
      recipe:
        initialData?.available_food_recipe?.map((recipe) => ({
          label: capitalize(recipe.recipe.name),
          value: recipe.recipe.name,
        })) || [],
    });
  }, [initialData, reset]);

  useEffect(() => {
    const dialog = document.getElementById(modalId);
    if (dialog) {
      dialog.addEventListener('close', () => {
        reset(
          {
            startDate: initialData?.start_date ? new Date(initialData.start_date).toISOString().slice(0, 10) : '',
            recipe:
              initialData?.available_food_recipe?.map((recipe) => ({
                label: capitalize(recipe.recipe.name),
                value: recipe.recipe.name,
              })) || [],
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
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <div className="rounded-md shadow-sm space-y-6">
        <InputField
          control={control}
          icon={<HiCalendar className="text-gray-700" />}
          label="Start Date"
          name="startDate"
          type="date"
          error={errors.startDate}
          disabled={status === 'loading'}
        />
        <SelectInputField
          control={control}
          icon={<HiClipboardList className="text-gray-700" />}
          label="Available Meals"
          name="recipe"
          options={options.available_food_recipe}
          error={errors.recipe}
          isMulti
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

PlanForm.propTypes = {
  status: PropTypes.string,
  onSubmit: PropTypes.func,
  modalId: PropTypes.string,
  initialData: PropTypes.shape({
    start_date: PropTypes.string,
    recipe: PropTypes.arrayOf(PropTypes.object),
  }),
  options: PropTypes.shape({
    recipe: PropTypes.arrayOf(PropTypes.object),
  }),
};
