import { useState } from "react";
import { Eye, EyeOff, Lock, ArrowLeft, Shield } from "lucide-react";
import styles from "./change-passwd.module.css";
import { Link } from "react-router-dom";
import { ChangePasswordErrors } from "../../types";
import { BASE_URL } from "../../config";

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState<ChangePasswordErrors>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState<ChangePasswordErrors>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    submit: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: ChangePasswordErrors = { newPassword: "" };

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.currentPassword === formData.newPassword
    ) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    setErrors(newErrors);
    console.log(Object.keys(newErrors).length);
    return Object.keys(newErrors).length <=1;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name in errors && errors[name as keyof ChangePasswordErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (!validateForm()) {
      console.log("invalid");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) return;

      console.log(formData.newPassword);
      const response = await fetch(`${BASE_URL}/user/me`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.newPassword,
        }),
      });

      if (!response.ok) {
        console.error(await response.text());
        console.error("Failed to change password");
        return;
      }

      // Simulate different scenarios for demo
      if (formData.currentPassword === "wrongpassword") {
        throw new Error("INVALID_CURRENT_PASSWORD");
      }

      alert(
        "Password changed successfully! Please log in with your new password.",
      );
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error: unknown) {
      let errorMessage = "Failed to change password. Please try again.";

      const errorWithMessage = error as { message?: string };
      if (errorWithMessage?.message) {
        switch (errorWithMessage.message) {
          case "INVALID_CURRENT_PASSWORD":
            errorMessage = "Current password is incorrect.";
            break;
          case "PASSWORD_RECENTLY_USED":
            errorMessage = "You cannot reuse a recently used password.";
            break;
          default:
            errorMessage = "Failed to change password. Please try again.";
        }
      }

      setErrors({ newPassword: "", submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#16a34a"];

    return {
      strength: (strength / 5) * 100,
      label: labels[strength - 1] || "",
      color: colors[strength - 1] || "#6b7280",
    };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <Link to="/" className={styles.backLink}>
            <ArrowLeft className={styles.backIcon} />
            Back to CodeChat
          </Link>
          <h2 className={styles.title}>Change Password</h2>
          <p className={styles.subtitle}>Update your account password</p>
        </div>

        {/* Password Form */}
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Security Notice */}
            <div className={styles.securityNotice}>
              <Shield className={styles.shieldIcon} />
              <div>
                <h3 className={styles.noticeTitle}>Security Notice</h3>
                <p className={styles.noticeText}>
                  Choose a strong password that you haven't used elsewhere.
                  We'll log you out of all devices after changing your password.
                </p>
              </div>
            </div>

            {/* Current Password Field */}
            <div className={styles.fieldGroup}>
              <label htmlFor="currentPassword" className={styles.label}>
                Current Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} />
                <input
                  type={showPasswords.current ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className={`${styles.input} ${styles.inputWithToggle} ${
                    errors.currentPassword ? styles.inputError : ""
                  }`}
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className={styles.passwordToggle}
                >
                  {showPasswords.current ? (
                    <EyeOff className={styles.passwordToggleIcon} />
                  ) : (
                    <Eye className={styles.passwordToggleIcon} />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className={styles.errorMessage}>{errors.currentPassword}</p>
              )}
              {!errors.currentPassword && (
                <p className={styles.helperText}>
                  For demo: try "wrongpassword" to see error, or any other
                  password to proceed
                </p>
              )}
            </div>

            {/* New Password Field */}
            <div className={styles.fieldGroup}>
              <label htmlFor="newPassword" className={styles.label}>
                New Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} />
                <input
                  type={showPasswords.new ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={`${styles.input} ${styles.inputWithToggle} ${
                    errors.newPassword ? styles.inputError : ""
                  }`}
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className={styles.passwordToggle}
                >
                  {showPasswords.new ? (
                    <EyeOff className={styles.passwordToggleIcon} />
                  ) : (
                    <Eye className={styles.passwordToggleIcon} />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className={styles.errorMessage}>{errors.newPassword}</p>
              )}

              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className={styles.passwordStrength}>
                  <div className={styles.strengthBar}>
                    <div
                      className={styles.strengthFill}
                      style={{
                        width: `${passwordStrength.strength}%`,
                        backgroundColor: passwordStrength.color,
                      }}
                    ></div>
                  </div>
                  <span
                    className={styles.strengthLabel}
                    style={{ color: passwordStrength.color }}
                  >
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className={styles.fieldGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm New Password
              </label>
              <div className={styles.inputWrapper}>
                <Lock className={styles.inputIcon} />
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`${styles.input} ${styles.inputWithToggle} ${
                    errors.confirmPassword ? styles.inputError : ""
                  }`}
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className={styles.passwordToggle}
                >
                  {showPasswords.confirm ? (
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

            {/* Password Requirements */}
            <div className={styles.requirements}>
              <h4 className={styles.requirementsTitle}>
                Password Requirements:
              </h4>
              <ul className={styles.requirementsList}>
                <li
                  className={
                    formData.newPassword.length >= 8
                      ? styles.requirementMet
                      : styles.requirementUnmet
                  }
                >
                  At least 8 characters long
                </li>
                <li
                  className={
                    /[a-z]/.test(formData.newPassword)
                      ? styles.requirementMet
                      : styles.requirementUnmet
                  }
                >
                  Contains lowercase letter
                </li>
                <li
                  className={
                    /[A-Z]/.test(formData.newPassword)
                      ? styles.requirementMet
                      : styles.requirementUnmet
                  }
                >
                  Contains uppercase letter
                </li>
                <li
                  className={
                    /\d/.test(formData.newPassword)
                      ? styles.requirementMet
                      : styles.requirementUnmet
                  }
                >
                  Contains number
                </li>
              </ul>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <p className={styles.submitError}>{errors.submit}</p>
            )}

            {/* Action Buttons */}
            <div className={styles.buttonGroup}>
              <Link to="/" className={styles.cancelButton}>
                Cancel
              </Link>
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
                    Changing Password...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
