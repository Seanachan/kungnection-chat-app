import styles from "../../css/login.module.css"
// import setCurpage from "../../App"
export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h1 className={styles.cardTitle}>Welcome back!</h1>
            <p className={styles.cardDescription}>We're so excited to see you again!</p>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                EMAIL OR PHONE NUMBER
              </label>
              <input id="email" placeholder="Enter your email or phone number" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                PASSWORD
              </label>
              <input id="password" type="password" placeholder="Enter your password" className={styles.input} />
            </div>
            <div className={styles.checkboxContainer}>
              <input type="checkbox" id="remember" className={styles.checkbox} />
              <label htmlFor="remember" className={styles.checkboxLabel}>
                Remember me
              </label>
            </div>
            <button className={styles.button}>Log In</button>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.termsText}>Discord-like Chat Application</div>
          </div>
        </div>
      </div>
    </div>
  )
}
