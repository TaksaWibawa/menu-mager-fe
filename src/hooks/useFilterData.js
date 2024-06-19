import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDebounce } from './useDebounce';

export const useFilterData = (initialData, debounceDelay = 500) => {
  const query = new URLSearchParams(useLocation().search).get('q');
  const debouncedQuery = useDebounce(query, debounceDelay);
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    if (debouncedQuery) {
      const filtered = initialData.filter((item) => item.name.toLowerCase().includes(debouncedQuery.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setFilteredData(initialData);
    }
  }, [debouncedQuery, initialData]);

  return filteredData;
};
