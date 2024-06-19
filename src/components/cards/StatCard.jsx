import PropTypes from 'prop-types';

export function StatCard({ title, value, icon, variant }) {
  const getVariant = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-black';
      case 'danger':
        return 'bg-danger';
      case 'success':
        return 'bg-success';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className={`stats shadow ${getVariant()}`}>
      <div className="stat">
        <div className="stat-icon">{icon}</div>
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-desc">21% more than last month</div>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'primary', 'danger', 'success']),
};
