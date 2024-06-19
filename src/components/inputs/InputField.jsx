import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';

export const InputField = forwardRef(
  ({ control, icon, label, name, className = '', error, disabled, ...props }, ref) => (
    <div className="relative">
      <label
        htmlFor={name}
        className={`input input-bordered border-primary hover:border-primary-hover active:border-primary focus:border-primary focus-within:border-primary flex items-center gap-2 ${
          error ? 'text-red-500 border-red-500' : ''
        }`}
      >
        {icon}
        <Controller
          control={control}
          name={name}
          defaultValue=""
          disabled={disabled}
          render={({ field }) => (
            <input
              ref={ref}
              placeholder={label}
              id={name}
              className={`grow ${className} ${error ? 'border-red-500' : ''}`}
              {...props}
              {...field}
            />
          )}
        />
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  )
);

InputField.propTypes = {
  control: PropTypes.object,
  icon: PropTypes.element,
  label: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.object,
  disabled: PropTypes.bool,
};

InputField.displayName = 'InputField';
