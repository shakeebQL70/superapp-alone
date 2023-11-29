export type TDCVisitorState = {
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

export type TDCVisitorPayload = {
    name: string;
    date_of_visit: string;
    type: {label:string, id: number, value: string} | null;
    visit_type: string;
    in_time: string;
    out_time: string;
    school_coordinator_attendance: string;
    ict_lab_utilization: string;
    computer_edu_consumable: string;
    electricity_bill_consumption_ict_lab: string;
    any_other_register: string;
    ict_lab_hardware_functional: string;
    ict_lab_student_teacher_attendance: string;
    performance_review_sc: string;
    feedback_from_students: string;
    feedback_from_principal: string;
    comments_on_feedback_complaints_from_school: string;
    multimedia_econtent_issue: string;
    multimedia_econtent_feedback: string;
    comments_suggestions_by_visitor: string;
    school_id: string;
    school_name: null | {label:string, id: number};
    any_issue: string;
    feedback: string;
    image_url: string;
    visit_number: string;
}

export type TDCVisitorActions = {
    getList: (page: string, limit: string) => void;
    getAll: () => void;
    getDetails: (id: string) => void;
    createDCVisitor: (body: TDCVisitorPayload) => void;
    updateDCVisitor: (body: TDCVisitorPayload, id: number) => void
    setOpenEditModal: (value: boolean) => void
}

export type TDCVisitorStore = TDCVisitorState & TDCVisitorActions