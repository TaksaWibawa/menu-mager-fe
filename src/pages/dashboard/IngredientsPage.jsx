import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useId, useState } from 'react';
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi';
import { LayoutSection } from '@/layouts';
import {
  createIngredient,
  deleteIngredient,
  getIngredient,
  getIngredients,
  resetCreateIngredientState,
  resetDeleteIngredientState,
  resetIngredientState,
  resetIngredientsState,
  resetUpdateIngredientState,
  selectDeleteIngredient,
  selectIngredients,
  updateIngredient,
} from '@/slices';
import {
  BaseTable,
  DeleteConfirmModal,
  IconButton,
  IngredientCreateModal,
  IngredientDetailModal,
  IngredientUpdateModal,
  Spinner,
} from '@/components';
import { useFilterData, useToast } from '@/hooks';
import { toggleModal } from '@/utils';

export function IngredientsPage() {
  const { status, message, data } = useSelector(selectIngredients);
  const { status: deleteStatus } = useSelector(selectDeleteIngredient);

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

  const handleViewIngredient = (id) => {
    dispatch(getIngredient({ id }));
    showViewModal();
  };

  const openDeleteModal = (id) => {
    setSelectedId(id);
    showDeleteModal();
  };

  const openUpdateModal = (id) => {
    dispatch(getIngredient({ id }));
    setSelectedId(id);
    showUpdateModal();
  };

  const handleCreateIngredient = ({ name, photo }) => {
    dispatch(createIngredient({ name, photo })).then((result) => {
      if (createIngredient.fulfilled.match(result)) {
        showToast('Ingredient created successfully', 'success');
        hideCreateModal();
        dispatch(getIngredients());
      } else if (createIngredient.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  const handleDeleteIngredient = () => {
    dispatch(deleteIngredient({ id: selectedId })).then((result) => {
      if (deleteIngredient.fulfilled.match(result)) {
        showToast('Ingredient deleted successfully', 'success');
        hideDeleteModal();
        dispatch(getIngredients());
      } else if (deleteIngredient.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  const handleUpdateIngredient = ({ name, photo }) => {
    dispatch(updateIngredient({ id: selectedId, name, photo })).then((result) => {
      if (updateIngredient.fulfilled.match(result)) {
        showToast('Ingredient updated successfully', 'success');
        hideUpdateModal();
        dispatch(getIngredients());
      } else if (updateIngredient.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  useEffect(() => {
    dispatch(getIngredients());

    return () => {
      dispatch(resetCreateIngredientState());
      dispatch(resetDeleteIngredientState());
      dispatch(resetIngredientsState());
      dispatch(resetIngredientState());
      dispatch(resetUpdateIngredientState());
    };
  }, [dispatch]);

  return (
    <LayoutSection>
      <BaseTable
        heads={['No.', 'Name', 'Action']}
        columnWidths={['10%', '70%', '20%']}
        addButtonProps={{ show: true, text: 'Add Ingredient', onClick: showCreateModal }}
      >
        {status === 'success' &&
          tableData.length > 0 &&
          tableData.map((ingredient, index) => (
            <tr key={ingredient.id}>
              <td>{index + 1}</td>
              <td>{ingredient.name}</td>
              <td className="flex justify-center gap-1">
                <IconButton
                  label="View"
                  icon={<HiEye className="text-gray-500" />}
                  onClick={() => handleViewIngredient(ingredient.id)}
                />
                <IconButton
                  label="Edit"
                  icon={<HiPencil className="text-blue-500" />}
                  onClick={() => openUpdateModal(ingredient.id)}
                />
                <IconButton
                  label="Delete"
                  icon={<HiTrash className="text-red-500" />}
                  onClick={() => openDeleteModal(ingredient.id)}
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

      <IngredientDetailModal id={viewModalId} />
      <IngredientCreateModal
        id={createModalId}
        onSubmit={handleCreateIngredient}
      />
      <DeleteConfirmModal
        id={deleteModalId}
        title="Delete Ingredient"
        status={deleteStatus}
        onSubmit={handleDeleteIngredient}
      />
      <IngredientUpdateModal
        id={updateModalId}
        onSubmit={handleUpdateIngredient}
      />
    </LayoutSection>
  );
}
