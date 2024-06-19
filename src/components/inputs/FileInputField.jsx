import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

export function FileInputField({ control, name, className = '', error }) {
  return (
    <div className="relative">
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field: { value, onChange, ...rest } }) => (
          <input
            type="file"
            id={name}
            className={`file-input file-input-bordered w-full ${className} ${error ? 'file-input-error' : ''}`}
            onChange={(e) => {
              onChange(e.target.files[0]);
            }}
            value={value?.filename}
            accept="image/png, image/jpeg, image/jpg"
            {...rest}
          />
        )}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}

FileInputField.propTypes = {
  control: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.object,
};
