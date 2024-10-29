import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'

UserBoard.propTypes = {
  item: PropTypes.object
}

function UserBoard({item}) {
  const navigate = useNavigate();
  
  return (
    <div onClick={() => navigate(`/community/${item._id}`)} className="h-full flex flex-col gap-4 bg-white p-4 box-border rounded-lg drop-shadow-md cursor-pointer">
      <div className="flex gap-2">
        <img src={item.user.profile} className="rounded-full border-gray-400 border-2 w-12 h-12" />
        <div className="grow flex gap-2 items-center">
          <div className="grow">
            <h1 className="text-lg font-bold">{item.user?.name}</h1>
            <p className="text-sky-400 text-sm font-semibold">조회수 {item.views}</p>
          </div>
          {item.title && <img className="w-12 h-12 rounded-full bg-sky-200 p-1" src={`/${item.title}.svg`} alt="weatherIcon" />}
        </div>
      </div>
      <hr className="border-slate-800"/>
      <div className="grow flex flex-col gap-2">
        {item.image ? <img className="w-full h-2/3" src={`${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.image}`} alt="image" />: <div className="w-full h-2/3"></div> }
        <div className="grow bg-gray-100 rounded-lg p-2 box-border">{item.content}</div>
      </div>
    </div>
  )
}

export default UserBoard