import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useCustomAxios from "@hooks/useCustomAxios";
import CommunityPopularSkeleton from "@components/skeleton/CommunityPopularSkeleton";
import type { CommunityData } from "types/CommunityType";
import { ModalPortal } from "@hooks/modalPortal";
import CommunityModal from "@components/modal/CommunityModal";

function CommunityPopularItem() {
  const [selectedItem, setSelectedItem] = useState<CommunityData | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = (item: CommunityData) => {
    setSelectedItem(item);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

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

  const itemViews = data?.data?.item
    .sort((a: CommunityData, b: CommunityData) => b.views - a.views)
    .map((item: CommunityData) => (
      <div
        key={item._id}
        className="text-nowrap text-center cursor-pointer"
        onClick={() => handleOpen(item)}
      >
        <div className="border-4 border-blue-200 box-border rounded-full w-20 h-20 hover:border-blue-400 duration-200">
          <img
            className="w-full h-full rounded-full"
            src={
              item.image
                ? `${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item?.image}`
                : `./ReadyForImage.webp`
            }
            alt="image"
            {...{ fetchpriority: "high" }}
            decoding="async"
          />
        </div>
        <p className="text-xs font-bold">{item.user?.name}</p>
      </div>
    ));

  return (
    <div className="overflow-x-scroll scrollbar-hide flex gap-2 py-2">
      {data ? (
        <>
          {isOpen && (
            <ModalPortal>
              <CommunityModal handleClose={handleClose} item={selectedItem} />
            </ModalPortal>
          )}
          {itemViews}
        </>
      ) : (
        <CommunityPopularSkeleton />
      )}
    </div>
  );
}

export default CommunityPopularItem;
