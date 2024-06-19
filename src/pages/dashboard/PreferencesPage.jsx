import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useId, useState } from 'react';
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi';
import { LayoutSection } from '@/layouts';
import {
  createPreference,
  deletePreference,
  getPreference,
  getPreferences,
  resetCreatePreferenceState,
  resetDeletePreferenceState,
  resetPreferenceState,
  resetPreferencesState,
  resetUpdatePreferenceState,
  selectDeletePreference,
  selectPreferences,
  updatePreference,
} from '@/slices';
import {
  BaseTable,
  DeleteConfirmModal,
  IconButton,
  PreferenceCreateModal,
  PreferenceDetailModal,
  PreferenceUpdateModal,
  Spinner,
} from '@/components';
import { useFilterData, useToast } from '@/hooks';
import { toggleModal } from '@/utils';

export function PreferencesPage() {
  const { status, message, data } = useSelector(selectPreferences);
  const { status: deleteStatus } = useSelector(selectDeletePreference);

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

  const handleViewPreference = (id) => {
    dispatch(getPreference({ id }));
    showViewModal();
  };

  const openDeleteModal = (id) => {
    setSelectedId(id);
    showDeleteModal();
  };

  const openUpdateModal = (id) => {
    dispatch(getPreference({ id }));
    setSelectedId(id);
    showUpdateModal();
  };

  const handleCreatePreference = ({ name, photo }) => {
    dispatch(createPreference({ name, photo })).then((result) => {
      if (createPreference.fulfilled.match(result)) {
        showToast('Preference created successfully', 'success');
        hideCreateModal();
        dispatch(getPreferences());
      } else if (createPreference.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  const handleDeletePreference = () => {
    dispatch(deletePreference({ id: selectedId })).then((result) => {
      if (deletePreference.fulfilled.match(result)) {
        showToast('Preference deleted successfully', 'success');
        hideDeleteModal();
        dispatch(getPreferences());
      } else if (deletePreference.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  const handleUpdatePreference = ({ name, photo }) => {
    dispatch(updatePreference({ id: selectedId, name, photo })).then((result) => {
      if (updatePreference.fulfilled.match(result)) {
        showToast('Preference updated successfully', 'success');
        hideUpdateModal();
        dispatch(getPreferences());
      } else if (updatePreference.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  useEffect(() => {
    dispatch(getPreferences());

    return () => {
      dispatch(resetCreatePreferenceState());
      dispatch(resetDeletePreferenceState());
      dispatch(resetPreferencesState());
      dispatch(resetPreferenceState());
      dispatch(resetUpdatePreferenceState());
    };
  }, [dispatch]);

  return (
    <LayoutSection>
      <BaseTable
        heads={['No.', 'Name', 'Action']}
        columnWidths={['10%', '70%', '20%']}
        addButtonProps={{ show: true, text: 'Add Preference', onClick: showCreateModal }}
      >
        {status === 'success' &&
          tableData.length > 0 &&
          tableData.map((preference, index) => (
            <tr key={preference.id}>
              <td>{index + 1}</td>
              <td>{preference.name}</td>
              <td className="flex justify-center gap-1">
                <IconButton
                  label="View"
                  icon={<HiEye className="text-gray-500" />}
                  onClick={() => handleViewPreference(preference.id)}
                />
                <IconButton
                  label="Edit"
                  icon={<HiPencil className="text-blue-500" />}
                  onClick={() => openUpdateModal(preference.id)}
                />
                <IconButton
                  label="Delete"
                  icon={<HiTrash className="text-red-500" />}
                  onClick={() => openDeleteModal(preference.id)}
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

      <PreferenceDetailModal id={viewModalId} />
      <PreferenceCreateModal
        id={createModalId}
        onSubmit={handleCreatePreference}
      />
      <DeleteConfirmModal
        id={deleteModalId}
        title="Delete Preference"
        status={deleteStatus}
        onSubmit={handleDeletePreference}
      />
      <PreferenceUpdateModal
        id={updateModalId}
        onSubmit={handleUpdatePreference}
      />
    </LayoutSection>
  );
}
