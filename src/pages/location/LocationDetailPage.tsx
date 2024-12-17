import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '@components/layout/Loading';
import LocationMap from '@pages/location/LocationMap';
import { LocationDetailData, LocationSuperDetailData } from 'type';

import { FaLocationDot } from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";
import { FaParking } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { MdFreeBreakfast } from "react-icons/md";
import { FaDog } from "react-icons/fa";
import { RiGlobalFill } from "react-icons/ri";

const apiKey = import.meta.env.VITE_REACT_APP_LOCATION_API_KEY;

function LocationDetailPage() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState<LocationDetailData>();
  const [homepageUrls, setHomepageUrls] = useState<string[]>([]);
  const [isMoreView, setIsMoreView] = useState<boolean>(false);
  const [superDetail, setSuperDetail] = useState<LocationSuperDetailData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=testweb&contentId=${id}&serviceKey=${apiKey}&_type=json&defaultYN=Y&firstImageYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`,
        );
        setDetailData(response.data.response.body.items.item[0]);
        // URL 추출 부분
        const regex = /(http[^"]+)/g;
        const match = response.data.response.body.items.item[0].homepage.match(regex);
        setHomepageUrls(match);
      } catch (error) {
        console.error(
          '데이터를 원활하게 가져오는데 오류가 발생하였습니다.',
          error,
        );
      }
    };

    const fetchSuperDetail = async () => {
      try {
        const response = await axios.get(
          `https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ETC&MobileApp=testWeb&contentId=${id}&contentTypeId=12&serviceKey=${apiKey}&_type=json`,
        );
        setSuperDetail(response.data.response.body.items.item);
        setLoading(false);
      } catch (error) {
        console.error('데이터 패칭 실패', error);
        setLoading(false);
      }
    };

    fetchData();
    fetchSuperDetail();
  }, [id]);

  const onClickMoreViewButton = () => {
    setIsMoreView(!isMoreView);
  };

  if (!detailData || loading) {
    return <Loading />;
  }
  console.log(detailData);
  console.log(superDetail);

  return (
    <div className="max-w-[600px] min-w-[320px] m-auto">
      <div className="p-2 flex flex-col gap-4">
        <div className="relative">
          <button className="absolute p-2 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-gray-500 bg-slate-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400" onClick={() => window.history.back()}>뒤로 가기</button>
          <h1 className="text-3xl text-center font-bold font-UhBeeKangJa">
            {detailData.title}
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <img
              src={detailData.firstimage}
              alt="이미지1"
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex gap-2">
            <table className="w-1/2 bg-slate-100 p-2 rounded-lg">
              {superDetail && detailData && (
                <tbody>
                  <tr className="flex items-center">
                    <td className="text-center p-2 w-1/6 flex justify-center">
                      <FaLocationDot />
                    </td>
                    <td className="p-2 grow">
                      {detailData.addr1}
                      {detailData.addr2 ? detailData.addr2 : ''}
                    </td>
                  </tr>
                  <tr className="flex items-center">
                    <td className="text-center p-2 w-1/6 flex justify-center">
                      <BsTelephoneFill />
                    </td>
                    <td className="p-2 grow">
                      {superDetail[0].infocenter
                        ? superDetail[0].infocenter.replace(/<br>/g,' / ')
                        : '-'}
                    </td>
                  </tr>
                  <tr className="flex items-center">
                    <td className="text-center p-2 w-1/6 flex justify-center">
                      <FaParking />
                    </td>
                    <td className="p-2 grow">
                      {superDetail[0].parking ? superDetail[0].parking.replace(/<br>/g,' / ') : '불가'}
                    </td>
                  </tr>
                  <tr className="flex items-center">
                    <td className="text-center p-2 w-1/6 flex justify-center">
                      <FaClock />
                    </td>
                    <td className="p-2 grow">
                      {' '}
                      {superDetail[0].usetime
                        ? superDetail[0].usetime
                        : '-'}
                    </td>
                  </tr>
                  <tr className="flex items-center">
                    <td className="text-center p-2 w-1/6 flex justify-center">
                      <MdFreeBreakfast />
                    </td>
                    <td className="p-2 grow">
                      {superDetail[0].restdate
                        ? superDetail[0].restdate.replace(/<br>/g,' / ')
                        : '-'}
                    </td>
                  </tr>
                  <tr className="flex items-center">
                    <td className="text-center p-2 w-1/6 flex justify-center">
                      <FaDog />
                    </td>
                    <td className="p-2 grow">
                      {superDetail[0].chkpet ? superDetail[0].chkpet : '불가'}
                    </td>
                  </tr>
                  <tr className="flex items-center">
                    <td className="text-center p-2 w-1/6 flex justify-center">
                      <RiGlobalFill />
                    </td>
                    <td className="p-2 grow">
                      <button
                        onClick={() => window.open(homepageUrls[0], '_blank')}
                      >
                        {homepageUrls ? homepageUrls[0] : '없음'}
                      </button>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
            <div className="w-1/2">
              <LocationMap
                latitude={Number(detailData.mapy)}
                longitude={Number(detailData.mapx)}
                locationName={detailData.title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LocationDetailPage;
