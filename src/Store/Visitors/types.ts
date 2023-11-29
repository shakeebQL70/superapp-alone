export type TVisitorState = {
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

export type TVisitorPayload = {
    school_id: string;
    school_name: null | {label:string, id: number};
    name: string;
    date: string;
    type: {label:string, id: number, value: string} | null;
    designation: string;
    purpose: string;
    any_issue: string;
    feedback: string;
    image_url: string;
}

export type TVisitorActions = {
    getList: (page: string, limit: string) => void;
    getAll: () => void;
    getDetails: (id: string) => void;
    createVisitor: (body: TVisitorPayload) => void;
    updateVisitor: (body: TVisitorPayload, id: number) => void
    setOpenEditModal: (value: boolean) => void
}

export type TVisitorStore = TVisitorState & TVisitorActions