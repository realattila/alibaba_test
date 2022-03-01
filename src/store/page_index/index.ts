/* eslint-disable  */
import { atom } from "recoil";

export type regionsType = "Asia" | "Europe" | "Africa" | "Americas" | "Oceania";
export type stateType = {
  search: string;
  filter: regionsType | null;
};
const state = atom<stateType>({
  key: "userState",
  default: {
    search: "",
    filter: null,
  },
});

const PageIndexAtom = state;

export default PageIndexAtom;
