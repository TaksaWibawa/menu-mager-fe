import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { BaseModal } from '../BaseModal';
import { selectPreference } from '@/slices';
import { PreferenceForm } from '@/components';

export function PreferenceUpdateModal({ id, onSubmit }) {
  const { data, status } = useSelector(selectPreference);

  return (
    <BaseModal
      id={id}
      title="Edit Preference"
    >
      <PreferenceForm
        modalId={id}
        initialData={data}
        onSubmit={onSubmit}
        status={status}
      />
    </BaseModal>
  );
}

PreferenceUpdateModal.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
