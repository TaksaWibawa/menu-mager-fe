import PropTypes from 'prop-types';

function getValueByPath(object, path) {
  return path.split('.').reduce((obj, key) => obj && obj[key], object);
}

export function ModalListField({ label, data, valueKey }) {
  return (
    <div className="flex flex-col align-start align-start gap-1">
      <p className="font-semibold text-md lg:text-lg capitalize">{label}</p>
      <ul className="list-decimal list-inside">
        {data?.map((item, index) => {
          const value = getValueByPath(item, valueKey);
          return (
            <li
              key={`${value}-${index}`}
              className="text-xs lg:text-md capitalize"
            >
              {value}
            </li>
          );
        })}
        {data?.length === 0 && <li className="text-xs lg:text-md">No Recipe available</li>}
      </ul>
    </div>
  );
}

ModalListField.propTypes = {
  label: PropTypes.string,
  data: PropTypes.array,
  valueKey: PropTypes.string,
};
