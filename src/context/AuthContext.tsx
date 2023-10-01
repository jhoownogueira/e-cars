import React, { createContext, ReactNode, useState } from "react";

export interface IUserProps {
  login: string;
  roles: string;
}

interface IAuthContextProps {
  user: IUserProps | undefined;
  setUser: (user: IUserProps) => void;
}

interface AuthProvider {
  children: ReactNode;
}
export const AuthContext = createContext({} as IAuthContextProps);

export const AuthContextProvider = ({ children }: AuthProvider) => {
  const [user, setUser] = useState<IUserProps>();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
