import { create } from "zustand";
import { TVisitorActions, TVisitorPayload, TVisitorStore, TVisitorState } from "./types";
import { axios, endPoints } from "../../service/service";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { userStore } from "../Login/loginStore";
import { isArrayResponse } from "../../utils/helper";

const initialState: TVisitorState = {
  isLoading: false,
  allLoading: false,
  allError:'',
  list: {},
  allList: [],
  error: null,
  message: null,
  actionError: null,
  actionMessage: null,
  actionLoading: false,
  details: {},
  openEditModal: false
};

const selectedProject = userStore.getState().selectedProject
const currentProject = selectedProject.id

export const visitorStore = create<TVisitorStore, [["zustand/immer", never], ["zustand/devtools", never]]>(
  immer(
    devtools(
      (set: (fn: (state: TVisitorState) => any) => void) => ({
        ...initialState,
        setOpenEditModal: (value: boolean) => {
          set(() => ({openEditModal: value}))
        },
        getList: async (page: string, limit: string) => {
          try {
            set(() => ({ isLoading: true, list: {} }));
            const res = await axios.getMethod(
              `${endPoints.visitors}?page=${page || 1}&limit=${limit || 5}&project_id=${currentProject}`
            );
            set(() => ({ isLoading: false, list: res?.data || {} }));
          } catch (error: any) {
            set(() => ({ isLoading: false, list:{}, error: error?.message }));
            console.log("error while fetching visitors", error);
          }
        },
        getAll: async () => {
          try {
            set(() => ({ allLoading: true }));
            const res = await axios.getMethod(`${endPoints.visitors}?project_id=${currentProject}`);
            const data = isArrayResponse(res?.data)
            set(() => ({ allLoading: false, allList: data }));
          } catch (error: any) {
            set(() => ({ allLoading: false, allList:[], allError: error?.message }));
            console.log("error while fetching visitors", error);
          }
        },
        async createVisitor(body: TVisitorPayload) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.postMethod(`${endPoints.visitors}`, body);
            set(() => ({ actionLoading: false, message: res?.message }));
            if(res?.success){
              set(() => ({openEditModal: false}))
            }
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message }));
            console.log("error while creating visitors", error);
          }
        },
        async updateVisitor(body: TVisitorPayload, id: number) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.putMethod(`${endPoints.visitors}/${id}`, body);
            set(() => ({ actionLoading: false, message: res?.message }));
            if(res?.success){
              set(() => ({openEditModal: false}))
            }
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message }));
            console.log("error while creating visitors", error);
          }
        },
        async getDetails(id: string) {
          try {
            set(() => ({ actionLoading: true, message: null, details: {} }));
            const res = await axios.getMethod(`${endPoints.visitors}/${id}`);
            set(() => ({ actionLoading: false, message: res?.message, details: res.data }));
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message, details: {} }));
            console.log('error while fetching visitors details', error)
          }
        }
      }),
      {
        store: "ediqueStore",
        name: "edique",
      }
    )
  )
);
