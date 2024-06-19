import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { BaseModal } from '../BaseModal';
import { selectAllergies, selectIngredients, selectPreferences, selectRecipe } from '@/slices';
import { RecipeForm } from '@/components';
import { capitalize } from '@/utils';

export function RecipeUpdateModal({ id, onSubmit }) {
  const { data, status } = useSelector(selectRecipe);

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
      title="Edit Recipe"
    >
      <RecipeForm
        modalId={id}
        onSubmit={onSubmit}
        status={status}
        initialData={data}
        options={options}
      />
    </BaseModal>
  );
}

RecipeUpdateModal.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
