import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useCurrentLocation from '@hooks/useCurrentLocation';
import { BsBookmarksFill } from "react-icons/bs";
import LocationKeywords from './LocationKeyword';
import { useRecoilValue } from 'recoil';
import { memberState } from '@recoil/atom.mjs';
import Loading from '@components/layout/Loading';
import { FiMapPin } from 'react-icons/fi';
import DetailPageHeader from '@components/layout/DetailPageHeader';
import PropTypes from 'prop-types';

Location.propTypes = {
  keyword: PropTypes.string
}
const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

function Location({ keyword }) {
  const user = useRecoilValue(memberState);
  const [locationData, setLocationData] = useState([]);
  const [locationReady, setLocationReady] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contentID, setContentID] = useState('12');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const radius = '200000';
  const { latitude, longitude } = useCurrentLocation();

  //사용자 현재 위치 위도, 경도 정보 받아온 후 locationReady 상태값 업데이트
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setLocationReady(true);
    }
  }, [latitude, longitude]);

  //사용자 위치가 변경되었을 경우 
  useEffect(() => {
    if (locationReady && !searchKeyword.trim().length) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${apiKey}&pageNo=1&numOfRows=6&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentID}&_type=json `,
          );
          setLocationData(response.data.response.body.items.item);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error(
            '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
            error,
          );
        }
      };
      fetchData();
    }
  }, [locationReady, latitude, longitude, contentID]);

  //검색창에 검색했을 경우 검색어 상태값으로 관리
  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  //
  useEffect(() => {
    if (searchKeyword) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=testweb&serviceKey=${apiKey}&keyword=${keyword}&_type=json&contentTypeId=${contentID}`,
          );
          setLocationData(response.data.response.body.items.item);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.error(
            '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
            error,
          );
        }
      };
      fetchData();
    }
  }, [searchKeyword, contentID]);

  const formatDistance = distance => `${(distance / 1000).toFixed(1)} km`;
  const recoDefaultImg = '/readyforimage.jpeg';

  const fetchNextPage = async () => {
    try {
      const response = await axios.get(
        `http://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${apiKey}&pageNo=${currentPage + 1}&numOfRows=10&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentID}&_type=json`,
      );
      setLocationData(prevData => [
        ...prevData,
        ...response.data.response.body.items.item,
      ]);
      setCurrentPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error(
        '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
        error,
      );
    }
  };

  //무한 스크롤에 따른 데이터 호출 구현
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      locationData.length > 0 &&
      scrollTop + clientHeight >= scrollHeight - 5
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [locationData]);
  //북마크 기능 구현
  const handleBookMark = contentId => {
    if (!user) {
      if (confirm('로그인이 필요합니다. 로그인 하시겠습니까?')) {
        navigate('/user/login');
      }
    } else {
        try {
          let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
          bookmarks.push(contentId);
          localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
          alert('해당 게시물이 북마크에 추가 되었습니다.');
          console.log('북마크 추가 성공:', contentId);
        } catch (error) {
          console.error('북마크 추가 실패:', error);
        }
    }
  };

  const options = [
    { id: '12', label: '전체', img_src: 'all.svg' },
    { id: '14', label: '문화', img_src: 'communityplace.svg' },
    { id: '15', label: '행사', img_src: 'festival.svg' },
    { id: '25', label: '여행지', img_src: 'travel.svg' },
    { id: '28', label: '레포츠', img_src: 'reports.svg' },
    { id: '32', label: '숙박', img_src: 'hotel.svg' },
    { id: '38', label: '쇼핑', img_src: 'shopping.svg' },
    { id: '39', label: '음식점', img_src: 'food.svg' },
  ];

  const getCategoryText = cat2 => {
    switch (cat2) {
      case 'A0101':
        return '자연 관광지';
      case 'A0102':
        return '관광자원';
      case 'A0201':
        return '역사 관광지';
      case 'A0202':
        return '휴양&쉼터';
      case 'A0203':
        return '체험관광지';
      case 'A0401':
        return '쇼핑';
      case 'A0502':
        return '음식점';
      case 'B0201':
        return '숙박시설';
      default:
        return '문화';
    }
  };

  return (
    <div className="flex flex-col gap-6 mx-auto px-8 min-h-screen">
      <DetailPageHeader title={"장소 추천"}/>
      <div className="flex flex-grow gap-1 justify-center items-center flex-wrap lg:flex-nowrap">
        {options.map((option) => (
          <div className="flex flex-grow items-center justify-center rounded-lg w-1/4" key={option.id}>
            <LocationKeywords
              id={option.id}
              label={option.label}
              img_src={option.img_src}
              onClick={setContentID}
            />
          </div>
        ))}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 relative">
          {locationData?.map((item, index) => (
            <div
              className="p-4 rounded-md shadow-lg border-2 border-gray-100 relative m-w-[400]"
              key={index}
            >
                <div className='min-w-28 flex flex-col'>
                  
                  <Link to={`/location/${item.contentid}`}>
                    <div className="flex">
                      <img
                        src={item.firstimage ? item.firstimage : recoDefaultImg}
                        alt="이미지1"
                        className="max-w-full mb-2 rounded-md overflow-hidden aspect-square object-cover border-2"
                      />
                    </div>
                  </Link>
                  <div className='flex gap-3'>
                    <Link to={`/location/${item.contentid}`} className='flex-grow'>
                      <div className="flex box-border">
                        <p className="text-base text-left flex-grow text-slate-400">
                          {getCategoryText(item.cat2)}
                        </p>
                        <div className="bg-[#FFF387] flex justify-center items-center gap-3 h-6 opacity-80 rounded-md">
                          <FiMapPin />
                          <p className="text-base text-right">
                            {isNaN(parseFloat(item.dist))
                              ? '너무 멀어요!'
                              : formatDistance(parseFloat(item.dist))}
                          </p>
                        </div>
                      </div>
                      <h2 className="text-base font-bold">{item.title}</h2>
                      <p className="text-pretty">{item.addr1}</p>
                    </Link>
                    <div>
                      <BsBookmarksFill
                        className="text-blue-300 aspect-square w-[30px] h-[30px] cursor-pointer"
                        onClick={() => handleBookMark(item.contentid)}
                      />
                    </div>
                  </div>

                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Location;
