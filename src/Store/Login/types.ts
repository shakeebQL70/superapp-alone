export type TProject = {id: number, name: string}
export type TUser = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
    projectList: TProject[]
}


export type TStates = {
    isLoading: boolean;
    selectedProject: TProject;
    user : TUser | null;
    error: string | null;
    message: string | null
};

export type TActionsLogin = {username: string, password: string}

export type TActions = {
    login: (body: TActionsLogin) => void;
    logout: () => void;
    setSelectedProject: (project: TProject) => void
};

export type TUserStore = TStates & TActions;
