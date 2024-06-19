import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import { HiEye, HiEyeOff, HiLockClosed } from 'react-icons/hi';
import { Controller } from 'react-hook-form';

export const PasswordField = forwardRef(
  ({ control, label, name, className = '', error, type = 'password', disabled, ...props }, ref) => {
    const [inputType, setInputType] = useState(type);

    const togglePasswordVisibility = () => {
      setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    };

    return (
      <div className="relative">
        <label
          htmlFor={name}
          className={`input input-bordered border-primary hover:border-primary-hover active:border-primary focus:border-primary focus-within:border-primary flex items-center gap-2 ${
            error ? 'text-red-500 border-red-500' : ''
          }`}
        >
          <HiLockClosed className="text-gray-700" />
          <Controller
            control={control}
            name={name}
            defaultValue=""
            disabled={disabled}
            render={({ field }) => (
              <input
                type={inputType}
                ref={ref}
                placeholder={label}
                id={name}
                className={`grow ${className} ${error ? 'border-red-500' : ''} pr-6`}
                {...props}
                {...field}
              />
            )}
          />
        </label>
        {type === 'password' && (
          <div
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
          >
            {inputType === 'password' ? <HiEye className="text-gray-700" /> : <HiEyeOff className="text-gray-700" />}
          </div>
        )}
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      </div>
    );
  }
);

PasswordField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.object,
  control: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

PasswordField.displayName = 'PasswordField';
