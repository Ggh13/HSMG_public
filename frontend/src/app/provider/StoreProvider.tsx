import React, { createContext, ReactNode } from 'react';
import auth_store from '../../modules/AuthorizationForm/store/auth-store/auth-store';
import error_store from '../../modules/Errors/store/error-store/error-store';
import profile_store from '../../modules/Profile/store/user-store';
import SearchTrainingsStore from '@/modules/Searching/ProgramsSearch/store/ProgramsSearchStore';
import SearchUsersStore from '@/modules/Searching/UsersSearch/store/UsersSearchStore';
import TrainingProcessStore from '@/modules/TrainingProcess/store/TrainingProcessStore';

import TrainingConstructorStore from '@/modules/TrainingConstructor/store/TrainingConstructorStore';
import FavouriteProgramsStore from '@/modules/FavouritePrograms/store/FavouriteProgramsStore';
import TrainingStatisticsStore from '@/modules/Statistics/TrainingStatistics/store/TrainingStatisticsStore';
import AchievementsStore from '@/modules/Achievements/store/AchievementsStore';
import TrainingHistoryStore from '@/modules/TrainingHistory/store/TrainingHistoryStore';
import S3Store from '@/modules/S3/store/S3Store';
import AnthropometryStatisticsStore from '@/modules/Statistics/AnthropometryStatistics/store/AnthropometryStatisticsStore';

export const errorstore = new error_store();
export const authStore = new auth_store(errorstore);
export const profileStore = new profile_store(errorstore);
export const searchTrainingsStore = new SearchTrainingsStore(errorstore);
export const searchUsersStore = new SearchUsersStore(errorstore);
export const trainingProcessStore = new TrainingProcessStore(errorstore);
export const trainingConstructorStore = new TrainingConstructorStore(errorstore);
export const favouriteProgramsStore = new FavouriteProgramsStore(errorstore);
export const trainingStatisticsStore = new TrainingStatisticsStore(errorstore);
export const achievementsStore = new AchievementsStore(errorstore);
export const trainingHistoryStore = new TrainingHistoryStore(errorstore);
export const anthropometryStatisticsStore = new AnthropometryStatisticsStore(errorstore);
export const s3Store = new S3Store(errorstore);

interface StoreContextProps {
  authStore: auth_store;
  errorstore: error_store;
  profileStore: profile_store;
  searchTrainingsStore: SearchTrainingsStore;
  searchUsersStore: SearchUsersStore;
  trainingProcessStore: TrainingProcessStore;
  trainingConstructorStore: TrainingConstructorStore;
  favouriteProgramsStore: FavouriteProgramsStore;
  trainingStatisticsStore: TrainingStatisticsStore;
  achievementsStore: AchievementsStore;
  trainingHistoryStore: TrainingHistoryStore;
  anthropometryStatisticsStore: AnthropometryStatisticsStore;
  s3Store: S3Store;
}

export const StoreContext = createContext<StoreContextProps>({
  authStore,
  errorstore,
  profileStore,
  searchTrainingsStore,
  searchUsersStore,
  trainingProcessStore,
  trainingHistoryStore,
  trainingConstructorStore,
  s3Store,
  trainingStatisticsStore,
  achievementsStore,
  favouriteProgramsStore,
  anthropometryStatisticsStore
});
interface StoreProviderProps {
  children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return (
    <StoreContext.Provider
      value={{ authStore, errorstore, profileStore, searchTrainingsStore, searchUsersStore, trainingConstructorStore, trainingStatisticsStore, trainingProcessStore, trainingHistoryStore, achievementsStore, favouriteProgramsStore, s3Store, anthropometryStatisticsStore }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
