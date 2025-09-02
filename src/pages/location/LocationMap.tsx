import React, { useEffect } from "react";

function LocationMap({
  latitude,
  longitude,
  locationName,
}: {
  latitude: number;
  longitude: number;
  locationName: string;
}) {
  // console.log(locationName);
  // const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;
  //   script.async = true;
  //   document.head.appendChild(script);

  //   script.onload = () => {
  //     if (!window.kakao || !window.kakao.maps) return;

  //     window.kakao.maps.load(() => {
  //       const mapContainer = document.getElementById("map");
  //       const mapOption = {
  //         center: new window.kakao.maps.LatLng(latitude, longitude),
  //         level: 3,
  //       };
  //       const map = new window.kakao.maps.Map(mapContainer, mapOption);

  //       const markerPosition = new window.kakao.maps.LatLng(
  //         latitude,
  //         longitude,
  //       );
  //       const marker = new window.kakao.maps.Marker({
  //         position: markerPosition,
  //       });
  //       marker.setMap(map);

  //       const iwContent = `<div>${locationName || "위치 정보 없음"}<a href="https://map.kakao.com/link/to/${locationName},${latitude},${longitude}" target="_blank">길찾기</a></div>`;
  //       const iwPosition = new window.kakao.maps.LatLng(latitude, longitude);
  //       const infowindow = new window.kakao.maps.InfoWindow({
  //         position: iwPosition,
  //         content: iwContent,
  //       });

  //       infowindow.open(map, marker);
  //     });
  //   };
  // }, [latitude, longitude, locationName]);

  useEffect(() => {
    //map
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    //마커 설정
    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
    //길찾기 설정
    const iwContent = `<div> ${locationName || "위치 정보 없음"}<a href="https://map.kakao.com/link/to/${locationName},${latitude},${longitude}"  target="_blank">길찾기</a></div>`;
    const iwPosition = new window.kakao.maps.LatLng(latitude, longitude);
    //연결
    const infowindow = new window.kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
    });

    infowindow.open(map, marker);
  }, [latitude, longitude, locationName]);

  return <div id="map" className="h-80 w-full rounded-lg"></div>;
}

export default LocationMap;
