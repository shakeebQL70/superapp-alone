import { TICT } from "../../utils/types";

export type TState = {
    isLoading: boolean;
    list: any;
    error: null | string;
    message: null | string;
    actionError: null | string;
    actionMessage: null | string;
    actionLoading: boolean;
    details: any;
    allList: any;
    allLoading: boolean;
    allError: string;
    openEditModal: boolean;
}

export type TPayload = {
    school_id: string,
    school_name: null | {label:string, id:number},
    name: string,
    class:  null | {label:string, id:number, value:number},
    section: null | {label:string, id:number, value:string},
    state: null | {label:string, id:number, value:string},
    district: null | {label:string, id:number, value:string},
    village: string,
    session: null | {label:string, id:number, value:string},
    gender: string,
    d_o_b: string,
}

export type TActions = {
    getList: (page: string, limit: string) => void;
    getAll: () => void;
    getDetails: (id: string) => void;
    createTeacher: (body: TPayload) => void;
    updateTeacher: (body: TPayload, id: number) => void
    setOpenEditModal: (value: boolean) => void
}

export type TStore = TState & TActions