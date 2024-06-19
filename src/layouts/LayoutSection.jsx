import PropTypes from 'prop-types';

export function LayoutSection({ className, children }) {
  return <section className={`flex flex-col gap-4 w-full ${className}`}>{children}</section>;
}

LayoutSection.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
