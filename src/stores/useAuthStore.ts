import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

type AuthStoreInitialState = {
  isLogged: boolean;
};

type AuthStoreState = AuthStoreInitialState & {
  setIsLogged: (isLogged: boolean) => void;
};

const initialState: AuthStoreInitialState = {
  isLogged: false,
};

const useAuthStore = create<AuthStoreState>()(
  devtools(
    subscribeWithSelector((set) => ({
      ...initialState,

      setIsLogged: (isLogged) => {
        set({ isLogged });
      },
    })),
  ),
);

export default useAuthStore;
