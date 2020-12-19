export type AppUser = {
  uid: string;
  email: string;
  name: string;
  token: string;
  provider: string;
  photoUrl: string;
};

export type AppUserWithoutToken = {
  uid: string;
  email: string;
  name: string;
  provider: string;
  photoUrl: string;
};

export type IAuthContext = {
  user: AppUser | null;
  loading: boolean;
  signinWithGitHub(redirect?: string): Promise<void>;
  signinWithGoogle(redirect?: string): Promise<void>;
  signOut(): Promise<void>;
};

export type TechInput = {
  mark: string;
};

export type Idea = {
  id: number;
  name: string;
  briefDescription: string;
  richDescription: string;
  difficulty: string;
  techs: Array<string>;
  demo: {
    demo_url?: string;
    demo_placeholder?: string;
  };
  user: AppUser;
  userUid: string;
};

export type DbIdea = {
  id: number;
  name: string;
  briefDescription: string;
  richDescription: string;
  difficulty: string;
  techs: Array<string>;
  demo_url?: string;
  demo_placeholder?: string;
  user: AppUser;
  userUid: string;
};

export type IdeaWithFavorite = {
  id: number;
  name: string;
  briefDescription: string;
  richDescription: string;
  difficulty: string;
  techs: Array<string>;
  demo_url?: string;
  demo_placeholder?: string;
  user: AppUser;
  userUid: string;
  favorited: boolean;
};
