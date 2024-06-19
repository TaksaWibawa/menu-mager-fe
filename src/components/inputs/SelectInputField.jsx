import Select from 'react-select';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';

export const SelectInputField = forwardRef(
  ({ control, icon, label, name, className = '', error, disabled, options, ...props }, ref) => (
    <div className="relative">
      <label
        htmlFor={name}
        className={`input input-bordered border-primary hover:border-primary-hover active:border-primary focus:border-primary focus-within:border-primary flex items-center gap-2 h-max ${
          error ? 'text-red-500 border-red-500' : ''
        }`}
      >
        <i className="input-icon">{icon}</i>
        <Controller
          control={control}
          name={name}
          defaultValue=""
          disabled={disabled}
          render={({ field }) => (
            <Select
              ref={ref}
              options={options}
              className={`grow ${className} ${error ? 'border-red-500' : ''}`}
              placeholder={`Select ${label}...`}
              styles={{
                control: (provided) => ({
                  ...provided,
                  border: 'none',
                  boxShadow: 'none',
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  paddingBlock: '0.5em',
                  paddingInline: '0',
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: '#a0aec0',
                }),
                menuList: (provided) => ({
                  ...provided,
                  maxHeight: 'calc(1.5em * 4)',
                  overflowX: 'auto',
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  paddingRight: '0',
                }),
              }}
              menuPlacement="auto"
              {...field}
              {...props}
            />
          )}
        />
      </label>
      {Array.isArray(error)
        ? error.map((err, index) => (
            <p
              key={index}
              className="text-red-500 text-xs mt-1"
            >
              {err.message}
            </p>
          ))
        : error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  )
);

SelectInputField.propTypes = {
  control: PropTypes.object,
  icon: PropTypes.element,
  label: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

SelectInputField.displayName = 'SelectInputField';
