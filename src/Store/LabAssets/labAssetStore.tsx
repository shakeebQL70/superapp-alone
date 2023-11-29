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
  assetDetail: [],
  assetAllDetail: null,
  allDetailsList: [],
  detailsList: null,
};

const selectedProject = userStore.getState().selectedProject;
const currentProject = selectedProject.id;

export const labAssetStore = create<
  TStore,
  [["zustand/immer", never], ["zustand/devtools", never]]
>(
  immer(
    devtools(
      (set: (fn: (state: TState) => any) => void) => ({
        ...initialState,
        setOpenEditModal: (value: boolean) => {
          set(() => ({ openEditModal: value }));
        },
        getList: async (page: string, limit: string) => {
          try {
            set(() => ({ isLoading: true, list: {} }));
            const res = await axios.getMethod(
              `${endPoints.labAsset}?page=${page || 1}&limit=${
                limit || 5
              }&project_id=${currentProject}`
            );
            set(() => ({ isLoading: false, list: res?.data || {} }));
          } catch (error: any) {
            set(() => ({ isLoading: false, error: error?.message, list: {} }));
            console.log("error while fetching student's list", error);
          }
        },
        getDetailsList: async (page: string, limit: string) => {
          try {
            set(() => ({ isLoading: true, detailsList: {} }));
            const res = await axios.getMethod(
              `${endPoints.studentDetails}?page=${page || 1}&limit=${
                limit || 5
              }`
            );
            set(() => ({ isLoading: false, detailsList: res?.data || {} }));
          } catch (error: any) {
            set(() => ({ isLoading: false, detailsList: {} }));
            console.log("error while fetching labAsset's list", error);
          }
        },
        getAll: async () => {
          try {
            set(() => ({ allLoading: true }));
            const res = await axios.getMethod(
              `${endPoints.labAsset}?project_id=${currentProject}`
            );
            const data = isArrayResponse(res?.data)
            set(() => ({ allLoading: false, allList: data }));
          } catch (error: any) {
            set(() => ({ allLoading: false, allError: error?.message, allList: [] }));
            console.log("error while fetching all labasset list", error);
          }
        },
        getAllDetails: async () => {
          try {
            set(() => ({ allLoading: true }));
            const res = await axios.getMethod(`${endPoints.studentDetails}`);
            const data = isArrayResponse(res?.data)
            set(() => ({ allLoading: false, allDetailsList: data }));
          } catch (error: any) {
            set(() => ({ allLoading: false, allDetailsList: [] }));
            console.log("error while fetching all labAsset list", error);
          }
        },
        async createAsset(body: TPayload) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.postMethod(`${endPoints.labAsset}`, {
              ...body,
              project_id: currentProject,
            });
            set(() => ({ actionLoading: false, message: res?.message }));
            if (res?.success) {
              set(() => ({ openEditModal: false }));
            }
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message }));
            console.log("error while creating labAsset list", error);
          }
        },
        async updateAsset(body: TPayload, id: number) {
          try {
            set(() => ({ actionLoading: true, message: null }));
            const res = await axios.putMethod(
              `${endPoints.labAsset}/${id}`,
              body
            );
            set(() => ({ actionLoading: false, message: res?.message }));
            if (res?.success) {
              set(() => ({ openEditModal: false }));
            }
          } catch (error: any) {
            set(() => ({ actionLoading: false, actionError: error?.message }));
            console.log("error while updating labAsset list", error);
          }
        },
        async getDetails(id: string) {
          try {
            set(() => ({ actionLoading: true, message: null, details: {} }));
            const res = await axios.getMethod(`${endPoints.labAsset}/${id}`);
            set(() => ({
              actionLoading: false,
              message: res?.message,
              details: res.data,
            }));
          } catch (error: any) {
            set(() => ({
              actionLoading: false,
              actionError: error?.message,
              details: {},
            }));
            console.log("error while fetching labAsset list details", error);
          }
        },
        async getAssetById(id: string) {
          try {
            const res = await axios.getMethod(`${endPoints.asset}/${id}`);
            if (res.status === 1000) {
              set(() => ({
                assetDetail: [
                  {
                    id: res?.data?.id,
                    label: res?.data?.item_serial_no,
                    value: res?.data?.id,
                  },
                ],
                assetAllDetail: res?.data,
              }));
            } else {
              set(() => ({
                assetDetail: [],
              }));
            }
          } catch (error: any) {
            set(() => ({
              assetDetail: []
            }));
            console.log("error while fetching asset detail", error);
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
