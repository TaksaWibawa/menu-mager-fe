import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export function SidebarItem({ title, icon, link, current }) {
  return (
    <NavLink
      to={link}
      className={`${
        current ? 'bg-primary bg-opacity-10' : 'opacity-60'
      } flex items-center px-4 py-2 hover:bg-primary hover:bg-opacity-10 hover:text-gray-800 transition-colors gap-3 rounded-md text-sm`}
    >
      {icon({ className: `w-6 h-6 ${current ? 'text-primary' : 'text-customGray'}` })}
      <span className={`mx-2 font-reguler ${current ? 'text-primary font-medium' : 'text-customGray'}`}>{title}</span>
    </NavLink>
  );
}

SidebarItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  link: PropTypes.string.isRequired,
  current: PropTypes.bool.isRequired,
};
