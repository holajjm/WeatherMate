import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "@hooks/useCustomAxios.mts";
import { CommunityData } from "type";

function CommunityPopularItem() {
  const navigate = useNavigate();
  const axios = useCustomAxios();
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("/posts", {
        params: {
          type: "community",
        },
      });
    },
  });
  // console.log(data?.data.item);

  const itemViews =
    data &&
    data?.data?.item
      .sort((a: CommunityData, b: CommunityData) => b.views - a.views)
      .map((item: CommunityData) => (
        <div
          key={item._id}
          className="text-nowrap text-center cursor-pointer"
          onClick={() => navigate(`/community/${item._id}`)}
        >
          <div className="border-4 border-blue-200 box-border rounded-full w-24 h-24 hover:border-blue-400 duration-200">
            <img
              className="w-full h-full rounded-full"
              src={
                item.image
                  ? `${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.image}`
                  : `./clothes-m-1.svg`
              }
              alt="image"
            />
          </div>
          <p className="font-UhBeeKangJa font-bold">{item.user?.name}</p>
        </div>
      ));

  return (
    <div className="overflow-x-scroll scrollbar-hide flex gap-2 py-2">
      {itemViews}
    </div>
  );
}

export default CommunityPopularItem;
