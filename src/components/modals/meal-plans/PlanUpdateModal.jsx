import PropTypes from 'prop-types';
import { BaseModal } from '../BaseModal';
import { capitalize } from '@/utils';
import { PlanForm } from '@/components';
import { selectPlan, selectRecipes } from '@/slices';
import { useSelector } from 'react-redux';

export function PlanUpdateModal({ id, onSubmit }) {
  const { data, status } = useSelector(selectPlan);

  const { data: optionRecipes } = useSelector(selectRecipes);

  const options = {
    available_food_recipe: optionRecipes?.map((item) => ({ label: capitalize(item.name), value: item.name })),
  };

  return (
    <BaseModal
      id={id}
      title="Edit Meal Plan"
    >
      <PlanForm
        modalId={id}
        onSubmit={onSubmit}
        status={status}
        initialData={data}
        options={options}
      />
    </BaseModal>
  );
}

PlanUpdateModal.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
