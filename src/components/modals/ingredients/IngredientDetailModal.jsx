import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { BaseModal } from '../BaseModal';
import { ModalDataField, Spinner } from '@/components';
import { selectIngredient } from '@/slices';

export function IngredientDetailModal({ id }) {
  const { status, message, data } = useSelector(selectIngredient);

  return (
    <BaseModal
      id={id}
      title="Ingredient Information"
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
              label="Recipe Ingredients"
              value={
                data.recipe_material?.length < 0
                  ? data.recipe_material.map((recipe) => recipe.recipe.name).join(', ')
                  : 'No recipe uses this ingredient'
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

IngredientDetailModal.propTypes = {
  id: PropTypes.string.isRequired,
};
