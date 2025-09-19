import React, { useEffect, useRef, useState } from "react";

import Loading from "@components/layout/Loading";
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

interface Category {
  id: string;
  name: string;
  order: number;
}

function LocationCategoryPage() {
  const latitude = useCoordsStore(state => state?.latitude);
  const longitude = useCoordsStore(state => state?.longitude);
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [places, setPlaces] = useState<any>(null);
  const [placeOverlay, setPlaceOverlay] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [currCategory, setCurrCategory] = useState<string>("");
  const [searchResults, setSearchResults] = useState<PlaceInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 카테고리 정의
  const categories: Category[] = [
    { id: "MT1", name: "마트", order: 1 },
    { id: "CS2", name: "편의점", order: 2 },
    { id: "SC4", name: "학교", order: 3 },
    { id: "PK6", name: "주차장", order: 4 },
    { id: "OL7", name: "주유소", order: 5 },
    { id: "BK9", name: "은행", order: 6 },
    { id: "CT1", name: "문화시설", order: 7 },
    { id: "AD5", name: "숙박", order: 8 },
    { id: "FD6", name: "음식점", order: 9 },
    { id: "CE7", name: "카페", order: 10 },
    { id: "HP8", name: "병원", order: 11 },
    { id: "PM9", name: "약국", order: 12 }
  ];

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 50;

    const initializeMap = () => {
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
            level: 5
          };

          const newMap = new window.kakao.maps.Map(mapRef.current, mapOption);
          const newPlaces = new window.kakao.maps.services.Places();
          const newPlaceOverlay = new window.kakao.maps.CustomOverlay({
            zIndex: 1
          });

          // 커스텀 오버레이의 컨텐츠 노드 생성
          const contentNode = document.createElement("div");
          contentNode.className = "relative w-full h-full";

          // 이벤트 핸들러 등록
          addEventHandle(
            contentNode,
            "mousedown",
            window.kakao.maps.event.preventMap
          );
          addEventHandle(
            contentNode,
            "touchstart",
            window.kakao.maps.event.preventMap
          );

          newPlaceOverlay.setContent(contentNode);

          setMap(newMap);
          setPlaces(newPlaces);
          setPlaceOverlay(newPlaceOverlay);

          // 지도에 idle 이벤트 등록
          window.kakao.maps.event.addListener(newMap, "idle", () => {
            if (currCategory) {
              searchPlaces();
            }
          });
        } catch (error) {
          console.error("카카오 지도 초기화 중 오류 발생:", error);
        }
      } else if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(initializeMap, 100);
      } else {
        console.error("카카오 지도 API 로드 실패: 최대 재시도 횟수 초과");
      }
    };

    initializeMap();
  }, [latitude, longitude]);

  // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
  const addEventHandle = (target: HTMLElement, type: string, callback: any) => {
    if (target.addEventListener) {
      target.addEventListener(type, callback);
    } else {
      (target as any).attachEvent("on" + type, callback);
    }
  };

  // 카테고리 검색을 요청하는 함수입니다
  const searchPlaces = () => {
    if (!currCategory || !places || !map || !placeOverlay) {
      return;
    }

    setIsLoading(true);

    // 커스텀 오버레이를 숨깁니다
    placeOverlay.setMap(null);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    places.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
  };

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  const placesSearchCB = (data: any, status: any, pagination: any) => {
    setIsLoading(false);

    if (status === window.kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
      setSearchResults(data);
      displayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      setSearchResults([]);
      console.log("검색 결과가 없습니다.");
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      setSearchResults([]);
      console.error("검색 중 오류가 발생했습니다.");
    }
  };

  // 지도에 마커를 표출하는 함수입니다
  const displayPlaces = (placesData: any[]) => {
    if (!map || !placeOverlay) return;

    // 현재 선택된 카테고리의 order 찾기
    const selectedCategory = categories.find(cat => cat.id === currCategory);
    const order = selectedCategory ? selectedCategory.order : 0;

    const newMarkers: any[] = [];

    for (let i = 0; i < placesData.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = addMarker(
        new window.kakao.maps.LatLng(placesData[i].y, placesData[i].x),
        order
      );

      // 마커와 검색결과 항목을 클릭 했을 때
      // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
      (function (marker, place) {
        window.kakao.maps.event.addListener(marker, "click", function () {
          displayPlaceInfo(place);
        });
      })(marker, placesData[i]);

      newMarkers.push(marker);
    }

    setMarkers(newMarkers);
  };

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  const addMarker = (position: any, order: number) => {
    if (!map) return null;

    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png";
    const imageSize = new window.kakao.maps.Size(27, 28);
    const imgOptions = {
      spriteSize: new window.kakao.maps.Size(72, 208),
      spriteOrigin: new window.kakao.maps.Point(46, order * 36),
      offset: new window.kakao.maps.Point(11, 28)
    };
    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions
    );
    const marker = new window.kakao.maps.Marker({
      position: position,
      image: markerImage
    });

    marker.setMap(map);
    return marker;
  };

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  const removeMarker = () => {
    markers.forEach(marker => {
      marker.setMap(null);
    });
    setMarkers([]);
  };

  // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
  const displayPlaceInfo = (place: any) => {
    if (!placeOverlay || !map) return;

    let content =
      '<div class="relative w-full rounded-md border border-gray-300 bg-white p-3 shadow-lg">' +
      '   <a class="block truncate text-sm font-medium text-gray-800 hover:text-blue-600 hover:underline" href="' +
      place.place_url +
      '" target="_blank" title="' +
      place.place_name +
      '">' +
      place.place_name +
      "</a>";

    if (place.road_address_name) {
      content +=
        '    <div class="mt-2 text-xs text-gray-600" title="' +
        place.road_address_name +
        '">' +
        place.road_address_name +
        "</div>" +
        '  <div class="text-xs text-gray-500" title="' +
        place.address_name +
        '">(지번 : ' +
        place.address_name +
        ")</div>";
    } else {
      content +=
        '    <div class="mt-2 text-xs text-gray-600" title="' +
        place.address_name +
        '">' +
        place.address_name +
        "</div>";
    }

    if (place.phone) {
      content +=
        '    <div class="mt-1 text-xs text-green-600">' +
        place.phone +
        "</div>";
    }

    content += "</div>";

    // contentNode 업데이트
    const contentNode = placeOverlay.getContent();
    if (contentNode) {
      contentNode.innerHTML = content;
    }

    placeOverlay.setPosition(new window.kakao.maps.LatLng(place.y, place.x));
    placeOverlay.setMap(map);
  };

  // 카테고리를 클릭했을 때 호출되는 함수입니다
  const handleCategoryClick = (categoryId: string) => {
    if (!placeOverlay) return;

    placeOverlay.setMap(null);

    if (currCategory === categoryId) {
      // 같은 카테고리를 다시 클릭하면 선택 해제
      setCurrCategory("");
      removeMarker();
      setSearchResults([]);
    } else {
      // 다른 카테고리 선택
      setCurrCategory(categoryId);
      searchPlaces();
    }
  };

  // 장소 클릭 핸들러
  const handlePlaceClick = (place: PlaceInfo) => {
    if (map && placeOverlay) {
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
        displayPlaceInfo(place);
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
          <h1 className="text-subtitle font-bold text-toss-black">
            카테고리 검색
          </h1>
        </div>
      </div>

      {/* 카테고리 버튼들 */}
      <div className="flex flex-col gap-2 px-4">
        <h2 className="text-lg font-semibold text-toss-gray">카테고리 선택</h2>
        <div className="grid grid-cols-3 gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`font-caption rounded-button p-2 text-caption transition-colors ${
                currCategory === category.id
                  ? "bg-blue-500 text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 검색 결과 목록 */}
      {searchResults.length > 0 && (
        <div className="flex flex-col gap-2 px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-toss-gray">
              검색 결과 ({searchResults.length}개)
            </h2>
            {isLoading && <Loading />}
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

export default LocationCategoryPage;
