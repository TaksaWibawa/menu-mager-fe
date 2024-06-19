import { NavLink, useLocation } from 'react-router-dom';

export function Breadcrumb() {
  const paths = useLocation()
    .pathname.split('/')
    .filter((path) => path);

  return (
    <div className="text-sm breadcrumbs hidden lg:flex gap-2 p-0">
      <ul>
        <li key="home">
          <div className="capitalize opacity-50">
            <a className="capitalize">Home</a>
          </div>
        </li>
        {paths.map((path, index) => (
          <li key={index}>
            <NavLink
              to={`/${paths.slice(0, index + 1).join('/')}`}
              className={`capitalize ${
                index === paths.length - 1 ? 'font-bold text-primary' : 'opacity-50 hover:opacity-80'
              }`}
            >
              {path}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
