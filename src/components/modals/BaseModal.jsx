import PropTypes from 'prop-types';

export function BaseModal({ id, title, children }) {
  return (
    <dialog
      id={id}
      className="modal"
    >
      <div className="modal-box flex flex-col p-6 max-w-lg lg:max-w-2xl rounded-md shadow-md gap-2">
        <div className="modal-header flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">✕</button>
          </form>
        </div>
        <div className="modal-body overflow-y py-4">{children}</div>
      </div>
      <form
        method="dialog"
        className="modal-backdrop"
      >
        <button>close</button>
      </form>
    </dialog>
  );
}

BaseModal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
