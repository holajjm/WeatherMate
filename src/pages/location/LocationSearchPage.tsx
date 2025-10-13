import React, { useEffect, useRef, useState } from "react";

import Loading from "@components/layout/Loading";
import Button from "@components/layout/Button";
import { useCoordsStore } from "@store/store";

// 카카오 지도 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

interface PlaceInfo {
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  x: string;
  y: string;
  place_url: string;
}

function LocationSearchPage() {
  const latitude = useCoordsStore(state => state?.latitude);
  const longitude = useCoordsStore(state => state?.longitude);
  const mapRef = useRef<HTMLDivElement>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [map, setMap] = useState<any>(null);
  const [places, setPlaces] = useState<any>(null);
  const [infowindow, setInfowindow] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<PlaceInfo[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  console.log(searchResults);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 50; // 최대 5초 대기 (50 * 100ms)

    const initializeMap = () => {
      // 카카오 지도 API가 완전히 로드되었는지 확인
      if (
        window.kakao &&
        window.kakao.maps &&
        window.kakao.maps.services &&
        window.kakao.maps.services.Places &&
        mapRef.current
      ) {
        try {
          const mapOption = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 3
          };

          const newMap = new window.kakao.maps.Map(mapRef.current, mapOption);
          const newPlaces = new window.kakao.maps.services.Places();
          const newInfowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

          setMap(newMap);
          setPlaces(newPlaces);
          setInfowindow(newInfowindow);

          // 초기 검색 실행
          searchPlaces(newPlaces, newMap, newInfowindow, searchKeyword);
        } catch (error) {
          console.error("카카오 지도 초기화 중 오류 발생:", error);
        }
      } else if (retryCount < maxRetries) {
        // 카카오 지도 API가 아직 로드되지 않았다면 잠시 후 다시 시도
        retryCount++;
        setTimeout(initializeMap, 100);
      } else {
        console.error("카카오 지도 API 로드 실패: 최대 재시도 횟수 초과");
      }
    };

    initializeMap();
  }, []);

  const searchPlaces = (
    placesService: any,
    mapInstance: any,
    infowindowInstance: any,
    keyword: string,
    page: number = 1,
    append: boolean = false
  ) => {
    if (!placesService || !mapInstance || !infowindowInstance) return;

    setIsLoading(true);

    // 첫 페이지가 아닌 경우 기존 마커 제거하지 않음
    if (page === 1) {
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);
      setSearchResults([]);
    }

    const placesSearchCB = (data: any, status: any, paginationInfo: any) => {
      setIsLoading(false);

      if (status === window.kakao.maps.services.Status.OK) {
        // 검색 결과를 상태에 저장 (첫 페이지면 교체, 아니면 추가)
        if (append) {
          setSearchResults(prev => [...prev, ...data]);
        } else {
          setSearchResults(data);
        }

        setPagination(paginationInfo);

        const bounds = new window.kakao.maps.LatLngBounds();
        const newMarkers: any[] = [];

        for (let i = 0; i < data.length; i++) {
          const marker = displayMarker(
            data[i],
            mapInstance,
            infowindowInstance
          );
          newMarkers.push(marker);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 첫 페이지가 아닌 경우 기존 마커에 추가
        if (page === 1) {
          setMarkers(newMarkers);
        } else {
          setMarkers(prev => [...prev, ...newMarkers]);
        }

        // 첫 페이지일 때만 지도 범위 조정
        if (page === 1) {
          mapInstance.setBounds(bounds);
        }
      }
    };

    placesService.keywordSearch(keyword, placesSearchCB, {
      page: page,
      size: 5 // 5개씩 호출
    });
  };

  const displayMarker = (
    place: any,
    mapInstance: any,
    infowindowInstance: any
  ) => {
    const marker = new window.kakao.maps.Marker({
      map: mapInstance,
      position: new window.kakao.maps.LatLng(place.y, place.x)
    });

    window.kakao.maps.event.addListener(marker, "click", function () {
      infowindowInstance.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>"
      );
      infowindowInstance.open(mapInstance, marker);
    });

    return marker;
  };

  const handleSearch = () => {
    if (places && map && infowindow) {
      setCurrentPage(1);
      searchPlaces(places, map, infowindow, searchKeyword, 1, false);
    }
  };

  const handleLoadMore = () => {
    if (places && map && infowindow && pagination && pagination.hasNextPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      searchPlaces(places, map, infowindow, searchKeyword, nextPage, true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePlaceClick = (place: PlaceInfo) => {
    if (map && infowindow) {
      // 해당 위치로 지도 이동
      const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
      map.setCenter(moveLatLon);
      map.setLevel(3);

      // 해당 위치의 마커 찾기
      const targetMarker = markers.find(marker => {
        const position = marker.getPosition();
        return (
          position.getLat() === parseFloat(place.y) &&
          position.getLng() === parseFloat(place.x)
        );
      });

      if (targetMarker) {
        // 인포윈도우 표시
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, targetMarker);
      }
    }
  };

  return (
    <div className="m-auto flex h-screen min-w-[320px] max-w-[600px] flex-col gap-4 overflow-y-scroll bg-slate-50 scrollbar-hide">
      {/* 헤더 */}
      <div className="relative flex h-12 items-center justify-center bg-slate-50">
        <div className="flex w-full items-center justify-center">
          <svg
            className="absolute left-4 top-1/3 h-5 w-5 cursor-pointer hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            onClick={() => window.history.back()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <h1 className="text-subtitle font-bold text-toss-black">장소 검색</h1>
        </div>
      </div>

      {/* 검색창 */}
      <div className="flex gap-2 px-4">
        <input
          type="text"
          value={searchKeyword}
          onChange={e => setSearchKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="검색할 장소를 입력하세요"
          className="w-full rounded-button border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        <Button
          text="검색"
          textColor="white"
          bgColor="blue"
          width="20"
          height="10"
          onClick={handleSearch}
          label="장소 검색"
        ></Button>
        <Button
          text="초기화"
          textColor="white"
          bgColor="gray"
          width="20"
          height="10"
          onClick={() => setSearchKeyword("")}
          label="검색 초기화"
        ></Button>
      </div>

      {/* 검색 결과 목록 */}
      {searchResults.length > 0 && (
        <div className="flex flex-col gap-2 px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-toss-gray">
              검색 결과({searchResults.length})
            </h2>
            {pagination && pagination.hasNextPage && (
              <button
                className="cursor-pointer text-caption font-bold text-toss-gray transition-all duration-200 hover:scale-[1.03] hover:text-toss-blue"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? <Loading /> : "더 보기"}
              </button>
            )}
          </div>

          {/* 가로 스크롤 가능한 카드 목록 */}
          <div className="flex gap-3 overflow-x-scroll scrollbar-hide">
            {searchResults.map((place, index) => (
              <div
                key={index}
                onClick={() => handlePlaceClick(place)}
                className="min-w-[200px] cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-colors hover:bg-gray-50 hover:shadow-md"
              >
                <div className="flex h-full flex-col items-center justify-between">
                  <div className="flex w-full flex-col gap-1">
                    <h3 className="line-clamp-2 text-sm font-semibold text-toss-black">
                      {place.place_name}
                    </h3>
                    <p className="line-clamp-2 text-caption text-toss-gray">
                      {place.road_address_name || place.address_name}
                    </p>
                  </div>
                  <div className="ml-auto cursor-pointer hover:text-toss-blue">
                    <p className="flex items-center justify-center text-caption text-toss-gray hover:text-toss-blue">
                      지도
                      <svg
                        className="h-3 w-3 text-toss-gray hover:text-toss-blue"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 지도 */}
      <div className="flex flex-col gap-2 px-4">
        <h2 className="text-subtitle font-semibold text-toss-gray">지도</h2>
        <div
          ref={mapRef}
          className="h-96 w-full rounded-lg border border-gray-300"
          style={{ minHeight: "400px" }}
        />
      </div>
    </div>
  );
}

export default LocationSearchPage;
