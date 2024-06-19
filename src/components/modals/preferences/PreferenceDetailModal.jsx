import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { BaseModal } from '../BaseModal';
import { selectPreference } from '@/slices';
import { ModalDataField, Spinner } from '@/components';

export function PreferenceDetailModal({ id }) {
  const { status, message, data } = useSelector(selectPreference);

  return (
    <BaseModal
      id={id}
      title="Preference Information"
    >
      {status === 'success' && data && (
        <div className="grid grid-cols-[1fr,2fr] gap-10 overflow-hidden">
          <div className="flex flex-col items-center gap-4">
            <div className="avatar">
              <div className="w-2/3 rounded-full mx-auto">
                <img
                  src={`${process.env.BASE_URL}/${data.photo}` || null}
                  alt={data.name}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[45vh]">
            <ModalDataField
              label="Name"
              value={data.name}
            />
            <ModalDataField
              label="Recipe Preferences"
              value={
                data.recipe_preferences?.length < 0
                  ? data.recipe_preferences.map((recipe) => recipe.recipe.name).join(', ')
                  : 'No recipe uses this preference'
              }
            />
          </div>
        </div>
      )}
      {status === 'loading' && <Spinner />}
      {status === 'failed' && <p className="text-red-500">{message}</p>}
    </BaseModal>
  );
}

PreferenceDetailModal.propTypes = {
  id: PropTypes.string.isRequired,
};
