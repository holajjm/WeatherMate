import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "saveUser",
  storage: sessionStorage,
});

export const memberState = atom({
  key: "useState",
  default: {
    id: "",
    name: "",
    phone: "",
    email: "",
    password: "",
  },
  effects: [persistAtom],
});

export const LocationState = atom({
  key: "LocationState",
  default: { lat: 0, lon: 0}
})

export const userWeatherState = atom({
  key: "userWeatherState",
  default: null,
});

export const selectedLocationState = atom({
  key: "selectedLocationState",
  default: { lat: null, lon: null },
});

export const likeState = atom({
  key: "likeState",
  default: 0,
  effects: [persistAtom],
});

//1731559734
