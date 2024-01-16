import { atom } from "recoil";


export const isAuthenticatedAtom = atom<boolean>({
  key: "isAuthenticatedState",
  default: false,
});
