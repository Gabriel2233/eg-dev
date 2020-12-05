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
  name: string;
};

export type Idea = {
  id: number;
  name: string;
  briefDescription: string;
  richDescription: string;
  difficulty: string;
  techs: Array<string>;
  demoUrl?: string;
  demoPlaceholder?: string;
};
