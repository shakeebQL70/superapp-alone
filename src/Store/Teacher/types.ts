export type TTeacherStates = {
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

export type TTeacherPayload = {
    name: string;
    gender: "male" | "female" | "other";
    mobile: string;
    class_taught: number[]; 
    appointed_subject: string[]; 
    qualification: string;
    skills: string;
    category: "pgt" | "tgt" | "lt" | "other"; 
    ict_trained: "yes" | "no"; 
    experience: string;
    state: string;
    district: string;
    village: string;
    session: string;
    school_id: number;
}

export type TTeacherActions = {
    getList: (page: string, limit: string) => void;
    getAll: () => void;
    getDetails: (id: string) => void;
    createTeacher: (body: TTeacherPayload) => void;
    updateTeacher: (body: TTeacherPayload, id: number) => void
    setOpenEditModal: (value: boolean) => void
}

export type TTeacherStore = TTeacherStates & TTeacherActions