import { FC, useContext, useState } from 'react';
// import { ReadMore } from '@/components/readMore/ReadMore';
import styles from './ProgramInfo.module.css';
import defaultImg from '@/ui/imgs/trainingImmg.svg';
import { BlueButton } from '@/ui/buttons/BlueButton/BlueButton';
import { FavButton } from '@/ui/buttons/FavButton/FavButton';
import { StoreContext, trainingProcessStore } from '@/app/provider/StoreProvider';
import { Program } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
interface ProgramInfoProps {
  program: Program;
  current? : boolean;
}

export const ProgramInfo: FC<ProgramInfoProps> = observer(({ program, current }) => {
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);
  const { favouriteProgramsStore } = useContext(StoreContext);
  const handleToggleFav = () => {
    if (isFav) {
      favouriteProgramsStore.deleteFromFav(program.training_id);
    } else {
      favouriteProgramsStore.addToFav(program.training_id);
    }
    setIsFav(!isFav);
  };

  return (
    <section className={styles['program__container']}>
      {program.image ? (
        <img
          className={styles['program__image']}
          src={`data:image/gif;base64,${program.image}`}
          alt="Программа"
        />
      ) : (
        <img className={styles['program__image']} src={`${defaultImg}`} alt="Программа" />
      )}
      <h1 className={` m24bold {styles['program__name']}`}>{program.name}</h1>
      <p className={styles['program__description']}>
        {/* {program.description?.length > 100 ? (
          <ReadMore text={program.description} />
        ) : ( */}
          <span className="m16med">{program.description}</span>
        {/* )} */}
      </p>{' '}
      <div className={styles['program__buttons']}>
        {current ? (
          <BlueButton onClick={() => {
            navigate(`/StartTraining/${String(program.training_id)}`);
          }} text={"Продолжить тренироваться"}/>) : (
            <BlueButton onClick={() => {
              trainingProcessStore.AddProgram(String(program.training_id));
              navigate("/CurrentPrograms");
            }}/>
          )
        }
        <FavButton isFav={isFav} onClick={handleToggleFav} />
      </div>
    </section>
  );
});
