import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';

export function SearchBar({ className = '' }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (event) => {
    if (event.target.value) {
      setSearchParams({ q: event.target.value });
    } else {
      searchParams.delete('q');
      setSearchParams(searchParams);
    }
  };

  return (
    <label
      htmlFor="search-input"
      className={`input input-sm input-bordered flex items-center gap-2 ${className}`}
    >
      <input
        id="search-input"
        type="text"
        className="grow w-1/3"
        placeholder="Search"
        value={searchParams.get('q') || ''}
        onChange={handleSearch}
      />
      <HiOutlineSearch />
    </label>
  );
}

SearchBar.propTypes = {
  className: PropTypes.string,
};
