import { createContext, useContext } from "react";
import type { NavigateFunction } from "react-router-dom";
import axios from "axios";

export interface Blog {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  image: string;
  isPublished: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AppContextType {
  axios: typeof axios;
  navigate: NavigateFunction;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};