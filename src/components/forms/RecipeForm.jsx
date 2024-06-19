/* eslint-disable indent */
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { HiAnnotation, HiClipboardList, HiDocumentText, HiHeart, HiViewBoards, HiViewList } from 'react-icons/hi';
import { FileInputField, InputField, SelectInputField } from '@/components';
import { capitalize } from '@/utils';

const schema = yup.object().shape({
  name: yup.string().required('Recipe name is required'),
  description: yup.string().required('Recipe description is required'),
  preferences: yup.array().min(1, 'At least one preference is required'),
  allergy: yup.array(),
  instruction: yup
    .array()
    .of(
      yup.object().shape({
        description: yup.string().required('Instruction is required'),
      })
    )
    .min(1, 'At least one instruction is required'),
  material: yup
    .array()
    .of(
      yup.object().shape({
        name: yup
          .object()
          .shape({
            label: yup.string(),
            value: yup.string(),
          })
          .required('Material is required'),
        amount: yup.number().required('Amount is required'),
        unit: yup.string().required('Unit is required'),
      })
    )
    .min(1, 'At least one material is required'),
  photo: yup.mixed().test('isFile', 'Recipe photo is required', (value) => value instanceof File),
});

export function RecipeForm({ modalId, onSubmit, status, initialData, options }) {
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
      description: initialData?.description || '',
      preferences:
        initialData?.recipe_preferences?.map((preference) => ({
          label: capitalize(preference.preferences.name),
          value: preference.preferences.name,
        })) || [],
      allergy:
        initialData?.recipe_allergy?.map((allergy) => ({
          label: capitalize(allergy.allergy.name),
          value: allergy.allergy.name,
        })) || [],
      instruction: initialData?.instruction?.length > 0 ? initialData?.instruction : [{ description: '' }],
      material:
        initialData?.recipe_material?.length > 0
          ? initialData?.recipe_material.map((material) => ({
              name: { label: capitalize(material.material.name), value: material.material.name },
              amount: material.amount,
              unit: material.unit,
            }))
          : [{ name: '', amount: 0, unit: '' }],
      photo: `${process.env.BASE_URL}/${initialData?.photo}` || null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'instruction',
  });

  const {
    fields: materialFields,
    append: appendMaterial,
    remove: removeMaterial,
  } = useFieldArray({
    control,
    name: 'material',
  });

  const onSubmitForm = (data) => {
    data.preferences = data.preferences.map((preference) => ({ name: preference.value }));
    data.allergy = data.allergy.map((allergy) => ({ name: allergy.value }));
    data.material = data.material.map((material) => ({
      name: material.name.value,
      amount: material.amount,
      unit: material.unit,
    }));
    data.instruction = data.instruction.filter((instruction) => instruction.description.trim() !== '');
    onSubmit(data);
  };

  useEffect(() => {
    if (status === 'failed') {
      setError('name');
      setError('description');
      setError('preferences');
      setError('allergy');
      setError('instruction');
      setError('material');
      setError('photo');
    }
  }, [status, setError]);

  useEffect(() => {
    reset({
      name: initialData?.name || '',
      description: initialData?.description || '',
      preferences:
        initialData?.recipe_preferences?.map((preference) => ({
          label: capitalize(preference.preferences.name),
          value: preference.preferences.name,
        })) || [],
      allergy:
        initialData?.recipe_allergy?.map((allergy) => ({
          label: capitalize(allergy.allergy.name),
          value: allergy.allergy.name,
        })) || [],
      instruction: initialData?.instruction?.length > 0 ? initialData?.instruction : [{ description: '' }],
      material:
        initialData?.recipe_material?.length > 0
          ? initialData?.recipe_material.map((material) => ({
              name: { label: capitalize(material.material.name), value: material.material.name },
              amount: material.amount,
              unit: material.unit,
            }))
          : [{ name: '', amount: 0, unit: '' }],
      photo: null,
    });
  }, [initialData, reset]);

  useEffect(() => {
    const dialog = document.getElementById(modalId);
    if (dialog) {
      dialog.addEventListener('close', () => {
        reset(
          {
            name: '',
            description: '',
            preferences: [],
            allergy: [],
            instruction: [{ description: '' }],
            material: [{ name: '', amount: 0, unit: '' }],
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
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <div className="rounded-md shadow-sm space-y-6">
        <FileInputField
          control={control}
          label="Recipe Photo"
          name="photo"
          error={errors.photo}
          disabled={status === 'loading'}
        />
        <InputField
          control={control}
          icon={<HiClipboardList className="text-gray-700" />}
          type="text"
          label="Recipe Name"
          name="name"
          error={errors.name}
          autoComplete="off"
          disabled={status === 'loading'}
        />
        <InputField
          control={control}
          icon={<HiDocumentText className="text-gray-700" />}
          type="text"
          label="Recipe Description"
          name="description"
          error={errors.description}
          autoComplete="off"
          disabled={status === 'loading'}
        />
        <SelectInputField
          control={control}
          icon={<HiHeart className="text-gray-700" />}
          label="Preferences"
          name="preferences"
          options={options.preferences}
          error={errors.preferences}
          isMulti
          disabled={status === 'loading'}
        />
        <SelectInputField
          control={control}
          icon={<HiAnnotation className="text-gray-700" />}
          label="Allergies"
          name="allergy"
          options={options.allergies}
          error={errors.allergy}
          isMulti
          disabled={status === 'loading'}
        />

        <h4 className="text-lg font-semibold">Ingredients</h4>
        {materialFields.map((item, index) => (
          <div
            key={item.id}
            className="relative space-y-4"
          >
            <SelectInputField
              control={control}
              icon={<HiViewBoards className="text-gray-700" />}
              label="Material"
              name={`material[${index}].name`}
              options={options.ingredients}
              error={errors.material?.[index]?.name}
              disabled={status === 'loading'}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                control={control}
                type="number"
                label="Amount"
                name={`material[${index}].amount`}
                error={errors.material?.[index]?.amount}
                disabled={status === 'loading'}
              />
              <InputField
                control={control}
                type="text"
                label="Unit"
                name={`material[${index}].unit`}
                error={errors.material?.[index]?.unit}
                disabled={status === 'loading'}
              />
            </div>
            {index !== 0 && (
              <button
                type="button"
                onClick={() => removeMaterial(index)}
                className="text-red-500 text-xs mt-1 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendMaterial({ value: '', amount: 0, unit: '' })}
          className="text-blue-500 text-xs hover:underline"
        >
          Add New Material
        </button>

        <h4 className="text-lg font-semibold">Instructions</h4>
        <div className="space-y-6">
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="relative"
            >
              <InputField
                control={control}
                icon={<HiViewList className="text-gray-700" />}
                label={`Instruction ${index + 1}`}
                name={`instruction[${index}].description`}
                error={errors.instruction?.[index]?.description}
              />
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 text-xs mt-1 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ description: '' })}
            className="text-blue-500 text-xs hover:underline"
          >
            Add New Instruction
          </button>
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
          Submit
        </button>
      </div>
    </form>
  );
}

RecipeForm.propTypes = {
  status: PropTypes.string,
  onSubmit: PropTypes.func,
  modalId: PropTypes.string,
  initialData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    recipe_preferences: PropTypes.array,
    recipe_allergy: PropTypes.array,
    instruction: PropTypes.array,
    recipe_material: PropTypes.array,
    photo: PropTypes.string,
  }),
  options: PropTypes.shape({
    preferences: PropTypes.array,
    allergies: PropTypes.array,
    ingredients: PropTypes.array,
  }),
};
