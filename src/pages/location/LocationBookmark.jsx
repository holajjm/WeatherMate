import Loading from '@components/layout/Loading';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LocationBookMark() {
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkData, setBookmarkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async contentId => {
    try {
      const response = await axios.get(
        `https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ETC&MobileApp=test&_type=json&contentId=${contentId}&serviceKey=Tni56ZINiQ1IRiydSoRdwSLjhCAXtB2FKJPCTEQPxyyr0%2FJvNjWymNpCJQzOtAmEEr1jyhFa2zejQamJnkB9Uw%3D%3D&defaultYN=Y&firstImageYN=Y`,
      );
      return response.data.response.body.items.item; // item 배열 반환
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(storedBookmarks);
  }, []);

  useEffect(() => {
    const fetchDataForBookmarks = async () => {
      const bookmarkDataArray = await Promise.all(
        bookmarks.map(bookmark => fetchData(bookmark)),
      );
      setBookmarkData(bookmarkDataArray.flat()); // 중첩 배열 평탄화
      setLoading(false);
    };
    fetchDataForBookmarks();
  }, [bookmarks]);

  const moveToBookMarkPage = contentId => {
    navigate(`/location/${contentId}`);
  };

  const removeBookmark = contentId => {
    const updatedBookmarks = bookmarks.filter(
      bookmark => bookmark !== contentId,
    );
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    // 새로운 북마크 데이터 배열 생성
    const updatedBookmarkData = bookmarkData.filter(
      item => item.contentid !== contentId,
    );
    setBookmarkData(updatedBookmarkData);
  };

  return (
    <div className="mt-2 h-[300px] box-border overflow-y-scroll bg-slate-100 p-4  rounded-lg">

      {loading ? (
        <Loading />
      ) : (
        <div className='flex flex-wrap justify-between'>
          {bookmarkData.map((item, index) => (
            <div key={index} className='flex border-2 rounded-lg p-2 box-border w-1/2'>
              <div className="">

                <div className='flex'>
                  <img
                    src={item.firstimage ? item.firstimage : '/01.svg'}
                    className="rounded-3xl"
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <p className="text-base font-medium hover:text-primary_deep">{item.title}</p>
                  <button
                    onClick={() => moveToBookMarkPage(item.contentid)}
                    className="bg-slate-200 py-2 rounded-md font-semibold text-sm text-slate-600 hover:bg-primary hover:text-white"
                  >
                    상세보기
                  </button>
                  <button
                    onClick={() => removeBookmark(item.contentid)}
                    className="py-2 rounded-md font-medium text-sm bg-red-300 text-white hover:text-red-800 hover:font-extrabold"
                  >
                    삭제하기
                  </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationBookMark;
