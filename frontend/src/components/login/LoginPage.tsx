import styles from "../../css/login.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function LoginPage({
  setIsLoggedIn,
}: {
  setIsLoggedIn: (isLoggedin: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<
    Partial<Record<"email" | "password" | "submit", string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as "email" | "password";
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error[name]) {
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const validateForm = () => {
    const newErrors: Partial<Record<"email" | "password", string>> = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async (e?: { preventDefault: () => void }) => {
    e?.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status == 401) {
          throw new Error("INVALID_CREDENTIALS");
        }
        throw new Error("LOGIN_FAILED");
      }
      const token = await response.text();
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      navigate("/chat");

      alert("Login successful! Welcome back to Kungnection!");
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";

      // Handle specific error types
      if (error instanceof Error) {
        switch (error.message) {
          case "INVALID_PASSWORD":
            errorMessage =
              "Incorrect password. Please check your password and try again.";
            break;
          case "USER_NOT_FOUND":
            errorMessage = "No account found with this email address.";
            break;
          case "INVALID_CREDENTIALS":
            errorMessage =
              "Invalid email or password. Please check your credentials and try again.";
            break;
          case "ACCOUNT_LOCKED":
            errorMessage =
              "Your account has been temporarily locked due to multiple failed login attempts.";
            break;
          case "ACCOUNT_DISABLED":
            errorMessage =
              "Your account has been disabled. Please contact support for assistance.";
            break;
          default:
            errorMessage =
              "Login failed. Please check your credentials and try again.";
        }
      }

      setError({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className={styles.container}>
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
                    name="email"
                    placeholder="Enter your email"
                    className={styles.input}
                    onChange={handleInputChange}
                  />
                </div>
                {error.email && (
                  <p className={styles.errorMessage}>{error.email}</p>
                )}
                <div className={styles.formGroup}>
                  <label htmlFor="password" className={styles.label}>
                    PASSWORD
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className={styles.input}
                    onChange={handleInputChange}
                  />
                </div>
                {error.email}
                {error.password && (
                  <p className={styles.helperText}>{error.password}</p>
                )}
                <button
                  type="submit"
                  onClick={handleLogin}
                  className={styles.button}
                >
                  Sign In
                </button>
              </form>
            </div>
            {error.submit && (
              <p className={styles.submitError}>{error.submit}</p>
            )}
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
