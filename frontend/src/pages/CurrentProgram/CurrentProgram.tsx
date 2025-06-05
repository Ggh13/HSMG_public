import { observer } from "mobx-react-lite";
import styles from "./CurrentProgram.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { FC, useEffect } from "react";
import { trainingProcessStore } from "@/app/provider/StoreProvider";
import { Loader } from "@/ui/loader/Loader";
import { BasicHeader } from "@/components/basicHeader/BasicHeader";
import { ProgramInfo } from "@/modules/TrainingProcess/components/ProgramInfo/ProgramInfo";
import { ProgramPromoDaysList } from "@/modules/TrainingProcess/components/ProgramPromoDaysList/ProgramPromoDaysList";


export const CurrentProgram: FC = observer(() => {
  const { program_id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!program_id) return;
    trainingProcessStore.GetUserProgram(program_id);
    // console.log(JSON.stringify(trainingProcessStore.program));

  }, [program_id]);

  if (trainingProcessStore.loading) {
    return <Loader />;
  }

  return (
    <div className={styles["program-promo__container"]}>
      <main className={styles["program-promo__main"]}>
        <div className={styles["program-promo__header"]}>
          <BasicHeader onClick={() => navigate("/CurrentPrograms")} />
        </div>
        <ProgramInfo current={true} program={trainingProcessStore.program} />
        <ProgramPromoDaysList days={trainingProcessStore.program.training_days} />
      </main>
    </div>
  );


});