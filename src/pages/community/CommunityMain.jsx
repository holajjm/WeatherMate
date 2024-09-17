import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CommunityItem from './CommunityItem';
import useCustomAxios from '@hooks/useCustomAxios.mjs';
import Search from '@components/layout/Search';
import ToTheTopButton from '@components/layout/ToTheTopButton';
import CommunityPopularItem from '@pages/community/CommunityPopularItem';
import DetailPageHeader from '@components/layout/DetailPageHeader';

function CommunityMain() {
  const axios = useCustomAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  // console.log(page)
  // console.log(searchParams)

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

  // console.log(data.item);

  return (
    <div className="min-h-screen min-w-96 p-5 md:px-48 xl:px-60">
      <div className="box-border md:hidden">
        <DetailPageHeader title={'커뮤니티'} />
      </div>
      <CommunityPopularItem data={data} />
      <div className="flex items-center py-3 gap-3 xl:justify-between">
        <div className="grow xl:grow-0 2xl:w-96">
          <Search onClick={handleSearch}></Search>
        </div>
        
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
        {isLoading && <p colSpan="5">로딩중...</p>}
        {isError && <p colSpan="5">{isError.message}</p>}
        {itemList}
      </div>
      <ToTheTopButton />
    </div>
  );
}

export default CommunityMain;
