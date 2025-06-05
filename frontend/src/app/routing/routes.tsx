import { LoginPage } from '@/pages/AuthPage/components/LoginPage';
import { HomePage } from '@/pages/HomePage/HomePage';
import { createBrowserRouter } from "react-router-dom";

import { RegisterPage } from "@/pages/AuthPage/components/RegisterPage";
import { AccountPage } from "@/pages/AccountPage/AccountPage";
import { ChangeAccountData } from "@/pages/ChangeAccountData/ChangeAccountData";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { GuestRoute } from "./GuestRoute";

import { Searching } from "@/pages/SearchingPrograms/Searching";
import { SearchingUsers } from "@/pages/SearchingUsers/SearchingUsers";

import { UserTrainingProgramsPage } from "@/pages/UserTrainingProgramsPage/UserTrainingProgramsPage";
import { CreateNewProgram } from "@/pages/CreateNewProgram/CreateNewProgram";

import { ProgramPage } from "@/pages/ProgramPage/ProgramPage";
import { ProgramDayPage } from "@/pages/ProgramDayPage/ProgramDayPage";

import { ChangeTrainingProgramData } from "@/pages/ChangeTrainingProgramData/ChangeTrainingProgramData";
import { ChangeTrainingDayData } from "@/pages/ChangeTrainingDayData/ChangeTrainingDayData";

import { TrainingStatisticsPage } from "@/pages/TrainingStatisticsPage/TrainingStatisticsPage";
import { CreateNewDay } from "@/pages/CreateNewDay/CreateNewDay";

import { ChangeExerciseData } from "@/pages/ChangeExerciseData/ChangeExerciseData";
import { CreateNewEx } from "@/pages/CreateNewEx/CreateNewEx";

import { TrainingMenu } from "@/pages/TrainingMenu/TrainingMenu";
import { ProgramPromo } from "@/pages/ProgramPromo/ProgramPromo";
import { FavouritePage } from "@/pages/FavouritePage/FavouritePage";
import { CurrentPrograms } from '@/pages/CurrentPrograms/CurrentPrograms';
import { TrainingHistory } from '@/pages/TrainingHistory/TrainingHistory';
import { AddDoneExercise } from '@/pages/AddDoneExercise/AddDoneExercise';
import { S3TestPage } from '@/pages/Test/Test';
import { CurrentProgram } from '@/pages/CurrentProgram/CurrentProgram';

import { AchievementsPage } from '@/pages/AchievementsPage/AchievementsPage';
import { AddAchievement } from '@/pages/AddAchievement/AddAchievement';
import { StartTraining } from '@/pages/StartTraining/StartTraining';
import { TrainingProcess } from '@/pages/TrainingProcess/TrainingProcess';
import { AnthropometryStatisticsPage } from '@/pages/AnthropometryStatisticsPage/AntropometryStatisticsPage';
import { ChangeAnthropometryData } from '@/pages/ChangeAnthropometryData/ChangeAnthropometryData';
import { EndTraining } from '@/pages/EndTraining/EndTraining';
import { CameraAuthPage } from '@/pages/CameraAuthPage/CameraAuthPage';




