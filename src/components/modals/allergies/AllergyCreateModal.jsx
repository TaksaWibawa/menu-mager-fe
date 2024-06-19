import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { BaseModal } from '../BaseModal';
import { selectCreateAllergy } from '@/slices';
import { AllergyForm } from '@/components';

export function AllergyCreateModal({ id, onSubmit }) {
  const { status } = useSelector(selectCreateAllergy);

  return (
    <BaseModal
      id={id}
      title="Create New Allergy"
    >
      <AllergyForm
        modalId={id}
        onSubmit={onSubmit}
        status={status}
      />
    </BaseModal>
  );
}

AllergyCreateModal.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
