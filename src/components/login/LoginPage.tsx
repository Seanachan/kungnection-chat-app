import styles from "../../css/login.module.css";
import { useState } from "react";
/*
LoginPage({setToken,}: {setToken: (token: string) => void}) { 
// the above line is actually: 

  type LoginPageProps = {
    setToken: (token: string) => void;
  };

  export default function LoginPage(props: LoginPageProps) {
    const setToken = props.setToken;
    ...
  }
*/
export default function LoginPage({
  setToken,
}: {
  setToken: (token: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    //TODO: repalce with actual login logic
    if (email === "admin" && password === "admin") {
      console.log("Login Successful");
      setToken("@gsNCKUeduTW");
    } else {
      console.log("Invalid credentials.");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h1 className={styles.cardTitle}>Welcome back!</h1>
            <p className={styles.cardDescription}>
              We're so excited to see you again!
            </p>
          </div>
          <div className={styles.cardContent}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  EMAIL
                </label>
                <input
                  id="email"
                  placeholder="Enter your email"
                  className={styles.input}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  PASSWORD
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className={styles.input}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* TODO: short-lived JWT to implement Remember me function */}
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="remember"
                  className={styles.checkbox}
                />
                <label htmlFor="remember" className={styles.checkboxLabel}>
                  Remember me
                </label>
              </div>
              <button type="submit" className={styles.button}>
                Log In
              </button>
            </form>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.termsText}>
              Kungnection Online Chat App
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
