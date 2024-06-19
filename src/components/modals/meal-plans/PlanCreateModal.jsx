import PropTypes from 'prop-types';
import { BaseModal } from '../BaseModal';
import { capitalize } from '@/utils';
import { PlanForm } from '@/components';
import { selectCreatePlan, selectRecipes } from '@/slices';
import { useSelector } from 'react-redux';

export function PlanCreateModal({ id, onSubmit }) {
  const { status } = useSelector(selectCreatePlan);

  const { data: optionRecipes } = useSelector(selectRecipes);

  const options = {
    available_food_recipe: optionRecipes?.map((item) => ({ label: capitalize(item.name), value: item.name })),
  };

  return (
    <BaseModal
      id={id}
      title="Create New Meal Plan"
    >
      <PlanForm
        modalId={id}
        onSubmit={onSubmit}
        status={status}
        options={options}
      />
    </BaseModal>
  );
}

PlanCreateModal.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
