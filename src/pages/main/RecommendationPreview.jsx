/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useCurrentLocation from '@hooks/useCurrentLocation';
import { Link } from 'react-router-dom';
import Loading2 from '@components/layout/Loading2';
import gsap from 'gsap';

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

function RecommendationPreview() {
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
          // console.log(response.data);
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

  useEffect(() => {
    const tl = gsap.timeline({defaults: {ease: 'power2.out'}});
    tl.from('.fade-in-from-SW',{opacity: 0, y: 200, duration: 2.5});
    return () => {
      tl.kill();
    }
  },[])

  return (
    <div className="grow bg-white border-4 border-violet-200 p-4 rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.2),inset_0px_4px_10px_rgba(255,255,255,0.5)] shadow-violet-200 fade-in-from-SW">
      <div className="flex flex-col gap-4">
        <div className="flex justify-center gap-4 font-bold">
          <h1 className="text-xl text-primary">웨더메이트</h1>가 추천하는 장소
          <Link to="/location" className="text-base font-semibold text-white bg-indigo-500 h-10 text-pretty rounded-lg p-1 hover:bg-indigo-700 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400 duration-200 transition-all">
            보러가기
          </Link>
        </div>
        <div>
          {loading ? (
            <Loading2 />
          ) : (
            <div className="flex gap-6 font-sans text-sm">
              {locationData.map(item => (
                <div key={item.contentid}>
                  <Link to={`/location/${item.contentid}`}>
                    <img
                      src={item.firstimage}
                      className="w-[100px] h-[100px] rounded-xl"
                      alt="recommendation"
                    />
                  </Link>
                  <p className="text-center text-sm mt-2">
                    {item.title.length > 5
                      ? `${item.title.slice(0, 10)}...`
                      : item.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(RecommendationPreview);
