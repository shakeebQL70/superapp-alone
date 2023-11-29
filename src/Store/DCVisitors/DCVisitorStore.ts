import { create } from "zustand";
import { TDCVisitorPayload, TDCVisitorStore, TDCVisitorState } from "./types";
import { axios, endPoints } from "../../service/service";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { userStore } from "../Login/loginStore";
import { isArrayResponse } from "../../utils/helper";

const initialState: TDCVisitorState = {
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

export const dcVisitorStore = create<TDCVisitorStore, [["zustand/immer", never], ["zustand/devtools", never]]>(
  immer(
    devtools(
      (set: (fn: (state: TDCVisitorState) => any) => void) => ({
        ...initialState,
        setOpenEditModal: (value: boolean) => {
          set(() => ({openEditModal: value, details: {}}))
        },
        getList: async (page: string, limit: string) => {
          try {
            set(() => ({ isLoading: true, list: {} }));
            const res = await axios.getMethod(
              `${endPoints.dcVisitor}?page=${page || 1}&limit=${limit || 5}&project_id=${currentProject}`
            );
            set(() => ({ isLoading: false, list: res?.data || {} }));
          } catch (error: any) {
            set(() => ({ isLoading: false, error: error?.message, list: {} }));
            console.log("error while fetching DC visitors", error);
          }
        },
        getAll: async () => {
          try {
            set(() => ({ allLoading: true }));
            const res = await axios.getMethod(`${endPoints.dcVisitor}?project_id=${currentProject}`);
            const data = isArrayResponse(res?.data)
            set(() => ({ allLoading: false, allList: data }));
          } catch (error: any) {
            set(() => ({ allLoading: false, allError: error?.message, allList: [] }));
            console.log("error while fetching DC visitors", error);
          }
        },
        async createDCVisitor(body: TDCVisitorPayload) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.postMethod(`${endPoints.dcVisitor}`, body);
            set(() => ({ actionLoading: false, message: res?.message }));
            if(res?.success){
              set(() => ({openEditModal: false, details: {}}))
            }
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message }));
            console.log("error while creating DC visitors", error);
          }
        },
        async updateDCVisitor(body: TDCVisitorPayload, id: number) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.putMethod(`${endPoints.dcVisitor}/${id}`, body);
            set(() => ({ actionLoading: false, message: res?.message}));
            if(res?.success){
              set(() => ({openEditModal: false, details: {}}))
            }
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message }));
            console.log("error while creating DC visitors", error);
          }
        },
        async getDetails(id: string) {
          try {
            set(() => ({ actionLoading: true, message: null, details: {} }));
            const res = await axios.getMethod(`${endPoints.dcVisitor}/${id}`);
            set(() => ({ actionLoading: false, message: res?.message, details: res.data }));
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message, details: {} }));
            console.log('error while fetching DC visitors details', error)
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
