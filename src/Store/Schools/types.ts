import { TCategory, TGender, TICT } from "../../utils/types";
import { AutoCompleteDropdown } from "../store";

export type TSchoolState = {
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
  dropdownList: AutoCompleteDropdown[];
};

export type TSchoolPayload = {
  name: string;
  gender: TGender;
  mobile: string;
  class_taught: number[];
  appointed_subject: string[];
  qualification: string;
  skills: string;
  category: TCategory;
  ict_trained: TICT;
  experience: string;
  state: string;
  district: string;
  village: string;
  session: string;
  school_id: number;
};

export type TSchoolActions = {
  getList: (page: string, limit: string) => void;
  getAll: () => void;
  getDetails: (id: string) => void;
  createSchool: (body: TSchoolPayload) => void;
  updateSchool: (body: TSchoolPayload, id: number) => void;
  setOpenEditModal: (value: boolean) => void;
};

export type TSchoolStore = TSchoolState & TSchoolActions;
