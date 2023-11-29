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
  detailsList: {},
  allList: [],
  allDetailsList: [],
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

export const studentListStore = create<TStore, [["zustand/immer", never], ["zustand/devtools", never]]>(
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
              `${endPoints.students}?page=${page || 1}&limit=${limit || 5}&project_id=${currentProject}`
            );
            set(() => ({ isLoading: false, list: res?.data || {} }));
          } catch (error: any) {
            set(() => ({ isLoading: false, error: error?.message }));
            console.log("error while fetching student's list", error);
          }
        },
        getDetailsList: async (page: string, limit: string) => {
          try {
            set(() => ({ isLoading: true, detailsList: {} }));
            const res = await axios.getMethod(
              `${endPoints.studentDetails}?page=${page || 1}&limit=${limit || 5}&project_id=${currentProject}`
            );
            set(() => ({ isLoading: false, detailsList: res?.data || {} }));
          } catch (error: any) {
            set(() => ({ isLoading: false}));
            console.log("error while fetching student detials list", error);
          }
        },
        getAll: async () => {
          try {
            set(() => ({ allLoading: true }));
            const res = await axios.getMethod(`${endPoints.students}?project_id=${currentProject}`);
            const data = isArrayResponse(res?.data)
            set(() => ({ allLoading: false, allList: data }));
          } catch (error: any) {
            set(() => ({ allLoading: false, allError: error?.message }));
            console.log("error while fetching all students list", error);
          }
        },
        getAllDetails: async () => {
          try {
            set(() => ({ allLoading: true }));
            const res = await axios.getMethod(`${endPoints.studentDetails}?project_id=${currentProject}`);
            const data = isArrayResponse(res?.data)
            set(() => ({ allLoading: false, allDetailsList: data }));
          } catch (error: any) {
            set(() => ({ allLoading: false, allDetailsList:[]}));
            console.log("error while fetching all students details", error);
          }
        },
        async createStudent(body: TPayload) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.postMethod(`${endPoints.students}`, body);
            set(() => ({ actionLoading: false, message: res?.message }));
            if(res?.success){
              set(() => ({openEditModal: false}))
            }
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message }));
            console.log("error while creating student list", error);
          }
        },
        async updateStudent(body: TPayload, id: number) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.putMethod(`${endPoints.students}/${id}`, body);
            set(() => ({ actionLoading: false, message: res?.message }));
            if(res?.success){
              set(() => ({openEditModal: false}))
            }
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message }));
            console.log("error while updating students list", error);
          }
        },
        async getDetails(id: string) {
          try {
            set(() => ({ actionLoading: true, message: null, details: {} }));
            const res = await axios.getMethod(`${endPoints.students}/${id}`);
            set(() => ({ actionLoading: false, message: res?.message, details: res.data }));
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message, details: {} }));
            console.log('error while fetching student list details', error)
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
