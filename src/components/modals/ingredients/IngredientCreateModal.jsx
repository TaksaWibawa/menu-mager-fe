import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { BaseModal } from '../BaseModal';
import { selectCreateIngredient } from '@/slices';
import { IngredientForm } from '@/components';

export function IngredientCreateModal({ id, onSubmit }) {
  const { status } = useSelector(selectCreateIngredient);

  return (
    <BaseModal
      id={id}
      title="Create New Ingredient"
    >
      <IngredientForm
        modalId={id}
        onSubmit={onSubmit}
        status={status}
      />
    </BaseModal>
  );
}

IngredientCreateModal.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
