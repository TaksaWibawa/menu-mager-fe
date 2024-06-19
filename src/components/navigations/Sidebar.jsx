import PropTypes from 'prop-types';
import { SidebarItem } from './SidebarItem';
import Logo from '@/assets/logo.png';

export function Sidebar({ items, active }) {
  return (
    <aside className="drawer-side z-10 h-screen">
      <label
        htmlFor="my-drawer"
        className="drawer-overlay"
      />
      <div className="w-64 flex flex-col bg-sidebar h-screen fixed top-0 left-0">
        <div className="flex items-center justify-center px-6 py-6 border-b border-[#C8CBD9]">
          <div className="flex items-center justify-center">
            <img
              src={Logo}
              alt="logo"
              className="object-contain h-10"
            />
          </div>
        </div>
        <div className="py-4 overflow-y-auto flex-grow">
          {items.map((group) => (
            <div
              key={group.category}
              className="py-2 px-4 flex flex-col gap-2 mb-2"
            >
              <p className="px-4 text-xs text-[#082431] opacity-50 uppercase">{group.category}</p>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item.title}>
                    <SidebarItem
                      title={item.title}
                      icon={item.icon}
                      link={item.path}
                      current={item.title === active}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  items: PropTypes.array.isRequired,
  active: PropTypes.string.isRequired,
};
