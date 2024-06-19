import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { BaseModal } from '../BaseModal';
import { selectAllergies, selectCreateRecipe, selectIngredients, selectPreferences } from '@/slices';
import { RecipeForm } from '@/components';
import { capitalize } from '@/utils';

export function RecipeCreateModal({ id, onSubmit }) {
  const { status } = useSelector(selectCreateRecipe);

  const { data: optionPreferences } = useSelector(selectPreferences);
  const { data: optionAllergies } = useSelector(selectAllergies);
  const { data: optionsIngredients } = useSelector(selectIngredients);

  const options = {
    preferences: optionPreferences?.map((item) => ({ label: capitalize(item.name), value: item.name })),
    allergies: optionAllergies?.map((item) => ({ label: capitalize(item.name), value: item.name })),
    ingredients: optionsIngredients?.map((item) => ({ label: capitalize(item.name), value: item.name })),
  };

  return (
    <BaseModal
      id={id}
      title="Create New Recipe"
    >
      <RecipeForm
        modalId={id}
        onSubmit={onSubmit}
        status={status}
        options={options}
      />
    </BaseModal>
  );
}

RecipeCreateModal.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
