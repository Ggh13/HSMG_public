import { useEffect } from 'react';
import { trainingHistoryStore } from '@/app/provider/StoreProvider';

export const useLoadHistory = (id: string) => {
  useEffect(() => {
    trainingHistoryStore.GetHistory(id);
  }, []);

  return {
    loading: trainingHistoryStore.loading,
    exercises: trainingHistoryStore.history,
  };
};
