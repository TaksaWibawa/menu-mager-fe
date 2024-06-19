import PropTypes from 'prop-types';
import { HiOutlinePlus } from 'react-icons/hi';
import { SearchBar } from '../inputs';
import { FilledButton } from '../buttons';

export function TableActions({ addButtonProps }) {
  return (
    <div className="table-actions">
      <div className="flex justify-between items-center mb-4">
        <SearchBar className="w-2/3 md:w-1/3" />
        <div>
          {addButtonProps?.show && (
            <FilledButton onClick={addButtonProps.onClick}>
              <HiOutlinePlus />
              {addButtonProps.text}
            </FilledButton>
          )}
        </div>
      </div>
    </div>
  );
}

TableActions.propTypes = {
  addButtonProps: PropTypes.shape({
    show: PropTypes.bool,
    text: PropTypes.string,
    onClick: PropTypes.func,
  }),
};
