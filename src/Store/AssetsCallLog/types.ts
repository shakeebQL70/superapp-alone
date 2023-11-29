export interface IAssetsCallLogState {
  message: string | null;
  data: any[];
  serviceDesks: any[];
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
  complaintDetails: null;
  faqDetails: null;
  allFAQs: any[];
}

export interface IAssetsCallLogActions {
  getServiceDesk: (limit: number, page: number) => void;
  getServiceDeskDetailsById: (id: string) => void;
  getAllFAQ: (limit: number, page: number) => Promise<void>;
  getFAQById: (id: string) => Promise<void>;
  createAssetsCallLog: (formDate: FormData) => void;
  updateAssetsCallLog: (formDate: FormData, id: string) => void;
  createFAQ: (formData: FormData) => Promise<void>;
  updateFAQ: (formData: FormData, id: string) => Promise<void>;
}

export type IAssetsCallLogStore = IAssetsCallLogActions & IAssetsCallLogState;
