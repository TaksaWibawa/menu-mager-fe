import {
  BaseTable,
  DeleteConfirmModal,
  IconButton,
  PlanCreateModal,
  PlanDetailModal,
  PlanUpdateModal,
  Spinner,
} from '@/components';
import { LayoutSection } from '@/layouts';
import {
  createPlan,
  deletePlan,
  getPlan,
  getPlans,
  getRecipes,
  resetCreatePlanState,
  resetDeletePlanState,
  resetPlansState,
  resetPlanState,
  resetRecipesState,
  resetUpdatePlanState,
  selectDeletePlan,
  selectPlans,
  updatePlan,
} from '@/slices';
import { formatDate, toggleModal } from '@/utils';
import { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFilterData, useToast } from '@/hooks';
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi';
import { format, isWithinInterval, parseISO } from 'date-fns';

export function PlansPage() {
  const { status, message, data } = useSelector(selectPlans);
  const { status: deleteStatus } = useSelector(selectDeletePlan);

  const viewModalId = useId();
  const createModalId = useId();
  const deleteModalId = useId();
  const updateModalId = useId();

  const dispatch = useDispatch();
  const showToast = useToast();
  const tableData = useFilterData(data);

  const [showViewModal] = toggleModal(viewModalId);
  const [showCreateModal, hideCreateModal] = toggleModal(createModalId);
  const [showDeleteModal, hideDeleteModal] = toggleModal(deleteModalId);
  const [showUpdateModal, hideUpdateModal] = toggleModal(updateModalId);

  const [selectedId, setSelectedId] = useState(null);

  const handleViewPlan = (id) => {
    dispatch(getPlan({ id }));
    showViewModal();
  };

  const openDeleteModal = (id) => {
    setSelectedId(id);
    showDeleteModal();
  };

  const openUpdateModal = (id) => {
    dispatch(getPlan({ id }));
    setSelectedId(id);
    showUpdateModal();
  };

  const handleCreatePlan = async ({ startDate, recipe }) => {
    dispatch(createPlan({ startDate, recipe })).then((result) => {
      if (createPlan.fulfilled.match(result)) {
        showToast('Plan created successfully', 'success');
        hideCreateModal();
        dispatch(getPlans());
      } else if (createPlan.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  const handleDeletePlan = async () => {
    dispatch(deletePlan({ id: selectedId })).then((result) => {
      if (deletePlan.fulfilled.match(result)) {
        showToast('Plan deleted successfully', 'success');
        hideDeleteModal();
        dispatch(getPlans());
      } else if (deletePlan.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  const handleUpdatePlan = async ({ startDate, recipe }) => {
    dispatch(updatePlan({ id: selectedId, startDate, recipe })).then((result) => {
      if (updatePlan.fulfilled.match(result)) {
        showToast('Plan updated successfully', 'success');
        hideUpdateModal();
        dispatch(getPlans());
      } else if (updatePlan.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  useEffect(() => {
    dispatch(getPlans());
    dispatch(getRecipes());

    return () => {
      dispatch(resetCreatePlanState());
      dispatch(resetDeletePlanState());
      dispatch(resetPlansState());
      dispatch(resetPlanState());
      dispatch(resetUpdatePlanState());

      dispatch(resetRecipesState());
    };
  }, [dispatch]);

  return (
    <LayoutSection>
      <BaseTable
        heads={['No.', 'Start Date', 'End Date', 'Status', 'Actions']}
        columnWidths={['10%', '25%', '25%', '20%', '20%']}
        addButtonProps={{ show: true, text: 'Add Meal Plan', onClick: showCreateModal }}
      >
        {status === 'success' &&
          tableData.length > 0 &&
          tableData.map((plan, index) => (
            <tr key={plan.id}>
              <td>{index + 1}</td>
              <td>{formatDate(plan.start_date, 'dd MMMM yyyy')}</td>
              <td>{formatDate(plan.end_date, 'dd MMMM yyyy')}</td>
              <td>
                {isWithinInterval(new Date(), { start: parseISO(plan.start_date), end: parseISO(plan.end_date) }) ? (
                  <span className="badge badge-success text-white">Active</span>
                ) : (
                  <span className="badge badge-error text-white">Inactive</span>
                )}
              </td>
              <td className="flex justify-center gap-1">
                <IconButton
                  label="View"
                  icon={<HiEye className="text-gray-500" />}
                  onClick={() => handleViewPlan(plan.id)}
                />
                <IconButton
                  label="Edit"
                  icon={<HiPencil className="text-blue-500" />}
                  onClick={() => openUpdateModal(plan.id)}
                />
                <IconButton
                  label="Delete"
                  icon={<HiTrash className="text-red-500" />}
                  onClick={() => openDeleteModal(plan.id)}
                />
              </td>
            </tr>
          ))}
        {status === 'success' && tableData.length === 0 && (
          <tr>
            <td
              colSpan={5}
              className="text-center py-4"
            >
              No data available
            </td>
          </tr>
        )}
        {status === 'loading' && (
          <tr>
            <td
              colSpan={5}
              className="h-80"
            >
              <Spinner />
            </td>
          </tr>
        )}
        {status === 'failed' && (
          <tr>
            <td
              colSpan={5}
              className="text-center py-4 text-red-500"
            >
              {message}
            </td>
          </tr>
        )}
      </BaseTable>

      <PlanDetailModal id={viewModalId} />
      <PlanCreateModal
        id={createModalId}
        onSubmit={handleCreatePlan}
      />
      <DeleteConfirmModal
        id={deleteModalId}
        title="Delete Plan"
        status={deleteStatus}
        onSubmit={handleDeletePlan}
      />
      <PlanUpdateModal
        id={updateModalId}
        onSubmit={handleUpdatePlan}
      />
    </LayoutSection>
  );
}
