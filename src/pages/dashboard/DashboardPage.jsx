import { DASHBOARD_URLS } from '@/constants';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {DASHBOARD_URLS.flatMap((category) =>
        category.items.map((item) =>
          item.title !== 'Dashboard' ? (
            <div
              key={item.title}
              className="p-4 bg-white shadow rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <item.icon className="w-4 h-4 text-primary lg:w-6 lg:h-6" />
                  <span className="text-sm font-semibold text-gray-800 lg:text-lg w-24">{item.title}</span>
                </div>
                <Link to={item.path}>
                  <button className="btn bg-primary text-white hover:bg-primary-hover py-1 px-2 text-sm lg:py-2 lg:px-4 lg:text-base">
                    Open Menu
                  </button>
                </Link>
              </div>
            </div>
          ) : null
        )
      )}
    </div>
  );
}
