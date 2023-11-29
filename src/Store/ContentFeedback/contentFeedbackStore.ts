import { create } from "zustand";

import { devtools } from "zustand/middleware";
import { IContentFeedbackState, IContentFeedbackStore } from "./types";
import { axios } from "../../service/service";
import { immer } from "zustand/middleware/immer";
import { userStore } from "../Login/loginStore";
import { SUCCESS_CODE, isArrayResponse } from "../../utils/helper";

const initialState: IContentFeedbackState = {
  message: null,
  data: [],
  feedbacks: [],
  isLoading: false,
  isSubmitting: false,
  error: null,
};

const selectedProject = userStore.getState().selectedProject;

const contentFeedbackStore = create<IContentFeedbackStore>()(
  immer(
    devtools(
      (set, get) => ({
        ...initialState,
        getData: async (limit, page) => {
          set(() => ({ isLoading: true }));
          const res = await axios.getMethod(
            `content-feedback?page=${page}&limit=${limit}&project_id=${selectedProject.id}`
          );
          if (res.status === SUCCESS_CODE) {
            console.log("res.data.results", res.data.results);
            set(
              () => ({
                isLoading: false,
                data: res.data,
                feedbacks: isArrayResponse(res.data.results),
              }),
              false,
              {
                type: "fetch/content-feedback",
              }
            );
          } else {
            set(() => ({ isLoading: false, error: res.statusText }));
          }
        },
        createData: async (formData) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.postMethod(`content-feedback`, formData);
            set(() => ({ isSubmitting: false }), false, {
              type: "create/content-feedback",
            });
          } catch (error) {
            console.log("error while creating content feedback data", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
          }
        },
        updateData: async (formData, id) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.putMethod(
              `content-feedback/${id}`,
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

export default contentFeedbackStore;
