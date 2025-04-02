"use client";
import { useRouter } from "next/navigation";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type User = {
  name: string;
  id: number;
};

type UserContextType = {
  user: User | null;
  getUser: (user: User | null) => void;
  signOutUser: () => void;
  clearCache: () => void;
  refrech: () => void;
  Getrefrech: (refrech: () => void) => void;
};

interface ContextType {
  children: ReactNode;
}
const UserContext = createContext({} as UserContextType);
export const useSession = () => useContext(UserContext);

export function UserProvider({ children }: ContextType) {
  const [user, setUser] = useState<User | null>(null);
  const [refrech, setRefrech] = useState<() => void>(() => {});
  const router = useRouter();
  async function restoreUserFromCache() {
    const cachedUserData = localStorage.getItem("userData");
    if (cachedUserData && cachedUserData !== "undefined") {
      setUser(JSON.parse(cachedUserData));
    }
  }

  function signOutUser() {
    setUser(null);
    router.push("/");
    localStorage.setItem("userData", JSON.stringify(null));
  }

  function getUser(user: User | null) {
    setUser(user);
    localStorage.setItem("userData", JSON.stringify(user));
    return user || null;
  }
  function clearCache() {
    setUser(null);
    localStorage.setItem("userData", JSON.stringify(null));
  }

  function Getrefrech(refrech: () => void) {
    setRefrech(refrech);
  }

  useEffect(() => {
    restoreUserFromCache();
    console.log(user);
  }, []); // Executa apenas na montagem inicial

  return (
    <UserContext.Provider
      value={{ getUser, user, clearCache, signOutUser, refrech, Getrefrech }}
    >
      {children}
    </UserContext.Provider>
  );
}
