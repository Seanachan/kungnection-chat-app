"use client";

import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "../../css/Register.module.css";

type RegisterErrors = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  submit?: string;
};

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, hyphens, and underscores";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (name in errors) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, this would make an API call to your Java backend
      // For demo purposes, we'll simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate successful registration
      alert("Registration successful! Welcome to CodeChat!");

      // In a real app, you would redirect to login or dashboard
      // window.location.to = "/login"
    } catch (error) {
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <Link to="/" className={styles.backLink}>
            <ArrowLeft className={styles.backIcon} />
            Back to CodeChat
          </Link>
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.subtitle}>Join the CodeChat community</p>
        </div>

        {/* Registration Form */}
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Username Field */}
            <div className={styles.fieldGroup}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} />
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.username ? styles.inputError : ""
                  }`}
                  placeholder="Enter your username"
                />
              </div>
              {errors.username && (
                <p className={styles.errorMessage}>{errors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <div className={styles.inputWrapper}>
                <Mail className={styles.inputIcon} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.email ? styles.inputError : ""
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`${styles.input} ${styles.inputWithToggle} ${
                    errors.password ? styles.inputError : ""
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordToggle}
                >
                  {showPassword ? (
                    <EyeOff className={styles.passwordToggleIcon} />
                  ) : (
                    <Eye className={styles.passwordToggleIcon} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className={styles.fieldGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`${styles.input} ${styles.inputWithToggle} ${
                    errors.confirmPassword ? styles.inputError : ""
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={styles.passwordToggle}
                >
                  {showConfirmPassword ? (
                    <EyeOff className={styles.passwordToggleIcon} />
                  ) : (
                    <Eye className={styles.passwordToggleIcon} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className={styles.errorMessage}>{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <p className={styles.submitError}>{errors.submit}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? (
                <>
                  <svg
                    className={styles.loadingSpinner}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className={styles.loginLink}>
            <p className={styles.loginText}>
              Already have an account?{" "}
              <Link to="/login" className={styles.loginLinkText}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Terms and Privacy */}
        <div className={styles.termsText}>
          By creating an account, you agree to our{" "}
          <Link to="/terms" className={styles.termsLink}>
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className={styles.termsLink}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
