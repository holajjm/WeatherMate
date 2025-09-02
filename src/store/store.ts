import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
      },
    }),
    {
      name: "location",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
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
  modalClose: () => set({ modal: false }),
}));
