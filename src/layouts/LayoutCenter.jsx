import PropTypes from 'prop-types';

export function LayoutCenter({ children, className = '' }) {
  return (
    <section className={`flex items-center justify-center h-screen ${className}`}>
      <div className="w-full max-w-md">{children}</div>
    </section>
  );
}

LayoutCenter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
