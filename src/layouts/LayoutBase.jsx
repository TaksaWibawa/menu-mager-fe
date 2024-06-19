import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LayoutBase({ children }) {
  return (
    <div className="flex flex-col h-screen">
      {children}
      <ToastContainer />
    </div>
  );
}

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
};
