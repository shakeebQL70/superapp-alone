import { create } from "zustand";
import {
  TProjectActions,
  TProjectState,
  TProjectStore,
  TUpdateProject,
} from "./types";
import { axios, endPoints } from "../../service/service";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

const initialState: TProjectState = {
  message: null,
  data: [],
  dataById: {},
  dataLoading: false,
  projectDDList: [],
  isLoading: false,
  updating: false,
  error: null,
  updateError: null,
  openEditModal: false
};

const projectStore = create<TProjectStore>()(
  immer(
    devtools(
      (set, get) => ({
        ...initialState,
        getData: async () => {
          try {
            set(() => ({ isLoading: true }));
            const res = await axios.getMethod(endPoints.project);
            const data = Array.isArray(res?.data) ? res.data : []
            set(() => ({ isLoading: false, data }));
          } catch (error: any) {
            console.log("error while getting project data", error);
            set(() => ({ isLoading: false, data:[], error: error?.message }));
          }
        },
        getDataById: async (id: number) => {
          try {
            set(() => ({ dataLoading: true }));
            const res = await axios.getMethod(`${endPoints.project}/${id}`);
            const data = Array.isArray(res?.data) ? res.data : []
            set(() => ({ dataLoading: false, dataById: data }));
          } catch (error: any) {
            console.log("error while getting project data", error);
            set(() => ({ dataLoading: false }));
          }
        },
        setOpenEditModal: (value: boolean) => {
          set(() => ({openEditModal: value}))
        },
        getProjectsDDList: async () => {
          try {
            set(() => ({ isLoading: true }));
            const res = await axios.getMethod(endPoints.project);
            set(
              () => ({
                isLoading: false,
                projectDDList:
                  res?.data?.map((item: any) => {
                    return {
                      label: item.name,
                      id: item.id,
                    };
                  }) || [],
              }),
              false,
              {
                type: "fetch/project",
              }
            );
          } catch (error: any) {
            console.log("error while getting project data", error);
            set(() => ({ isLoading: false, error: error?.message }));
          }
        },
        updateData: async (body: TUpdateProject, projectId: number) => {
          try {
            set(() => ({ updating: true }));
            const res = await axios.putMethod(
              `${endPoints.project}/${projectId}`,
              body
            );
            set(() => ({ updating: false, openEditModal: false }))
          } catch (error: any) {
            console.log("error while updating project", error);
            set(() => ({ updating: false, updateError: error?.message }));
          }
        },
      }),
      {
        store: "ediqueStore", //  ! Your store name
        name: "edique", // ! Here you can specify your app name
      }
    )
  )
);

export default projectStore;
