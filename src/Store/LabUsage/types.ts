export interface ILabUsageState {
  message: string | null;
  data: any[];
  usages: any[];
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
}

type TCategory = "theory" | "practical" | "multimedia" | "mis_work";
export interface ILabUsageActions {
  getLabUsageList: (
    category: TCategory,
    limit: number,
    page: number,
    schoolId: string,
    section: string,
    fromDate: string,
    toDate: string
  ) => void;
  createLabUsage: (formDate: FormData) => void;
  updateLabUsage: (formDate: FormData, id: string) => void;
}

export type ILabUsageStore = ILabUsageActions & ILabUsageState;
