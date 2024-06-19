import { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi';
import { useFilterData, useToast } from '@/hooks';
import { toggleModal } from '@/utils';
import { LayoutSection } from '@/layouts';
import {
  AllergyCreateModal,
  AllergyDetailModal,
  AllergyUpdateModal,
  BaseTable,
  DeleteConfirmModal,
  IconButton,
  Spinner,
} from '@/components';
import {
  createAllergy,
  deleteAllergy,
  getAllergies,
  getAllergy,
  resetAllergiesState,
  resetAllergyState,
  resetCreateAllergyState,
  resetDeleteAllergyState,
  resetUpdateAllergyState,
  selectAllergies,
  selectDeleteAllergy,
  updateAllergy,
} from '@/slices';

export function AllergiesPage() {
  const { status, message, data } = useSelector(selectAllergies);
  const { status: deleteStatus } = useSelector(selectDeleteAllergy);

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

  const handleViewAllergy = (id) => {
    dispatch(getAllergy({ id }));
    showViewModal();
  };

  const openDeleteModal = (id) => {
    setSelectedId(id);
    showDeleteModal();
  };

  const openUpdateModal = (id) => {
    dispatch(getAllergy({ id }));
    setSelectedId(id);
    showUpdateModal();
  };

  const handleCreateAllergy = ({ name }) => {
    dispatch(createAllergy({ name })).then((result) => {
      if (createAllergy.fulfilled.match(result)) {
        showToast('Allergy created successfully', 'success');
        hideCreateModal();
        dispatch(getAllergies());
      } else if (createAllergy.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  const handleDeleteAllergy = () => {
    dispatch(deleteAllergy({ id: selectedId })).then((result) => {
      if (deleteAllergy.fulfilled.match(result)) {
        showToast('Allergy deleted successfully', 'success');
        hideDeleteModal();
        dispatch(getAllergies());
      } else if (deleteAllergy.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  const handleUpdateAllergy = ({ name }) => {
    dispatch(updateAllergy({ id: selectedId, name })).then((result) => {
      if (updateAllergy.fulfilled.match(result)) {
        showToast('Allergy updated successfully', 'success');
        hideUpdateModal();
        dispatch(getAllergies());
      } else if (updateAllergy.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  useEffect(() => {
    dispatch(getAllergies());

    return () => {
      dispatch(resetAllergiesState());
      dispatch(resetAllergyState());
      dispatch(resetCreateAllergyState());
      dispatch(resetDeleteAllergyState());
      dispatch(resetUpdateAllergyState());
    };
  }, [dispatch]);

  return (
    <LayoutSection>
      <BaseTable
        heads={['No.', 'Name', 'Action']}
        columnWidths={['10%', '70%', '20%']}
        addButtonProps={{ show: true, text: 'Add Allergy', onClick: showCreateModal }}
      >
        {status === 'success' &&
          tableData.length > 0 &&
          tableData.map((allergy, index) => (
            <tr key={allergy.id}>
              <td>{index + 1}</td>
              <td>{allergy.name}</td>
              <td className="flex justify-center gap-1">
                <IconButton
                  label="View"
                  icon={<HiEye className="text-gray-500" />}
                  onClick={() => handleViewAllergy(allergy.id)}
                />
                <IconButton
                  label="Edit"
                  icon={<HiPencil className="text-blue-500" />}
                  onClick={() => openUpdateModal(allergy.id)}
                />
                <IconButton
                  label="Delete"
                  icon={<HiTrash className="text-red-500" />}
                  onClick={() => openDeleteModal(allergy.id)}
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

      <AllergyDetailModal id={viewModalId} />
      <AllergyCreateModal
        id={createModalId}
        onSubmit={handleCreateAllergy}
      />
      <DeleteConfirmModal
        id={deleteModalId}
        title="Delete Allergy"
        status={deleteStatus}
        onSubmit={handleDeleteAllergy}
      />
      <AllergyUpdateModal
        id={updateModalId}
        onSubmit={handleUpdateAllergy}
      />
    </LayoutSection>
  );
}
