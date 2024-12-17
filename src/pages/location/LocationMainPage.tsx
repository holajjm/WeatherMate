import React from 'react';
import usePageTitle from '@hooks/usePageTitle';
import ToTheTopButton from '../../components/layout/ToTheTopButton';
import Location from '@pages/location/Location';

// 장소추천 최상단 페이지
function LocationMainPage() {
  usePageTitle("Location");
  return (
    <div className="max-w-[600px] min-w-[320px] m-auto">
      <ToTheTopButton />
      <Location />
    </div>
  );
}

export default LocationMainPage;