import React,{ memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@components/layout/Button';
import { useQuery } from '@tanstack/react-query';
import useCustomAxios from '../../hooks/useCustomAxios.mts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, HashNavigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { ExpandCommunityData } from 'type';

function RecommendationCommunity() {
  const navigate = useNavigate();
  const axios = useCustomAxios();
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => axios.get('/posts', { params: { type: 'community' } }),
    select: response => response.data,
    refetchOnMount: 'always',
  });
  const communityData = data && data.item.slice(0, 10);
  // console.log(communityData);

  return (
    <div className="w-full h-full bg-white fade-in px-2">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="font-extrabold text-xl">
              <span className="text-2xl text-blue-600">웨더메이트</span>의 커뮤니티
            </h1>
            <h2 className="text-slate-400">메이트들의 추억을 공유해요!</h2>
          </div>
          <button
          type='button'
            // text={'더보기'}
            onClick={() => navigate('/community')}
            className="h-1/2 mt-auto text-sm text-white font-semibold bg-indigo-500 rounded-md p-2 hover:bg-indigo-700 hover:shadow-[0_5px_30px_4px] hover:shadow-slate-400 duration-200 transition-all"
          >더보기</button>
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
            {communityData &&
              communityData.map((item:ExpandCommunityData) => (
                <SwiperSlide key={item._id} data-hash={`community-${item._id+1}`} className="w-[500px] mb-10">
                  <Link
                    to={`/community/${item._id}`}
                    className="w-full flex flex-col gap-2 text-center text-nowrap p-2 box-border"
                  >
                    {item.image ? (
                      <img
                        className="w-full h-[200px] rounded-lg "
                        src={`${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.image}`}
                        alt={item.type}
                        loading='lazy'
                      />
                    ) : (
                      <div className="w-full h-[200px] flex items-center justify-center">
                        No Image
                      </div>
                    )}
                    <hr className="border-slate-700" />
                    <p className="flex justify-center items-center text-center text-sm font-bold overflow-hidden">
                      {item.content?.length  > 10
                        ? `${item.content.slice(0, 10)}...`
                        : item.content}
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

export default memo(RecommendationCommunity);
