import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { $LOCAL_APPBAR_KEY } from "../contants";

type TStates = {
    isExpanded: boolean;
};

type TActions = {
    sideBarAction: (value?:boolean) => void;
};

type TAppBarStore = TStates & TActions;

export const appBarStore =  create(
    persist<TAppBarStore>(
       (set) => (
          {
             isExpanded: false,
             sideBarAction: (setTo?: boolean) =>
                set((state) => {
                   return {
                      isExpanded: setTo || !state.isExpanded,
                   };
                }),
          }
       ),
       {
          name: $LOCAL_APPBAR_KEY
       }
    
 ))
