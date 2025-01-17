import React, { memo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import useCurrentLocation from "@hooks/useCurrentLocation";
// import Button from '@components/layout/Button';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, HashNavigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

function MainRecommendationPreview() {
  interface PreviewItem {
    addr1: string;
    addr2: string;
    areacode: string;
    booktour: string;
    cat1: string;
    cat2: string;
    cat3: string;
    contentid: string;
    contenttypeid: string;
    cpyrhtDivCd: string;
    createdtime: string;
    dist: string;
    firstimage: string;
    firstimage2: string;
    mapx: string;
    mapy: string;
    mlevel: string;
    modifiedtime: string;
    sigungucode: string;
    tel: string;
    title: string;
  }
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState([]);
  const [locationReady, setLocationReady] = useState(false);
  const [contentTypeId, setContentTypeId] = useState("14");
  // const [loading, setLoading] = useState(true);

  const radius = "10000"; //10km
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
            `https://apis.data.go.kr/B551011/KorService1/locationBasedList1?serviceKey=${apiKey}&pageNo=1&numOfRows=16&mapX=${longitude}&mapY=${latitude}&radius=${radius}&MobileApp=AppTest&MobileOS=ETC&contentTypeId=${contentTypeId}&_type=json&arrange=R`,
          );
          setLocationData(response.data.response.body.items.item);
          // setLoading(false);
        } catch (error) {
          console.error(
            "데이터를 원활하게 가져오는데 오류가 발생하였습니다.",
            error,
          );
          // setLoading(false);
        }
      }
    };

    fetchData();
  }, [locationReady, latitude, longitude, contentTypeId]); // contentTypeId 추가

  useEffect(() => {
    const getRandomContentTypeId = () => {
      const options = ["12", "14", "15", "25"]; // 사용 가능한 contentTypeId 옵션
      const randomIndex = Math.floor(Math.random() * options.length); // 랜덤한 인덱스 선택
      return options[randomIndex]; // 선택된 contentTypeId 반환
    };
    setContentTypeId(getRandomContentTypeId());
  }, []);

  // console.log(locationData);

  return (
    <div className="w-full h-full bg-white fade-in px-2">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="font-extrabold text-xl">
              <span className="text-2xl text-blue-600">웨더메이트</span>의
              장소추천
            </h1>
            <h2 className="text-slate-400">근처의 추천하는 장소에요!</h2>
          </div>
          <button
            type="button"
            // text={'더보기'}
            onClick={() => navigate("/location")}
            className="h-1/2 mt-auto text-sm text-white font-semibold bg-indigo-500 rounded-md p-2 hover:bg-indigo-700 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400 duration-200 transition-all"
          >
            더보기
          </button>
        </div>
        <div className="w-full flex gap-4 font-sans text-sm">
          <Swiper
            spaceBetween={30}
            hashNavigation={{
              watchState: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, HashNavigation]}
            className="w-full border-2 border-slate-200"
          >
            {locationData.map((item: PreviewItem) => (
              <SwiperSlide
                key={item.contentid}
                data-hash={`location-${item.contentid + 1}`}
                className="w-[500px] mb-10"
              >
                <Link
                  to={`/location/${item.contentid}`}
                  className="w-full flex flex-col gap-2 text-center text-nowrap p-2 box-border"
                >
                  <img
                    src={item.firstimage}
                    className="w-full h-[200px] rounded-lg"
                    alt={item.title}
                    loading="lazy"
                  />
                  <hr className="border-slate-700" />
                  <p className="flex justify-center items-center text-center text-sm font-bold overflow-hidden">
                    {item.title.length > 10
                      ? `${item.title.slice(0, 15)}...`
                      : item.title}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default memo(MainRecommendationPreview);
