import { FC, useState } from 'react';
import styles from './ReadMore.module.css';
import go from '@/ui/imgs/go.svg';

interface ReadMoreProps {
  text: string;
  maxLength?: number;
}

export const ReadMore: FC<ReadMoreProps> = ({ text, maxLength = 35 }) => {
  const isTooLong = text.length > maxLength;
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => setIsReadMore(!isReadMore);

  return (
    <div className="m16med">
      <p className={styles.text}>
        {isReadMore && isTooLong ? `${text.slice(0, maxLength)}...` : text}
      </p>

      {isTooLong && (
        <div>
          <button onClick={toggleReadMore} className={styles.readmore_button}>
            {isReadMore ? (
              <div className={styles['readmore__container']}>
                <span>читать дальше </span>
                <img src={go} className={styles['rotate']} />
              </div>
            ) : (
              'скрыть'
            )}
          </button>
        </div>
      )}
    </div>
  );
};
