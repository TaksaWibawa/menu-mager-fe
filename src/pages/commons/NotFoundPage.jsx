import { LayoutCenter } from '@/layouts';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <LayoutCenter>
      <div className="flex flex-col items-center justify-center space-y-4 p-12 bg-gray-100 rounded-lg">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-6xl text-primary">404</h1>
          <p className="text-2xl text-gray-800">Page not found</p>
        </div>
        <p className="text-gray-600 text-md text-center">The page you are looking for does not exist.</p>
        <Link
          to={-1}
          className="btn bg-primary text-white hover:bg-primary-hover"
        >
          Go back to Previous Page
        </Link>
      </div>
    </LayoutCenter>
  );
}
