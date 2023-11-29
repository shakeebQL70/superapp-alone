import { create } from "zustand";
import { TSelectState, TSelectStore } from "./types";
import { axios, endPoints } from "../../service/service";
import { userStore } from "../Login/loginStore";

const selectedProject = userStore.getState().selectedProject

const initialState: TSelectState = {
    schools: {
        isLoading: false,
        list: [],
        error: '',
        message: ''
    },
    teachers: {
        isLoading: false,
        list: [],
        error: '',
        message: ''
    },
    students: {
        isLoading: false,
        list: [],
        error: '',
        message: ''
    },
}

const selectStore = create<TSelectStore>(
    (set: (fn: (state: TSelectState) => any) => void, get) => ({
        ...initialState,
        async getSchools() {
            try {
                set(() => ({schools: {isLoading: true}}))
                const res = await axios.getMethod(`${endPoints.schools}/${selectedProject.id}`)
                const list = res?.data?.map((school: any) => ({label: school?.name, id: school?.id})) || []
                set(() => ({schools: {isLoading: false, list}}))
            } catch (error) {
                set(() => ({schools: {isLoading: true}}))
                console.log('error while fetching schools select list', error)
            }
        },
        async getStudents() {
            try {
                set(() => ({students: {isLoading: true}}))
                const res = await axios.getMethod(endPoints.students)
                const list = res?.data?.map((student: any) => ({label: student?.name, id: student?.id})) || []
                set(() => ({students: {isLoading: false, list}}))
            } catch (error) {
                set(() => ({students: {isLoading: true}}))
                console.log('error while fetching students select list', error)
            }
        },
        async getTeachers() {
            try {
                set(() => ({teacher: {isLoading: true}}))
                const res = await axios.getMethod(endPoints.teacher)
                const list = res?.data?.map((teacher: any) => ({label: teacher?.name, id: teacher?.id})) || []
                set(() => ({teacher: {isLoading: false, list}}))
            } catch (error) {
                set(() => ({teacher: {isLoading: true}}))
                console.log('error while fetching teachers select list', error)
            }
        },
    })
)

export default selectStore