export type TProjectState = {
  message: string | null;
  data: any[];
  isLoading: boolean;
  updating: boolean;
  error: string | null;
  updateError: string | null;
  projectDDList: any[];
  dataById: any;
  dataLoading: boolean;
  openEditModal: boolean
};

export type TUpdateProject = {
  name: string;
  state: string;
  department_name: string;
  client_name: string;
};

export type TProjectActions = {
  getData: () => void;
  updateData: (body: TUpdateProject, projectId: number) => void;
  getProjectsDDList: () => Promise<void>;
  getDataById: (id: number) => void
  setOpenEditModal: (value: boolean) => void
};

export type TProjectStore = TProjectActions & TProjectState;
