import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ENV } from "@constants/env";
import CommunityPopularSkeleton from "@components/skeleton/CommunityPopularSkeleton";
import CommunityModal from "@components/modal/CommunityModal";
import useCustomAxios from "@hooks/useCustomAxios";
import { ModalPortal } from "@hooks/modalPortal";

import type { CommunityData } from "types/CommunityType";

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
        className="cursor-pointer text-nowrap text-center"
        onClick={() => handleOpen(item)}
      >
        <div className="box-border h-20 w-20 rounded-full border-4 border-toss-lightblue duration-150 hover:border-toss-blue">
          <img
            className="h-full w-full rounded-full"
            src={
              item.image
                ? `${ENV.API_SERVER}/files/07-WeatherMate/${item?.image}`
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
    <div className="flex gap-2 overflow-x-scroll py-2 scrollbar-hide">
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