export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout footer={false} />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
    ],
  },

  {
    path: '/',
    element: <MainLayout />, // по умолчанию footer = true
    children: [
      {
        path: 'AccountPage/:user_id',
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'ChangeAccountData',
        element: (
          <ProtectedRoute>
            <ChangeAccountData />
          </ProtectedRoute>
        ),
      },
      {
        path: 'Searching',
        element: (
          <ProtectedRoute>
            <Searching />
          </ProtectedRoute>
        ),
      },
      {
        path: 'SearchingUsers',
        element: (
          <ProtectedRoute>
            <SearchingUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: 'UserTrainingPrograms/:userId',
        element: (
          <ProtectedRoute>
            <UserTrainingProgramsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'CreateNewProgram',
        element: (
          <ProtectedRoute>
            <CreateNewProgram />
          </ProtectedRoute>
        ),
      },
      {
        path: 'ProgramPage/:id_tr',
        element: (
          <ProtectedRoute>
            <ProgramPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'ProgramDayPage/:id_tr/:day_ind',
        element: (
          <ProtectedRoute>
            <ProgramDayPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'ChangeTrainingProgramData/:id_tr',
        element: (
          <ProtectedRoute>
            <ChangeTrainingProgramData />
          </ProtectedRoute>
        ),
      },
      {
        path: 'ChangeTrainingDayData/:id_tr/:index',
        element: (
          <ProtectedRoute>
            <ChangeTrainingDayData />
          </ProtectedRoute>
        ),
      },
      {
        path: 'TrainingStatisticsPage/:id_user',
        element: (
          <ProtectedRoute>
            <TrainingStatisticsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'AnthropometryStatisticsPage/:id_user',
        element: (
          <ProtectedRoute>
            <AnthropometryStatisticsPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'ChangeAnthropometryData',
        element: (
          <ProtectedRoute>
            <ChangeAnthropometryData />
          </ProtectedRoute>
        )
      },
      {
        path: 'CreateNewDay',
        element: (
          <ProtectedRoute>
            <CreateNewDay />
          </ProtectedRoute>
        ),
      },
      {
        path: 'ChangeExerciseData/:index_day/:index_ex',
        element: (
          <ProtectedRoute>
            <ChangeExerciseData />
          </ProtectedRoute>
        ),
      },
      {
        path: 'CreateNewEx/:day_index',
        element: (
          <ProtectedRoute>
            <CreateNewEx />
          </ProtectedRoute>
        ),
      },
      {
        path: 'TrainingMenu',
        element: (
          <ProtectedRoute>
            <TrainingMenu />
          </ProtectedRoute>
        ),
      },

      {
        path: `ProgramPromo/:program_id`,
        element: (
          <ProtectedRoute>
            <ProgramPromo />
          </ProtectedRoute>
        ),
      },
      {
        path: 'CurrentPrograms',
        element: (
          <ProtectedRoute>
            <CurrentPrograms />
          </ProtectedRoute>
        ),
      },
      {
        path: 'TrainingHistory',
        element: (
          <ProtectedRoute>
            <TrainingHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: 'AddDoneExercise',
        element: (
          <ProtectedRoute>
            <AddDoneExercise />
          </ProtectedRoute>
        ),
      },
      {
        path: "FavoritePrograms",
        element: (
          <ProtectedRoute>
            <FavouritePage />
          </ProtectedRoute>
        )
      },
      {
        path: "AchievementsPage/:id_user",
        element: (
          <ProtectedRoute>
            <AchievementsPage />
          </ProtectedRoute>
        )
      },
      {
        path: "Test",
        element: (
          <ProtectedRoute>
            <S3TestPage />
          </ProtectedRoute>
        )
      },
      {
        path: "AddAchievement",
        element: (
          <ProtectedRoute>
            <AddAchievement />
          </ProtectedRoute>
        )
      },
      {
        path: "CurrentProgram/:program_id",
        element: (
          <ProtectedRoute>
            <CurrentProgram />
          </ProtectedRoute>
        )
      },
      {
        path: "StartTraining/:program_id",
        element: (
          <ProtectedRoute>
            <StartTraining />
          </ProtectedRoute>
        )
      },
      {
        path: "TrainingProcess/:program_id",
        element: (
          <ProtectedRoute>
            <TrainingProcess />
          </ProtectedRoute>
        )
      },
      {
        path: "EndTraining/:program_id",
        element: (
          <ProtectedRoute>
            <EndTraining />
          </ProtectedRoute>
        )
      }, {
        path: "Auth_Camera/:cam_hash",
        element: (
          <ProtectedRoute>
            <CameraAuthPage />
          </ProtectedRoute>
        )
      }
    ],
  },


  {
    path: 'login',
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },

  {
    path: 'registration',
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },

]);
