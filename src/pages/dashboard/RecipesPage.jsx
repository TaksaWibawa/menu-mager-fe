import { HiEye, HiPencil, HiTrash } from 'react-icons/hi';
import { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BaseTable,
  DeleteConfirmModal,
  IconButton,
  RecipeCreateModal,
  RecipeDetailModal,
  RecipeUpdateModal,
  Spinner,
} from '@/components';
import { LayoutSection } from '@/layouts';
import { toggleModal } from '@/utils';
import { useFilterData, useToast } from '@/hooks';

import {
  createRecipe,
  deleteRecipe,
  getAllergies,
  getIngredients,
  getPreferences,
  getRecipe,
  getRecipes,
  resetAllergiesState,
  resetCreateRecipeState,
  resetDeleteRecipeState,
  resetIngredientsState,
  resetPreferencesState,
  resetRecipesState,
  resetUpdateRecipeState,
  selectAllergies,
  selectDeleteRecipe,
  selectIngredients,
  selectPreferences,
  selectRecipes,
  updateRecipe,
} from '@/slices';

export function RecipesPage() {
  const { status, message, data } = useSelector(selectRecipes);
  const { status: statusPreferences } = useSelector(selectPreferences);
  const { status: statusAllergies } = useSelector(selectAllergies);
  const { status: statusIngredients } = useSelector(selectIngredients);

  const { status: deleteStatus } = useSelector(selectDeleteRecipe);

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

  const handleViewRecipe = (id) => {
    dispatch(getRecipe({ id }));
    showViewModal();
  };

  const openDeleteModal = (id) => {
    setSelectedId(id);
    showDeleteModal();
  };

  const openUpdateModal = (id) => {
    dispatch(getRecipe({ id }));
    setSelectedId(id);
    showUpdateModal();
  };

  const handleCreateRecipe = (recipeData) => {
    dispatch(createRecipe(recipeData)).then((result) => {
      if (createRecipe.fulfilled.match(result)) {
        showToast('Recipe created successfully', 'success');
        hideCreateModal();
        dispatch(getRecipes());
      } else if (createRecipe.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  const handleDeleteRecipe = () => {
    dispatch(deleteRecipe({ id: selectedId })).then((result) => {
      if (deleteRecipe.fulfilled.match(result)) {
        showToast('Recipe deleted successfully', 'success');
        hideDeleteModal();
        dispatch(getRecipes());
      } else if (deleteRecipe.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  const handleUpdateRecipe = (recipeData) => {
    recipeData.instruction = recipeData.instruction.map((step) => {
      const { step: _, ...rest } = step;
      return rest;
    });

    dispatch(updateRecipe({ ...recipeData, id: selectedId })).then((result) => {
      if (updateRecipe.fulfilled.match(result)) {
        showToast('Recipe updated successfully', 'success');
        hideUpdateModal();
        dispatch(getRecipes());
      } else if (updateRecipe.rejected.match(result)) {
        const error = result.payload || result.error.message;
        showToast(error, 'error');
      }
    });
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getPreferences());
    dispatch(getAllergies());
    dispatch(getIngredients());

    return () => {
      dispatch(resetRecipesState());
      dispatch(resetDeleteRecipeState());
      dispatch(resetUpdateRecipeState());
      dispatch(resetCreateRecipeState());

      dispatch(resetPreferencesState());
      dispatch(resetAllergiesState());
      dispatch(resetIngredientsState());
    };
  }, [dispatch]);

  return (
    <LayoutSection>
      <BaseTable
        heads={['No.', 'Name', 'Description', 'Actions']}
        columnWidths={['10%', '30%', '40%', '20%']}
        addButtonProps={{ show: true, text: 'Add Recipe', onClick: showCreateModal }}
      >
        {status === 'success' &&
          statusPreferences === 'success' &&
          statusAllergies === 'success' &&
          statusIngredients === 'success' &&
          tableData.length > 0 &&
          tableData.map((recipe, index) => (
            <tr key={recipe.id}>
              <td>{index + 1}</td>
              <td>{recipe.name}</td>
              <td>{recipe.description}</td>
              <td className="flex justify-center gap-1">
                <IconButton
                  label="View"
                  icon={<HiEye className="text-gray-500" />}
                  onClick={() => handleViewRecipe(recipe.id)}
                />
                <IconButton
                  label="Edit"
                  icon={<HiPencil className="text-blue-500" />}
                  onClick={() => openUpdateModal(recipe.id)}
                />
                <IconButton
                  label="Delete"
                  icon={<HiTrash className="text-red-500" />}
                  onClick={() => openDeleteModal(recipe.id)}
                />
              </td>
            </tr>
          ))}
        {status === 'success' &&
          statusPreferences === 'success' &&
          statusAllergies === 'success' &&
          statusIngredients === 'success' &&
          tableData.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center py-4"
              >
                No data available
              </td>
            </tr>
          )}
        {(status === 'loading' ||
          statusPreferences === 'loading' ||
          statusAllergies === 'loading' ||
          statusIngredients === 'loading') && (
          <tr>
            <td
              colSpan={5}
              className="h-80"
            >
              <Spinner />
            </td>
          </tr>
        )}
        {(status === 'failed' ||
          statusPreferences === 'failed' ||
          statusAllergies === 'failed' ||
          statusIngredients === 'failed') && (
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

      <RecipeDetailModal id={viewModalId} />
      <RecipeCreateModal
        id={createModalId}
        onSubmit={handleCreateRecipe}
      />
      <DeleteConfirmModal
        id={deleteModalId}
        title="Delete Recipe"
        status={deleteStatus}
        onSubmit={handleDeleteRecipe}
      />
      <RecipeUpdateModal
        id={updateModalId}
        onSubmit={handleUpdateRecipe}
      />
    </LayoutSection>
  );
}
