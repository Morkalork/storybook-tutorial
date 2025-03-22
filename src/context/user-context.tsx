import { createContext, useContext } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type UserContextState = {
  users: User[];
  addUser: (user: User) => Promise<boolean>;
  removeUser: (id: string) => Promise<boolean>;
  updateUser: (id: string, user: User) => Promise<boolean>;
  getUser: (id: string) => Promise<User | undefined>;
};

export const UserContext = createContext<UserContextState>({
  users: [],
  addUser: async () => true,
  removeUser: async () => true,
  updateUser: async () => true,
  getUser: async () => undefined,
});

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const users: User[] = [];

  const addUser = async (user: User): Promise<boolean> => {
    users.push(user);
    return true;
  };

  const removeUser = async (id: string) => {
    const index = users.findIndex((user) => user.id === id);
    if (index > -1) {
      users.splice(index, 1);
    }
    return true;
  };

  const updateUser = async (id: string, user: User) => {
    const index = users.findIndex((user) => user.id === id);
    if (index > -1) {
      users[index] = user;
    }
    return true;
  };

  const getUser = async (id: string) => {
    return users.find((user) => user.id === id);
  };

  const userContextValue = { users, addUser, removeUser, updateUser, getUser };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
