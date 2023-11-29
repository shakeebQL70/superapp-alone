import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { TStates, TUserStore } from "./types";
import { $LOCAL_LOGGEDIN_KEY } from "../contants";
import { axios, endPoints } from "../../service/service";

const initialState: TStates = {
    isLoading: false,
    selectedProject: {id: 0, name: ''},
    user: null,
    error: null,
    message: null,
}

export const userStore = create(
    persist<TUserStore>(
        (set: (fn: (state: TUserStore) => any) => void, get) => ({
            ...initialState,
            login: async (body: {username: string, password: string}) => {
                try {
                    set(() => ({isLoading: true}))
                    const res = await axios.postMethod(endPoints.login, body)
                    const data = res?.data || {}
                    set(() => ({
                        isLoading: false, 
                        user: {
                            id: data.id,
                            email: data.email,
                            firstName: data.first_name,
                            lastName: data.last_name,
                            accessToken: data.access_token,
                            refreshToken: data.refresh_token,
                            projectList: data.projectList,
                        },
                        selectedProject: data.projectList[0] || {}
                    }))
                } catch (error) {
                    console.log('error while logging in : ', error)
                    set(() => ({isLoading: false, user: null}))
                }
            },
            logout: () => set(() => initialState),
            setSelectedProject: (project) => set(() => ({selectedProject: project}))
        }),
        {
            name: $LOCAL_LOGGEDIN_KEY,
        }
    )
);
 