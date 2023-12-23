import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const handleSearch = () => {
    onSearch(query);
  };
  const handleCancel = () => {
    setQuery('');
  }

  return (
    <div className='flex items-center'>
      <input
      className='p-2 rounded-md w-full font-semibold max-w-[20rem] border-[1px] border-gray-400 focus:outline-none focus:shadow-md'
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a location..."
      />
      <Icon icon="ep:search" onClick={handleSearch} className='-ml-[5rem] text-3xl pr-2 text-gray-400 cursor-pointer'/>
      <Icon icon="iconoir:cancel" onClick={handleCancel} className='border-l-[1px] border-gray-400 text-3xl text-gray-400 cursor-pointer'/>
    </div>
  );
};

export default SearchBar;