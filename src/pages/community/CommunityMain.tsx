import React,{ useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CommunityItem from './CommunityItem';
import useCustomAxios from '@hooks/useCustomAxios.mts';
import Search from '@components/layout/Search';
import ToTheTopButton from '@components/layout/ToTheTopButton';
import CommunityPopularItem from '@pages/community/CommunityPopularItem';
import { useRecoilState } from 'recoil';
import { memberState } from '../../recoil/atom.mts';
import ValidLogin from '@pages/user/ValidLogin';
import usePageTitle from '@hooks/usePageTitle';
import CommunityNewbutton from '@pages/community/CommunityNewbutton';
import { AxiosResponse } from 'axios';
import { CommunityMainData } from 'type';

function CommunityMain() {
  usePageTitle("Community");
  const [select, setSelect] = useState("");
  const axios = useCustomAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useRecoilState(memberState);
  const page = searchParams.get('page');
  const { isLoading, data, error, refetch } = useQuery<AxiosResponse<CommunityMainData>>({
    queryKey: ['posts', page],
    queryFn: () =>
      axios.get('/posts', {
        params: {
          page,
          keyword: searchParams.get('keyword'),
          type: 'community',
        },
      }),
    refetchOnMount: 'always',
  });

  useEffect(() => {
    window.scrollTo(0,0)
  },[])

  useEffect(() => {
    refetch();
  }, [searchParams.toString()]);
  // console.log(data?.data?.item);
  
  const handleSearch = (keyword:string) => {
    searchParams.set('keyword', keyword);
    searchParams.set('page', "1");
    setSearchParams(searchParams);
  };
  const selectValue = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value)
  }
  const sortItemList = (select:string) => {
    if(select === "" || select ==="latest"){
      return data?.data?.item?.map(item => (
        <CommunityItem key={item._id} item={item} />
      ));
    }
    if(select === "oldest"){
      return data?.data?.item?.map(item => (
        <CommunityItem key={item._id} item={item} />
      )).reverse();
    }
    if(select === "most-viewed"){
      return data?.data?.item.sort((a,b) => b.views - a.views).map(item => (
        <CommunityItem key={item._id} item={item} />
      ));
    }
    if(select === "least-viewed"){
      return data?.data?.item.sort((a,b) => a.views - b.views).map(item => (
        <CommunityItem key={item._id} item={item} />
      ));
    }
    if(select === "replies"){
      return data?.data?.item.sort((a,b) => b.repliesCount - a.repliesCount).map(item => (
        <CommunityItem key={item._id} item={item} />
      ));
    }
  }
  
  return (
    <>
      {user && user[0]?.name ? (
        <div className="max-w-[600px] min-w-[320px] m-auto h-screen flex flex-col gap-4 overflow-y-scroll scrollbar-hide p-2 bg-slate-50">
          <aside>
            <CommunityPopularItem />
          </aside>
          <section className="flex flex-col gap-4">
            <Search onClick={handleSearch}></Search>
            <div className="ml-auto flex gap-2">
              <select className="border-2 border-slate-300 rounded-md font-SSRONETHandwritten text-xl font-bold text-slate-700" value={select} onChange={selectValue}>
                <option value="latest">최신순</option>
                <option value="oldest">오래된순</option>
                <option value="most-viewed">조회수 높은 순</option>
                <option value="least-viewed">조회수 낮은 순</option>
                <option value="replies">댓글순</option>
              </select>
              <CommunityNewbutton />
            </div>
          </section>
          <main className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isLoading && <p>로딩중...</p>}
            {error && <p>{error.message}</p>}
            {sortItemList(select)}
          </main>
          <ToTheTopButton />
        </div>
      ) : (
        <ValidLogin />
      )}
    </>
  );
}

export default CommunityMain;
