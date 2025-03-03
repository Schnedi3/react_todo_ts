import { signInWithPopup } from 'firebase/auth';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { iconGoogle } from '../Routes';
import { auth, googleProvider } from '../firebase/firebase';
import { useAuthStore } from '../store/authStore';
import { useSaveUser } from '../api/user';
import styles from '../css/login.module.css';

export const Route = createFileRoute('/login')({
  component: Login,
});

function Login() {
  const { setIsAuthenticated, setUserId } = useAuthStore();
  const { mutate: saveUser } = useSaveUser();
  const navigate = useNavigate();

  const googleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      setIsAuthenticated(true);
      setUserId(user.uid);
      saveUser({ id: user.uid, fullName: user.displayName, email: user.email });
      navigate({ to: '/' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.auth}>
      <h2 className={styles.title}>Welcome back</h2>

      <button className={styles.gbutton} onClick={googleLogin}>
        <img className={styles.iconGoogle} src={iconGoogle} />
        <p className={styles.gbuttonText}>Login with Google</p>
      </button>
    </section>
  );
}
