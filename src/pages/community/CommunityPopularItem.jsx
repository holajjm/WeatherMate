import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import CommunityNewbutton from "@pages/community/CommunityNewbutton";

CommunityPopularItem.propTypes = {
  data: PropTypes.object
}

function CommunityPopularItem({data}) {
  const navigate = useNavigate();

  const itemViews = data.item.sort((a,b) => b.views-a.views).slice(0,8).map(item => 
    <div key={item._id} className="w-8/12">
      <div className={`bg-gray-300 rounded-[40px] h-32 p-3 text-nowrap bg-cover bg-center`} style={{ backgroundImage: `url(${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.image})` }} onClick={() => navigate(`/community/${item._id}`)}>
      </div>  
      <div className="font-bold flex gap-2">
        <p>{item.user?.name}</p>
        <p>조회수 {item.views}</p>
      </div>
    </div>
  );
  
  // console.log(data.item)

  return (
    <div className="pb-3 border-b-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg text-gray-700 md:text-xl xl:text-2xl">인기 포스팅</h2>
        <CommunityNewbutton />
      </div>
      <div className="w-full flex gap-3 overflow-x-scroll">
        {itemViews}
      </div>
    </div>
  )
}

export default CommunityPopularItem