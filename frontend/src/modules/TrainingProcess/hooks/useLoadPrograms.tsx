// modules/TrainingProcess/hooks/useLoadPrograms.ts
import { useEffect } from 'react';
import { trainingProcessStore } from '@/app/provider/StoreProvider';

export const useLoadPrograms = () => {
  useEffect(() => {
    trainingProcessStore.GetPrograms();
    // если есть отмена запроса — можно сюда вставить:
    // return () => trainingProcessStore.abortProgramsFetch?.();
  }, []);

  return {
    loading: trainingProcessStore.loading,
    programs: trainingProcessStore.programs,
  };
};
