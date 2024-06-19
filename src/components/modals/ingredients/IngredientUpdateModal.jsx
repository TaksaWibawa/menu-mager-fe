import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { BaseModal } from '../BaseModal';
import { selectIngredient } from '@/slices';
import { IngredientForm } from '@/components';

export function IngredientUpdateModal({ id, onSubmit }) {
  const { data, status } = useSelector(selectIngredient);

  return (
    <BaseModal
      id={id}
      title="Edit Ingredient"
    >
      <IngredientForm
        modalId={id}
        initialData={data}
        onSubmit={onSubmit}
        status={status}
      />
    </BaseModal>
  );
}

IngredientUpdateModal.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
