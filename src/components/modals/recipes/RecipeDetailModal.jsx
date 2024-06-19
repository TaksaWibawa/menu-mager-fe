import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ModalDataField, ModalListField } from '../../data-fields';
import { BaseModal } from '../BaseModal';
import { selectRecipe } from '@/slices';
import { Spinner } from '../../commons';

export function RecipeDetailModal({ id }) {
  const { data, status, message } = useSelector(selectRecipe);

  return (
    <BaseModal
      id={id}
      title="Recipe Information"
    >
      {status === 'success' && data && (
        <div className="grid grid-cols-[1fr,2fr] gap-10 overflow-hidden">
          <div className="flex flex-col items-center gap-4">
            <div className="avatar">
              <div className="w-2/3 rounded-full mx-auto">
                <img
                  src={`${process.env.BASE_URL}/${data?.photo}` || null}
                  alt={data.name}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[45vh]">
            <ModalDataField
              label="Name"
              value={data.name}
            />
            <ModalDataField
              label="Description"
              value={data.description}
            />
            <ModalListField
              label="Instructions"
              data={data.instruction?.length > 0 ? data.instruction : []}
              valueKey="description"
            />
            <ModalDataField
              label="Ingredients"
              value={
                data.recipe_material?.length > 0
                  ? data.recipe_material.map((material) => material.material.name).join(', ')
                  : 'No ingredients available'
              }
            />
            <ModalDataField
              label="Preferences"
              value={
                data.recipe_preferences?.length > 0
                  ? data.recipe_preferences.map((preference) => preference.preferences.name).join(', ')
                  : 'No preferences available'
              }
            />
            <ModalDataField
              label="Allergies"
              value={
                data.recipe_allergy?.length > 0
                  ? data.recipe_allergy.map((allergy) => allergy.allergy.name).join(', ')
                  : 'No allergies available'
              }
            />
          </div>
        </div>
      )}
      {status === 'loading' && <Spinner />}
      {status === 'failed' && <p className="text-red-500">{message}</p>}
    </BaseModal>
  );
}

RecipeDetailModal.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object,
};
