import { create } from "zustand";

import { devtools } from "zustand/middleware";
import { ILabUsageState, ILabUsageStore } from "./types";
import { axios, endPoints } from "../../service/service";
import { immer } from "zustand/middleware/immer";
import { SUCCESS_CODE, isArrayResponse } from "../../utils/helper";
import { userStore } from "../Login/loginStore";

const initialState: ILabUsageState = {
  message: null,
  data: [],
  usages: [],
  isLoading: false,
  isSubmitting: false,
  error: null,
};

const selectedProject = userStore.getState().selectedProject;

const labUsageStore = create<ILabUsageStore>()(
  immer(
    devtools(
      (set, get) => ({
        ...initialState,
        getLabUsageList: async (
          category,
          limit,
          page,
          schoolId = "",
          section = "",
          fromDate = "",
          toDate = ""
        ) => {
          set(() => ({ isLoading: true }));
          const res = await axios.getMethod(
            `${endPoints.labUsage}?category=${category}&page=${page}&limit=${limit}&school_id=${schoolId}&section=${section}&from_date${fromDate}&to_date${toDate}&project_id=${selectedProject.id}`
          );
          if (res.status === SUCCESS_CODE) {
            console.log("res.data.results", res.data.results);
            set(
              () => ({
                isLoading: false,
                data: res.data,
                usages: isArrayResponse(res.data.results),
              }),
              false,
              {
                type: "fetch/lab-usage",
              }
            );
          } else {
            set(() => ({ isLoading: false, error: res.statusText }));
          }
        },
        createLabUsage: async (formData) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.postMethod(
              `${endPoints.labUsage}`,
              formData
            );
            set(() => ({ isSubmitting: false }), false, {
              type: "create/lab-usage",
            });
          } catch (error) {
            console.log("error while creating content feedback data", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
          }
        },
        updateLabUsage: async (formData, id) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.putMethod(
              `${endPoints.labUsage}/${id}`,
              formData
            );
            set(() => ({ isSubmitting: false }), false, {
              type: "update/content-feedback",
            });
          } catch (error) {
            console.log("error while creating content feedback data", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
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

export default labUsageStore;
