export type TState = {
    label: string,
    id: string | number
}

export type TSelectState = {
    schools: {
        isLoading: boolean,
        list: TState[],
        error: string,
        message: string
    };
    teachers: {
        isLoading: boolean,
        list: TState[],
        error: string,
        message: string
    };
    students: {
        isLoading: boolean,
        list: TState[],
        error: string,
        message: string
    };
}
export type TSelectActions = {
    getTeachers: () => void;
    getStudents: () => void;
    getSchools: () => void;
}
export type TSelectStore = TSelectActions & TSelectState