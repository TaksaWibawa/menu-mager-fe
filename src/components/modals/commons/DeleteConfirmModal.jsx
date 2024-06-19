import PropTypes from 'prop-types';
import { toggleModal } from '@/utils';
import { BaseModal } from '../BaseModal';

export function DeleteConfirmModal({ id, title, status, onSubmit }) {
  const [, closeModal] = toggleModal(id);

  const handleDelete = () => {
    onSubmit();
    closeModal();
  };

  const isLoading = status === 'loading';

  return (
    <BaseModal
      id={id}
      title={title}
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-6 text-error">Are you sure you want to delete this item?</h3>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className={`btn ${isLoading ? 'btn-disabled' : 'btn-error'} text-white`}
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete Item
          </button>
          <button
            type="button"
            className={`btn ${isLoading ? 'btn-disabled' : 'btn-secondary'}  text-white`}
            onClick={closeModal}
            disabled={isLoading}
          >
            Go Back
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

DeleteConfirmModal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
