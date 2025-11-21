import {create} from "zustand";

export type User = {
  id:string;
  name: string,
  email: string
}

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void
  logout: () => void;
};

export const useAuthStore = 
create<AuthState>((set) => ({
  user:null,
  isAuthenticated:false,
  login: (user) => set({user,
    isAuthenticated:true}),
    logout: () => set({user:null,
      isAuthenticated:false})
  }))