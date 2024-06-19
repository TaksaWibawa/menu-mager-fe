import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ element }) {
  const token = Cookies.get('token');
  const isAuthenticated = token && token.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);

  return !isAuthenticated ? element : <Navigate to="/dashboard" />;
}

ProtectedRoute.propTypes = {
  element: PropTypes.element,
};
