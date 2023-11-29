import { create } from "zustand";
import { TTeacherStates, TTeacherStore, TTeacherPayload } from "./types";
import { axios, endPoints } from "../../service/service";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { userStore } from "../Login/loginStore";
import { isArrayResponse } from "../../utils/helper";

const initialState: TTeacherStates = {
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

export const teacherStore = create<TTeacherStore, [["zustand/immer", never], ["zustand/devtools", never]]>(
  immer(
    devtools(
      (set: (fn: (state: TTeacherStates) => any) => void, get) => ({
        ...initialState,
        setOpenEditModal: (value: boolean) => {
          set(() => ({openEditModal: value}))
        },
        getList: async (page: string, limit: string) => {
          try {
            set(() => ({ isLoading: true }));
            const res = await axios.getMethod(
              `${endPoints.teacher}?page=${page || 1}&limit=${limit || 5}&project_id=${currentProject}`
            );
            set(() => ({ isLoading: false, list: res?.data || {} }));
          } catch (error: any) {
            set(() => ({ isLoading: false, list:{}, error: error?.message }));
            console.log("error while fetching teachers", error);
          }
        },
        getAll: async () => {
          try {
            set(() => ({ allLoading: true, allList:[] }));
            const res = await axios.getMethod(`${endPoints.teacher}?project_id=${currentProject}`);
            const data = isArrayResponse(res?.data)
            set(() => ({ allLoading: false, allList: data }));
          } catch (error: any) {
            set(() => ({ allLoading: false, allList:[], allError: error?.message }));
            console.log("error while fetching teachers", error);
          }
        },
        async createTeacher(body: TTeacherPayload) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.postMethod(endPoints.teacher, body);
            set(() => ({ actionLoading: false, message: res?.message, openEditModal: false }));
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message }));
            console.log("error while creating teacher", error);
          }
        },
        async updateTeacher(body: TTeacherPayload, id: number) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.putMethod(`${endPoints.teacher}/${id}`, body);
            set(() => ({ actionLoading: false, message: res?.message, openEditModal: false }));
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message }));
            console.log("error while creating teacher", error);
          }
        },
        async getDetails(id: string) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.getMethod(`${endPoints.teacher}/${id}`);
            set(() => ({ actionLoading: false, message: res?.message, details: res.data }));
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message, details: {} }));
            console.log('error while getting details', error)
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
