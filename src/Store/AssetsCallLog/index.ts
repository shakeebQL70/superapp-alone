import { create } from "zustand";

import { devtools } from "zustand/middleware";
import { IAssetsCallLogStore, IAssetsCallLogState } from "./types";
import { axios, endPoints } from "../../service/service";
import { immer } from "zustand/middleware/immer";
import { userStore } from "../Login/loginStore";
import { SUCCESS_CODE, isArrayResponse } from "../../utils/helper";

const initialState: IAssetsCallLogState = {
  message: null,
  data: [],
  serviceDesks: [],
  isLoading: false,
  isSubmitting: false,
  complaintDetails: null,
  error: null,
  allFAQs: [],
  faqDetails: null,
};

const selectedProject = userStore.getState().selectedProject;
const projectId = selectedProject.id;

const assetCallLogStore = create<IAssetsCallLogStore>()(
  immer(
    devtools(
      (set, get) => ({
        ...initialState,
        getServiceDesk: async (limit, page) => {
          set(() => ({ isLoading: true }));
          const res = await axios.getMethod(
            `${endPoints.serviceDesk}?project_id=${projectId}&page=${page}&limit=${limit}`
          );

          if (res.status === SUCCESS_CODE) {
            console.log("res.data.results", res.data.results);
            set(
              () => ({
                isLoading: false,
                data: res.data,
                serviceDesks: isArrayResponse(res.data.results),
              }),
              false,
              {
                type: "fetch/service-desk",
              }
            );
          } else {
            set(() => ({ isLoading: false, error: res.statusText }));
          }
        },
        getServiceDeskDetailsById: async (id: string) => {
          set(() => ({ isLoading: true }));
          const res = await axios.getMethod(`${endPoints.serviceDesk}/${id}`);
          if (res.status === SUCCESS_CODE) {
            set(
              () => ({
                isLoading: false,
                complaintDetails: res?.data,
              }),
              false,
              {
                type: "fetch/service-desk-details",
              }
            );
          } else {
            console.log(
              "error while fetching asset complaint detail",
              res.statusText
            );
            set(() => ({ isLoading: false, error: res.statusText }));
          }
        },
        createAssetsCallLog: async (formData) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.postMethod(endPoints.serviceDesk, formData);
            set(() => ({ isSubmitting: false }), false, {
              type: "create/asset-log",
            });
          } catch (error) {
            console.log("error while creating asset", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
          }
        },
        updateAssetsCallLog: async (formData, id) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.putMethod(
              `${endPoints.serviceDesk}/${id}`,
              formData
            );
            set(() => ({ isSubmitting: false }), false, {
              type: "update/service-desk",
            });
          } catch (error) {
            console.log("error while creating content feedback data", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
          }
        },
        async getAllFAQ(limit, page) {
          set(() => ({ isLoading: true }));
          const res = await axios.getMethod(
            `${endPoints.serviceDesk}/${endPoints.faq}?&page=${page}&limit=${limit}`
          );
          if (res.status === SUCCESS_CODE) {
            console.log("res.data.results", res.data.results);
            set(
              () => ({
                isLoading: false,
                data: res.data,
                allFAQs: isArrayResponse(res.data),
              }),
              false,
              {
                type: "fetch/service-desk-faq",
              }
            );
          } else {
            set(() => ({ isLoading: false, error: res.statusText }));
          }
        },

        async getFAQById(id) {
          // ! this getFAQById need to refactor
          try {
            set(() => ({ isLoading: true }));
            const res = await axios.getMethod(
              `${endPoints.serviceDesk}/${endPoints.faq}/${id}`
            );
            set(
              () => ({
                isLoading: false,
                complaintDetails: res.status === 1000 ? res?.data : null,
              }),
              false,
              {
                type: "fetch/service-desk-faq-details",
              }
            );
          } catch (error) {
            console.log("error while fetching asset complaint detail", error);
            set(() => ({ isLoading: false, error }));
          }
        },
        createFAQ: async (formData) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.postMethod(
              `${endPoints.serviceDesk}/${endPoints.faq}`,
              formData
            );
            set(() => ({ isSubmitting: false }), false, {
              type: "create/service-desk-faq",
            });
          } catch (error) {
            console.log("error while creating asset", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
          }
        },
        updateFAQ: async (formData, id) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.putMethod(
              `${endPoints.serviceDesk}/${endPoints.faq}/${id}`,
              formData
            );
            set(() => ({ isSubmitting: false }), false, {
              type: "update/service-desk-faq",
            });
          } catch (error) {
            console.log("error while creating asset", error);
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

export default assetCallLogStore;
