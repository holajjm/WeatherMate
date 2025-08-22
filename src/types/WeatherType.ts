//Weather Data Type
export interface WeatherImage {
  [key: string]: string;
  // Clear: string;
  // Clouds: string;
  // Rain: string;
  // Drizzle: string;
  // Thunderstorm: string;
  // Snow: string;
  // Haze: string;
  // Mist: string;
  // Smoke: string;
  // Dust: string;
  // overcastClouds: string;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface TemperatureInfo {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface WindInfo {
  deg: number;
  speed: number;
  gust?: number;
}

export interface BaseWeather {
  clouds: { all: number };
  dt: number;
  main: TemperatureInfo;
  visibility: number;
  weather: WeatherCondition[];
  wind: WindInfo;
}
export interface MainData extends BaseWeather {
  base: string;
  cod: number;
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  rain?: {
    "1h": number;
  };
}
export interface AllCityData extends BaseWeather {
  coord: { lat: number; lon: number };
  id: number;
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
}

export interface WeatherTime extends BaseWeather {
  dt_txt: string;
  pop: number;
  rain?: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
}

export interface TimeWeather {
  city: {
    coords: {
      lat: number;
      lon: number;
    };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  cod: string;
  list: WeatherTime[];
  message: number;
}
export interface Cities {
  [key: string]: string;
}
// export interface AllCityData {
//   clouds: { all: number };
//   coord: { lat: number; lon: number };
//   dt: number;
//   id: number;
//   main: {
//     feels_like: number;
//     grnd_level: number;
//     humidity: number;
//     pressure: number;
//     sea_level: number;
//     temp: number;
//     temp_max: number;
//     temp_min: number;
//   };
//   name: string;
//   sys: {
//     country: string;
//     sunrise: number;
//     sunset: number;
//     timezone: number;
//   };
//   visibility: number;
//   weather: [
//     {
//       id: number;
//       main: string;
//       description: string;
//       icon: string;
//     },
//   ];
//   wind: {
//     deg: number;
//     speed: number;
//   };
// }
// export interface WeatherTime {
//   clouds: { all: number };
//   dt: number;
//   dt_txt: string;
//   main: {
//     feels_like: number;
//     grnd_level: number;
//     humidity: number;
//     pressure: number;
//     sea_level: number;
//     temp: number;
//     temp_max: number;
//     temp_min: number;
//   };
//   pop: number;
//   rain?: {
//     "3h": number;
//   };
//   sys: {
//     pod: string;
//   };
//   visibility: number;
//   weather: [
//     {
//       id: number;
//       main: string;
//       description: string;
//       icon: string;
//     },
//   ];
//   wind: {
//     deg: number;
//     gust: number;
//     speed: number;
//   };
// }
