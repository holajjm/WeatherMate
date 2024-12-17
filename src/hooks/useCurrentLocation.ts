import { useState, useEffect } from 'react';

// 현재위치를 경도와 위도를 반환해주는 customHooks
function useCurrentLocation() {
  interface Position {
    coords: {
      accuracy: number;
      altitude: number | null;
      altitudeAccuracy: number | null;
      heading: number | null;
      latitude: number;
      longitude: number;
      speed: number | null;
    };
    timestamp: number;
  }
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getLocation = async () => {
      try {
        const position:Position = await new Promise((resolve,reject) => {
          navigator.geolocation.getCurrentPosition(resolve,reject);
        });

        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      } catch (error: any) {
        setError(error.message);
      }
    };

    getLocation();
  }, []);

  return { latitude, longitude, error };
}

export default useCurrentLocation;
