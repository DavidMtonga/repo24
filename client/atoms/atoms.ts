import { atom } from "recoil";


export const isAuthenticatedAtom = atom({
  key: "isAuthenticatedState",
  default: false,
});
