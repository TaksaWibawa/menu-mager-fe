import PropTypes from 'prop-types';

export function FilledButton({ children, onClick, className }) {
  return (
    <button
      className={`btn btn-sm bg-primary text-white hover:bg-primary-hover ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

FilledButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
