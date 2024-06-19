import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { BaseModal } from '../BaseModal';
import { selectAllergy } from '@/slices';
import { AllergyForm } from '@/components';

export function AllergyUpdateModal({ id, onSubmit }) {
  const { data, status } = useSelector(selectAllergy);

  return (
    <BaseModal
      id={id}
      title="Edit Preference"
    >
      <AllergyForm
        modalId={id}
        initialData={data}
        onSubmit={onSubmit}
        status={status}
      />
    </BaseModal>
  );
}

AllergyUpdateModal.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
