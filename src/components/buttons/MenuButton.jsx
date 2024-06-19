import PropTypes from 'prop-types';

export function MenuButton({ icon: Icon, children, onClick, className = '' }) {
  return (
    <li>
      <a
        className={`btn btn-ghost btn-sm hover:bg-primary hover:text-white justify-start ${className}`}
        onClick={onClick}
      >
        <Icon className="mr-2" />
        {children}
      </a>
    </li>
  );
}

MenuButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
