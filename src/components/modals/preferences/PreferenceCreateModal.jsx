import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { BaseModal } from '../BaseModal';
import { selectCreatePreference } from '@/slices';
import { PreferenceForm } from '@/components';

export function PreferenceCreateModal({ id, onSubmit }) {
  const { status } = useSelector(selectCreatePreference);

  return (
    <BaseModal
      id={id}
      title="Create New Preference"
    >
      <PreferenceForm
        modalId={id}
        onSubmit={onSubmit}
        status={status}
      />
    </BaseModal>
  );
}

PreferenceCreateModal.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
