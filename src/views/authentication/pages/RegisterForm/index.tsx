// ** Styles Import
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

// ** Another Import
import { useState } from 'react';
import { AuthenRoutePaths } from '../../utils/enum/home';

function RegisterForm() {
  // ** State
  const [showPass, setShowPass] = useState<boolean>(false);

  // ** Hook
  const navigate = useNavigate();

  // ** function
  const handleNavigate = () => {
    navigate('/' + AuthenRoutePaths.SIGN_IN);
  };

  return (
    <div className={styles.registerForm}>
      <div className={styles.registerForm__background}></div>

      <div className={styles.registerForm__form}>
        <p className={styles.registerForm__header}>faniverse</p>
        <p className={styles.registerForm__form__title}>Register</p>

        <div className={styles.registerForm__form__inputWrapper}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            id='email'
            placeholder='Enter your email'
          />
        </div>

        <div className={styles.registerForm__form__inputWrapper}>
          <label htmlFor='password'>Password</label>
          <div className={styles.password}>
            <input
              type={showPass ? 'text' : 'password'}
              name='password'
              id='password'
              placeholder='Enter your password'
            />

            <button
              className={styles.visibility}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <span className='material-symbols-outlined'>visibility</span>
              ) : (
                <span className='material-symbols-outlined'>
                  visibility_off
                </span>
              )}
            </button>
          </div>
        </div>

        <div className={styles.registerForm__form__inputWrapper}>
          <label htmlFor='password'>Confirm Password</label>
          <div className={styles.password}>
            <input
              type={showPass ? 'text' : 'password'}
              name='password'
              id='password'
              placeholder='Enter your password'
            />

            <button
              className={styles.visibility}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <span className='material-symbols-outlined'>visibility</span>
              ) : (
                <span className='material-symbols-outlined'>
                  visibility_off
                </span>
              )}
            </button>
          </div>
        </div>

        <div className={styles.registerForm__form__btn}>
          <button className={styles.sigup}>Sign up</button>
          <button className={styles.sigin} onClick={handleNavigate}>
            Have Account? Sign in{' '}
            <span className='material-symbols-outlined'>
              keyboard_double_arrow_right
            </span>
          </button>
        </div>
        <p className={styles.registerForm__form__continue}>or continue with</p>

        <div className={styles.registerForm__form__options}>
          <button className={styles.item}>
            <img
              src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png'
              alt='google icon'
            />
          </button>
          <button className={styles.item}>
            <img
              src='https://static.vecteezy.com/system/resources/previews/047/750/224/non_2x/facebook-icon-transparent-background-free-png.png'
              alt='facebook icon'
            />
          </button>
          <button className={styles.item}>
            <img
              src='https://static.vecteezy.com/system/resources/previews/042/148/632/non_2x/instagram-logo-instagram-social-media-icon-free-png.png'
              alt='instagram icon'
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
