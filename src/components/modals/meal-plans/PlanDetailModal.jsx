import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { BaseModal } from '../BaseModal';
import { ModalDataField, ModalListField, Spinner } from '@/components';
import { selectPlan } from '@/slices';
import { formatDate } from '@/utils';
import { isWithinInterval, parseISO } from 'date-fns';

export function PlanDetailModal({ id }) {
  const { status, message, data } = useSelector(selectPlan);

  return (
    <BaseModal
      id={id}
      title="Meal Plan Information"
    >
      {status === 'success' && data && (
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[45vh]">
          <ModalDataField
            label="Status"
            value={
              isWithinInterval(new Date(), { start: parseISO(data.start_date), end: parseISO(data.end_date) }) ? (
                <span className="badge badge-success text-white">Active</span>
              ) : (
                <span className="badge badge-error text-white">Inactive</span>
              )
            }
          />
          <ModalDataField
            label="Start Date"
            value={formatDate(data.start_date, 'dd MMMM yyyy')}
          />
          <ModalDataField
            label="End Date"
            value={formatDate(data.end_date, 'dd MMMM yyyy')}
          />
          <ModalListField
            label="Available Meals"
            data={data.available_food_recipe || []}
            valueKey="recipe.name"
          />
        </div>
      )}
      {status === 'loading' && <Spinner />}
      {status === 'failed' && <p className="text-red-500">{message}</p>}
    </BaseModal>
  );
}

PlanDetailModal.propTypes = {
  id: PropTypes.string.isRequired,
};
