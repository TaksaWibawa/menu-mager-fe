import PropTypes from 'prop-types';
import { TableActions } from './TableActions';

export function BaseTable({ heads = [], children, columnWidths = [], addButtonProps = {} }) {
  return (
    <div className="overflow-x-auto w-full shadow-lg border border-gray-200 p-4 rounded-xl lg:min-h-fit bg-gray-50 grid grid-rows-[auto,1fr] gap-4">
      <TableActions addButtonProps={addButtonProps} />
      <div className="overflow-y-auto max-h-[80vh] lg:max-h-full">
        <table className="table table-zebra table-sm text-center table-pin-rows max-w-full">
          <colgroup>
            {columnWidths.map((width, index) => (
              <col
                key={index}
                width={width}
              />
            ))}
          </colgroup>
          <thead>
            <tr>
              {heads?.map((head, index) => (
                <th
                  key={index}
                  className="capitalize bg-primary text-white text-md py-4"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

BaseTable.propTypes = {
  heads: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  columnWidths: PropTypes.arrayOf(PropTypes.string),
  addButtonProps: PropTypes.shape({
    add: PropTypes.shape({
      show: PropTypes.bool,
      text: PropTypes.string,
      onClick: PropTypes.func,
    }),
  }),
};
