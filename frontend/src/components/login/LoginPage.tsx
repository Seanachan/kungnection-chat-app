import { User } from "lucide-react";
import styles from "../../css/login.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
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
    <>
      <div className={styles.container}>
        {/* Header */}

        <div className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>Welcome back!</h1>
          <p className={styles.cardDescription}>
            Sign in to your Kungnection account !
          </p>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.card}>
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

                <button type="submit" className={styles.button}>
                  Sign In
                </button>
              </form>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.termsText}>
                Don't have an account?
                <Link to="/register" className={styles.backLink}>
                  Create one here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
