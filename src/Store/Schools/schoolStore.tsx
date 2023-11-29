import { create } from "zustand";
import {
  TSchoolActions,
  TSchoolPayload,
  TSchoolState,
  TSchoolStore,
} from "./types";
import { axios, endPoints } from "../../service/service";
import { userStore } from "../Login/loginStore";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

const initialState: TSchoolState = {
  isLoading: false,
  allLoading: false,
  allError: "",
  list: {},
  allList: [],
  error: null,
  message: null,
  actionError: null,
  actionMessage: null,
  actionLoading: false,
  details: {},
  openEditModal: false,
  dropdownList: [],
};

const selectedProject = userStore.getState().selectedProject;
const currentProject = selectedProject.id;

export const schoolStore = create<
  TSchoolStore,
  [["zustand/immer", never], ["zustand/devtools", never]]
>(
  immer(
    devtools(
      (set: (fn: (state: TSchoolState) => any) => void) => ({
        ...initialState,
        setOpenEditModal: (value: boolean) => {
          set(() => ({ openEditModal: value }));
        },
        getList: async (page: string, limit: string) => {
          try {
            set(() => ({ isLoading: true, list: {} }));
            const res = await axios.getMethod(
              `${endPoints.schools}/${currentProject}?page=${page || 1}&limit=${
                limit || 5
              }`
            );
            set(() => ({ isLoading: false, list: res?.data || {} }));
          } catch (error: any) {
            set(() => ({ isLoading: false, error: error?.message, list: {} }));
            console.log("error while fetching schools", error);
          }
        },
        getAll: async () => {
          try {
            set(() => ({ allLoading: true }));
            const res = await axios.getMethod(
              `${endPoints.schools}/${currentProject}`
            );
            set(() => ({
              allLoading: false,
              allList: res?.data || [],
              dropdownList:
                res?.data?.map((item: any) => {
                  return {
                    id: item.id,
                    label: item.name,
                    value: item.id,
                    // school_code: "BCCL",
                    // udise_code: "UDISCE",
                    // district: "Anantapur",
                    // block: "dafafaf",
                    // state: "Andhra Pradesh",
                    // city: "",
                    // school_type: "elementary",
                    // pincode: 92,
                  };
                }) || [],
            }));
          } catch (error: any) {
            set(() => ({ allLoading: false, allError: error?.message }));
            console.log("error while fetching schools", error);
          }
        },
        async createSchool(body: TSchoolPayload) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.postMethod(`${endPoints.schoolMono}`, {
              ...body,
              project_id: currentProject,
            });
            set(() => ({ actionLoading: false, message: res?.message }));
            if (res?.success) {
              set(() => ({ openEditModal: false }));
            }
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message }));
            console.log("error while creating schools", error);
          }
        },
        async updateSchool(body: TSchoolPayload, id: number) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.putMethod(`${endPoints.schoolMono}/${id}`, {
              ...body,
              project_id: currentProject,
            });
            set(() => ({ actionLoading: false, message: res?.message }));
            if (res?.success) {
              set(() => ({ openEditModal: false }));
            }
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message }));
            console.log("error while creating schools", error);
          }
        },
        async getDetails(id: string) {
          try {
            set(() => ({ actionLoading: true, message: null, details: {} }));
            const res = await axios.getMethod(`${endPoints.schoolMono}/${id}`);
            if (res.status === 1000) {
              set(() => ({
                actionLoading: false,
                message: res?.message,
                details: res.data,
              }));
            }
          } catch (error: any) {
            set(() => ({
              actionLoading: false,
              actionError: error?.message,
              details: {},
            }));
            console.log("error while fetching school details", error);
          }
        },
      }),
      {
        store: "ediqueStore",
        name: "edique",
      }
    )
  )
);
