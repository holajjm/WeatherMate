import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useCurrentLocation from '@hooks/useCurrentLocation';
import { Link, useNavigate } from 'react-router-dom';
import Loading2 from '@components/layout/Loading2';
// import gsap from 'gsap';

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

function RecommendationPreview() {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState([]);
  const [locationReady, setLocationReady] = useState(false);
  const [contentTypeId, setContentTypeId] = useState('14');
  const [loading, setLoading] = useState(true);

  const radius = '10000'; //10km
  const { latitude, longitude } = useCurrentLocation();
  
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setLocationReady(true);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    const fetchData = async () => {
      if (locationReady) {
        try {
          const response = await axios.get(
            `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${apiKey}&pageNo=1&numOfRows=3&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentTypeId}&_type=json&arrange=R`,
          );
          setLocationData(response.data.response.body.items.item);
          setLoading(false);
        } catch (error) {
          console.error(
            '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
            error,
          );
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [locationReady, latitude, longitude, contentTypeId]); // contentTypeId 추가

  useEffect(() => {
    const getRandomContentTypeId = () => {
      const options = ['12', '14', '15', '25']; // 사용 가능한 contentTypeId 옵션
      const randomIndex = Math.floor(Math.random() * options.length); // 랜덤한 인덱스 선택
      return options[randomIndex]; // 선택된 contentTypeId 반환
    };
    setContentTypeId(getRandomContentTypeId());
  }, []);

  // useEffect(() => {
  //   const tl = gsap.timeline({defaults: {ease: 'power2.out'}});
  //   tl.from('.fade-in',{opacity: 0, y: 200, duration: 2.5});
  //   return () => {
  //     tl.kill();
  //   }
  // },[])
  // console.log(locationData);
  
  return (
    <div className="w-full xl:w-1/2 h-full bg-white border-4 border-violet-200 p-4 rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.2),inset_0px_4px_10px_rgba(255,255,255,0.5)] shadow-violet-200 fade-in">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-center items-center gap-4 font-bold">
          <h1><span className="text-xl text-blue-600">웨더메이트</span>가 추천하는 장소</h1>
          <button onClick={() => navigate("/location")} className="text-base font-semibold text-white bg-indigo-500 h-full text-pretty rounded-lg p-1 hover:bg-indigo-700 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400 duration-200 transition-all">
            보러가기
          </button>
        </div>
        <hr className="border-slate-700"/>
        {loading ? (
          <Loading2 />
        ) : (
          <div className="flex grow gap-4 font-sans text-sm overflow-x-scroll">
            {locationData.map(item => (
              <Link key={item.contentid} to={`/location/${item.contentid}`} className="w-full h-full flex flex-col gap-2 text-center text-nowrap border-2 border-slate-300 p-2 rounded-xl">
                <img
                  src={item.firstimage}
                  className="grow aspect-square min-w-[200px] max-h-[200px] rounded-lg"
                  alt={item.title}
                />
                <hr className="border-slate-700"/>
                <p className="grow flex justify-center items-center text-center text-sm font-bold overflow-hidden">
                  {item.title.length > 10 ? `${item.title.slice(0,15)}...` : item.title}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(RecommendationPreview);
