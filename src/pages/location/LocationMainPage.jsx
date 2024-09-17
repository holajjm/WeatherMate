// import Location from './Location';
import ToTheTopButton from '../../components/layout/ToTheTopButton';
import SearchLocation from './SearchLocation';

// 장소추천 최상단 페이지
function LocationMainPage() {
  return (
    <div className=''>
      <ToTheTopButton />
      <SearchLocation />
    </div>
  );
}

export default LocationMainPage;
