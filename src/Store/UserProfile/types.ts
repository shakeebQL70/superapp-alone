export interface IUserProfileState {
  message: string | null;
  data: any[];
  users: Record<string, string>[];
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
  userInfo: null;
}

export interface IUserProfileActions {
  getData: (limit: number, page: number) => void;
  createData: (formData: FormData) => void;
  addQualification: (formData: FormData) => void;
  updateQualification: (formData: FormData, id: string) => void;
  addExperience: (formData: FormData) => void;
  updateExperience: (formData: FormData, id: string) => void;
  updateData: (formData: FormData, id: string) => void;
  getUserInfoById: (id: string) => void;
  createProfileInfo: (formData: FormData) => void;
  addBankDetails: (formData: FormData) => void;
  updateBankDetails: (formData: FormData, id: string) => void;
  updateProfile: (formData: FormData, id: string) => void;
}

export type IUserProfileStore = IUserProfileActions & IUserProfileState;
