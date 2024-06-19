import PropTypes from 'prop-types';

export function ModalDataField({ label, value }) {
  return (
    <div className="flex flex-col align-start align-start gap-1">
      <p className="font-semibold text-md lg:text-lg capitalize">{label}</p>
      <p className="text-xs lg:text-md capitalize">{value}</p>
    </div>
  );
}

ModalDataField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};
