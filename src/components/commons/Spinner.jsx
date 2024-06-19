import PropTypes from 'prop-types';

export function Spinner({ height = '100px', width = '100px' }) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <span
        className={'loading loading-spinner text-primary'}
        style={{ height, width }}
      />
    </div>
  );
}

Spinner.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};
