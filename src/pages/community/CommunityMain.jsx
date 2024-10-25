import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CommunityItem from './CommunityItem';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import Search from '@components/layout/Search';
import ToTheTopButton from '@components/layout/ToTheTopButton';
import CommunityPopularItem from '@pages/community/CommunityPopularItem';
import { useRecoilState } from 'recoil';
import { memberState } from '@recoil/atom.mjs';
import ValidLogin from '@pages/user/ValidLogin';

function CommunityMain() {
  const axios = useCustomAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useRecoilState(memberState);
  const page = searchParams.get('page');
  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ['posts', page],
    queryFn: () =>
      axios.get('/posts', {
        params: {
          page,
          keyword: searchParams.get('keyword'),
          type: 'community',
        },
      }),
    select: response => response.data,
    suspense: true,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    refetch();
  }, [searchParams.toString()]);

  const handleSearch = keyword => {
    searchParams.set('keyword', keyword);
    searchParams.set('page', 1);
    setSearchParams(searchParams);
  };

  const itemList = data?.item?.map(item => (
    <CommunityItem key={item._id} item={item} />
  ));
  // console.log(user);
  // console.log(page)
  // console.log(searchParams)
  // console.log(data.item);
  return (
    <>
      {user && user[0]?.name ? (
        <div className="bg-gray-100 xl:h-screen h-full flex flex-col gap-4 font-sans overflow-y-scroll scrollbar-hide p-8 md:px-20 xl:px-56 2xl:px-60 min-w-[375px]">
          <CommunityPopularItem data={data} />
          <div className="flex justify-center py-4 w-full">
            <Search onClick={handleSearch}></Search>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
            {isLoading && <p colSpan="5">로딩중...</p>}
            {isError && <p colSpan="5">{isError.message}</p>}
            {itemList}
          </div>
          <ToTheTopButton />
        </div>
      ) : (
        <ValidLogin />
      )}
    </>
  );
}

export default CommunityMain;
