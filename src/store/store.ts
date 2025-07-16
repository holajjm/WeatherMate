import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
      setCoords: ({ latitude, longitude }:Coords) => {
        set(() => ({ latitude, longitude }));
      },
    }),
    {
      name: "location",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
