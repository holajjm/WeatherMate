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

//1731559734