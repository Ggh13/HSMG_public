import { observer } from 'mobx-react-lite';
import { LoginForm } from '../../../modules/AuthorizationForm';
import styles from './LoginPage.module.css';

export const LoginPage: React.FC = observer(() => {
  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <div className={styles.logo}>
        
        </div>
        <div className={styles.login__form__container }>
          <LoginForm /> 
        </div>
      </div>
    </div>
  );
});