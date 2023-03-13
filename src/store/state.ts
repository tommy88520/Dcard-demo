export interface LoginState {
  login: any;
  toggleLogin: () => void;
  toggleLogOut: () => void;
}

export interface MenuState {
  menuState: {
    initial: boolean;
    clicked: boolean;
  };
  toggleMenu: (e) => void;
}

export interface UserDataState {
  userData: {
    id: string;
    username: string;
    photos: {
      value: string;
    }[];
    access_token: string;
    email: {
      value: string;
    }[];
    token: string;
  };
  getUserData: () => void;
}

export interface UserRepoState {
  userRepo: string[];
  getUserRepo: any;
}

export interface RepoAllIssueState {
  repoAllIssues: {
    title: string;
    number: number;
    label: {
      name: string;
      description: string;
    };
    body: string;
    created_at: Date;
  }[];
  getIssueQuery: {
    repo: string;
    q: string;
    label: string;
    sort: string;
    order: string;
    per_page: number;
    page: number;
    noCache: boolean;
  };
  setLoading: () => void;
  dataStatus: {
    loading: boolean;
    hasNextPage: boolean;
  };
  getRepoAllIssues: any;
  setRepoAllIssues: (e) => void;
}

export interface IssueSortState {
  query: {
    repo: string;
    query: {
      state: string;
      labels: string;
      sort: string;
      direction: string;
      per_page: number;
      page: number;
    };
  };
  setRepo: (e) => void;
  setQuery: (e) => void;
}

export interface test {
  lush: { forest: { contains: { a: string } } };
  clearForest: () => void;
}

export interface GetIssueDetail {
  issueDetail: {
    title: string;
    number: number;
    label: {
      name: string;
      description: string;
    };
    body: string;
    created_at: Date;
  };
  getIssueDetail: (e) => void;
}

export interface CreateIssue {
  messages: string;
  createIssue: (e, i) => void;
}

export interface UpdateIssue {
  updateMessages: string;
  updateIssue: (e, i) => void;
}

export interface IssuePageNumber {
  issuePageNumber: number;
  setIssuePageNumber: (e) => void;
}
