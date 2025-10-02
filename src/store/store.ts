import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 유저 정보 상태
interface User {
  _id: number;
  email: string;
  name: string;
  profile?: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}
interface UserData {
  user: User;
  setUser: (user: User) => void;
  resetUser: () => void;
}
const initialUser: User = {
  _id: 0,
  email: "",
  name: "",
  profile: "",
  token: {
    accessToken: "",
    refreshToken: ""
  }
};
export const useUserStore = create<UserData>()(
  persist(
    set => ({
      user: {
        _id: 0,
        email: "",
        name: "",
        profile: "",
        token: {
          accessToken: "",
          refreshToken: ""
        }
      },
      setUser: (user: User) => set(() => ({ user })),
      resetUser: () => set({ user: initialUser })
    }),
    { name: "user", storage: createJSONStorage(() => sessionStorage) }
  )
);

// 위치 정보 상태
interface Coords {
  latitude: number;
  longitude: number;
}
interface CoordsState extends Coords {
  setCoords: (coords: Coords) => void;
}
export const useCoordsStore = create<CoordsState>()(
  persist(
    set => ({
      latitude: 0,
      longitude: 0,
      setCoords: ({ latitude, longitude }: Coords) => {
        set(() => ({ latitude, longitude }));
      }
    }),
    {
      name: "location",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

// 모달 여닫힘 상태
interface ModalState {
  modal: boolean;
  modalOpen: () => void;
  modalClose: () => void;
}
export const useModalStore = create<ModalState>(set => ({
  modal: false,
  modalOpen: () => set({ modal: true }),
  modalClose: () => set({ modal: false })
}));

// 좋아요 목록 상태
interface Likes {
  likes: { realId: number; likeId: number }[];
  setLikes: (newItem: { realId: number; likeId: number }) => void;
}

export const useLikesStore = create<Likes>(set => ({
  likes: [],
  setLikes: newItem =>
    set(state => ({
      likes: state.likes.some(like => like.realId === newItem.realId)
        ? state.likes
        : [...state.likes, newItem]
    }))
}));
