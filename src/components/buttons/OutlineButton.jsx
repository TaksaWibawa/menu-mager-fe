import PropTypes from 'prop-types';

export function OutlineButton({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-sm btn-outline border-[#c5d2e8] text-primary hover:bg-primary hover:border-primary hover:text-white ${className}`}
    >
      {children}
    </button>
  );
}

OutlineButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
