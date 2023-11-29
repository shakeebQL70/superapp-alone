import { create } from "zustand";

import { persist, devtools } from "zustand/middleware";

import {
  IUserProfileActions,
  IUserProfileState,
  IUserProfileStore,
} from "./types";
import { axios, endPoints } from "../../service/service";
import { immer } from "zustand/middleware/immer";
import { userStore } from "../Login/loginStore";
import { SUCCESS_CODE, isArrayResponse } from "../../utils/helper";

const initialState: IUserProfileState = {
  message: null,
  data: [],
  users: [],
  isLoading: false,
  isSubmitting: false,
  error: null,
  userInfo: null,
};

const selectedProject = userStore.getState().selectedProject;

const userProfileStore = create<IUserProfileStore>()(
  immer(
    devtools(
      (set, get) => ({
        ...initialState,
        getData: async (limit, page) => {
          set(() => ({ isLoading: true }));
          const res = await axios.getMethod(
            `${endPoints.project}/${selectedProject.id}/${endPoints.users}?page=${page}&limit=${limit}`
          );

          if (res.status === SUCCESS_CODE) {
            set(
              () => ({
                isLoading: false,
                data: res.data,
                users: isArrayResponse(res.data.results),
              }),
              false,
              {
                type: "fetch/user-profile",
              }
            );
          } else {
            set(() => ({ isLoading: false, error: res.statusText }));
          }
        },
        createData: async (formData) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.postMethod(
              `${endPoints.userCreate}`,
              formData
            );
            set(() => ({ isSubmitting: false }), false, {
              type: "create/user-profile",
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
              `${endPoints.user}/${id}`,
              formData
            );
            set(() => ({ isSubmitting: false }), false, {
              type: "update/user-profile",
            });
          } catch (error) {
            console.log("error while update user profile data", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
          }
        },
        createProfileInfo: async (formData) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.postMethod(`user/create`, formData);
            set(() => ({ isSubmitting: false }), false, {
              type: "create/user-profile",
            });
          } catch (error) {
            console.log("error while creating content feedback data", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
          }
        },
        addBankDetails: async (formData) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.postMethod(
              `${endPoints.bankDetails}`,
              formData
            );
            set(() => ({ isSubmitting: false }), false, {
              type: "create/bank-details",
            });
          } catch (error) {
            console.log("error while creating content feedback data", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
          }
        },
        updateBankDetails: async (formData, id) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.putMethod(
              `${endPoints.bankDetails}/${id}`,
              formData
            );
            set(() => ({ isSubmitting: false }), false, {
              type: "update/bank-details",
            });
          } catch (error) {
            console.log("error while update bank details", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
          }
        },
        getUserInfoById: async (id: string) => {
          set(() => ({ isSubmitting: true }));
          const res = await axios.getMethod(`${endPoints.user}/${id}`);
          
          if (res.status === SUCCESS_CODE) {
            set(() => ({ isSubmitting: false, userInfo: res.data }), false, {
              type: "fetch/user-detail",
            });
          } else {
            console.log(
              "error while creating content feedback data",
              res.statusText
            );
            set({
              isSubmitting: false,
              error: res.statusText,
            });
          }
        },
        addQualification: async (formData) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.postMethod(
              `${endPoints.qualification}`,
              formData
            );
            set(() => ({ isSubmitting: false }), false, {
              type: "create/user-qualification",
            });
          } catch (error) {
            console.log("error while creating qualification", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
          }
        },
        updateQualification: async (formData, id) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.putMethod(
              `${endPoints.qualification}/${id}`,
              formData
            );
            set(() => ({ isSubmitting: false }), false, {
              type: "create/update-qualification",
            });
          } catch (error) {
            console.log("error while updated qualification", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
          }
        },
        addExperience: async (formData) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.postMethod(
              `${endPoints.experience}`,
              formData
            );
            set(() => ({ isSubmitting: false }), false, {
              type: "create/user-experience",
            });
          } catch (error) {
            console.log("error while creating ", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
          }
        },
        updateExperience: async (formData, id) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.putMethod(
              `${endPoints.experience}/${id}`,
              formData
            );
            set(() => ({ isSubmitting: false }), false, {
              type: "create/user-experience",
            });
          } catch (error) {
            console.log("error while creating ", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
          }
        },
        updateProfile: async (formData, id) => {
          try {
            set(() => ({ isSubmitting: true }));
            const res = await axios.putMethod(
              `${endPoints.user}/${id}`,
              formData
            );
            set(() => ({ isSubmitting: false }), false, {
              type: "update/user-profile",
            });
          } catch (error) {
            console.log("error while update profile ", error);
            set({
              isSubmitting: false,
              error: error as string,
            });
          }
        },
      }),
      {
        store: "ediqueStore", //  ! Your store name
      }
    )
  )
);

export default userProfileStore;
