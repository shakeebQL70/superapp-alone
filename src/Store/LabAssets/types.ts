import { TICT } from "../../utils/types";

export type TState = {
  isLoading: boolean;
  list: any;
  detailsList: any;
  error: null | string;
  message: null | string;
  actionError: null | string;
  actionMessage: null | string;
  actionLoading: boolean;
  details: any;
  allList: any;
  allDetailsList: any;
  allLoading: boolean;
  allError: string;
  openEditModal: boolean;
  assetDetail: any;
  assetAllDetail: any;
};

export type TPayload = {
  school_id: string;
  school_name: null | { label: string; id: number };
  name: string;
  class: null | { label: string; id: number; value: number };
  section: null | { label: string; id: number; value: string };
  state: null | { label: string; id: number; value: string };
  district: null | { label: string; id: number; value: string };
  village: string;
  session: null | { label: string; id: number; value: string };
  gender: string;
  d_o_b: string;
};

export type TActions = {
  getList: (page: string, limit: string) => void;
  getDetailsList: (page: string, limit: string) => void;
  getAll: () => void;
  getAllDetails: () => void;
  getDetails: (id: string) => void;
  createAsset: (body: TPayload) => void;
  updateAsset: (body: TPayload, id: number) => void;
  setOpenEditModal: (value: boolean) => void;};

export type TStore = TState & TActions;
