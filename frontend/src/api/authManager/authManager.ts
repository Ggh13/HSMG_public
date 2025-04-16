interface Store {
  setAuth: (isAuth: boolean) => void;
  setUser: (user: object) => void;
}

let storeInstance: Store | null = null;

export const setStore = (store: Store): void => {
  storeInstance = store;
};

export const handleUnauthorized = (): void => {
  if (storeInstance) {
    storeInstance.setAuth(false);
    storeInstance.setUser({ 
      id: null,
      email: '',
      name: '',
      surname: '',
      nickname: '',
      avatar: ''
    });
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};