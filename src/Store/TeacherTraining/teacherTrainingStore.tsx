import { create } from "zustand";
import { TPayload, TState, TStore } from "./types";
import { axios, endPoints } from "../../service/service";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { userStore } from "../Login/loginStore";
import { isArrayResponse } from "../../utils/helper";

const initialState: TState = {
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

export const trainingStore = create<TStore, [["zustand/immer", never], ["zustand/devtools", never]]>(
  immer(
    devtools(
      (set: (fn: (state: TState) => any) => void) => ({
        ...initialState,
        setOpenEditModal: (value: boolean) => {
          set(() => ({openEditModal: value}))
        },
        getList: async (page: string, limit: string) => {
          try {
            set(() => ({ isLoading: true, list: {} }));
            const res = await axios.getMethod(
              `${endPoints.training}?page=${page || 1}&limit=${limit || 5}&project_id=${currentProject}`
            );
            set(() => ({ isLoading: false, list: res?.data || {} }));
          } catch (error: any) {
            set(() => ({ isLoading: false, list:{}, error: error?.message }));
            console.log("error while fetching training's list", error);
          }
        },
        getAll: async () => {
          try {
            set(() => ({ allLoading: true }));
            const res = await axios.getMethod(`${endPoints.training}?project_id=${currentProject}`);
            const data = isArrayResponse(res?.data)
            set(() => ({ allLoading: false, allList: data }));
          } catch (error: any) {
            set(() => ({ allLoading: false, allList:[], allError: error?.message }));
            console.log("error while fetching all training list", error);
          }
        },
        async createTeacher(body: TPayload) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.postMethod(`${endPoints.training}`, {...body, project_id: currentProject});
            set(() => ({ actionLoading: false, message: res?.message }));
            if(res?.success){
              set(() => ({openEditModal: false}))
            }
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message }));
            console.log("error while creating training list", error);
          }
        },
        async updateTeacher(body: TPayload, id: number) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.putMethod(`${endPoints.training}/${id}`, body);
            set(() => ({ actionLoading: false, message: res?.message }));
            if(res?.success){
              set(() => ({openEditModal: false}))
            }
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message }));
            console.log("error while updating training list", error);
          }
        },
        async getDetails(id: string) {
          try {
            set(() => ({ actionLoading: true, message: null, details: {} }));
            const res = await axios.getMethod(`${endPoints.training}/${id}`);
            set(() => ({ actionLoading: false, message: res?.message, details: res.data }));
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message, details: {} }));
            console.log('error while fetching training list details', error)
          }
        }
      }),
      {
        store: "ediquetrainingStore",
        name: "ediqueTraining",
      }
    )
  )
);
