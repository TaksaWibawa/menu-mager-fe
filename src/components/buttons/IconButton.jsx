import PropTypes from 'prop-types';

export function IconButton({ label = '', icon, onClick, className = '' }) {
  return (
    <div
      className="tooltip"
      data-tip={label}
    >
      <button
        onClick={onClick}
        className={`btn btn-xs btn-circle bg-transparent border-none hover:bg-gray-200 ${className}`}
        aria-label={label}
      >
        {icon}
      </button>
    </div>
  );
}

IconButton.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
