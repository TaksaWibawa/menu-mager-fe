import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectAllergy } from '@/slices';
import { ModalDataField, Spinner } from '@/components';
import { BaseModal } from '../BaseModal';

export function AllergyDetailModal({ id }) {
  const { status, message, data } = useSelector(selectAllergy);

  return (
    <BaseModal
      id={id}
      title="Allergy Information"
    >
      {status === 'success' && data && (
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[45vh]">
          <ModalDataField
            label="Name"
            value={data.name}
          />
          <ModalDataField
            label="Recipe Allergies"
            value={
              data.recipe_allergies?.length < 0
                ? data.recipe_allergies.map((recipe) => recipe.recipe.name).join(', ')
                : 'No recipe uses this allergy'
            }
          />
        </div>
      )}
      {status === 'loading' && <Spinner />}
      {status === 'failed' && <p className="text-red-500">{message}</p>}
    </BaseModal>
  );
}

AllergyDetailModal.propTypes = {
  id: PropTypes.string.isRequired,
};
