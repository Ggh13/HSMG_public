import React, { createContext, ReactNode } from 'react';
import auth_store from '../../modules/AuthorizationForm/store/auth-store/auth-store';
import error_store from '../../modules/Errors/store/error-store/error-store';
import profile_store from '../../modules/Profile/store/user-store';

export const errorstore = new error_store();
export const authStore = new auth_store(errorstore);
export const profileStore = new profile_store(errorstore);
interface StoreContextProps {
  authStore: auth_store;
  errorstore: error_store;
  profileStore: profile_store;
}

export const StoreContext = createContext<StoreContextProps>({
  authStore,
  errorstore,
  profileStore
});

interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return (
    <StoreContext.Provider value={{ authStore, errorstore, profileStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;