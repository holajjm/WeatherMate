//Weather Data Type
export interface WeatherImage {
  Clear: string;
  Clouds: string;
  Rain: string;
  Drizzle: string;
  Thunderstorm: string;
  Snow: string;
  Haze: string;
  Mist: string;
  Smoke: string;
  Dust: string;
  overcastClouds: string;
}
export interface AllCityData {
  clouds: { all: number };
  coord: { lat: number; lon: number };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  visibility: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  wind: {
    deg: number;
    speed: number;
  };
}
