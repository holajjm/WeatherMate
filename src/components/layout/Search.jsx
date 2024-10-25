import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoSearch } from 'react-icons/io5';
import Button from '@components/layout/Button';

Search.propTypes = {
  onClick: PropTypes.func
};

function Search({ onClick }) {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <form className='w-full lg:w-1/2 flex items-center gap-4'>
      <p className='text-nowrap font-bold text-lg xl:text-xl'>검색하기</p>
      <input
        className="w-full h-8 border rounded-md border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        type="text"
        value={keyword}
        onChange={handleChange}
      />
      <Button 
        className="bg-gray-500 p-1 border rounded flex justify-center items-center"
        onClick={(e) => {
          e.preventDefault();
          onClick(keyword);
        }}
      >
        <IoSearch className="text-2xl"/>
      </Button>
    </form>
  );
}

export default Search;