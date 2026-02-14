import { useState, useEffect } from "react";
import { User, Mail, Camera, ArrowLeft, Save } from "lucide-react";
import styles from "./edit-profile.module.css";
import { Link } from "react-router-dom";
import { EditProfileErrors } from "../../types";
import { UserInfo } from "../../types/index.ts";
import { BASE_URL } from "../../config";

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "john.doe@example.com",
    nickname: "John Doe",
  });
  const [errors, setErrors] = useState<EditProfileErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const validateForm = () => {
    const newErrors: EditProfileErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, hyphens, and underscores";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.nickname.trim()) {
      newErrors.nickname = "Display name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name in errors && errors[name as keyof EditProfileErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          avatar: "File size must be less than 5MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setAvatarPreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);

      setErrors((prev) => ({ ...prev, avatar: "" }));
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
      const token = localStorage.getItem("token");
      if (!token) return;
      const updatedFields = {} as any;
      if (formData.username !== userInfo?.username) {
        updatedFields.username = formData.username;
      }
      if (formData.nickname !== userInfo?.nickname) {
        updatedFields.nickname = formData.nickname;
      }
      if (formData.email !== userInfo?.email) {
        updatedFields.email = formData.email;
      }
      const response = await fetch(`${BASE_URL}/user/me`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        return;
      }

      alert("Profile updated successfully!");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to update profile. Please try again.",
      }));
      setError("Something went wrong while updating your profile.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in.");
          return;
        }
        const response = await fetch(`${BASE_URL}/user/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await response.json();

        setFormData({
          username: data.username,
          email: data.email,
          nickname: data.nickname,
        });
        setUserInfo({
          username: data.username,
          email: data.email,
          nickname: data.nickname,
        });
      } catch (err) {
        setError("Failed to fetch user info. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserInfo();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <Link to="/" className={styles.backLink}>
            <ArrowLeft className={styles.backIcon} />
            Back to CodeChat
          </Link>
          <h2 className={styles.title}>Edit Profile</h2>
          <p className={styles.subtitle}>Update your personal information</p>
        </div>

        {/* Profile Form */}
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <p className={styles.submitError}>{error}</p>}
            {/* Avatar Section */}
            <div className={styles.avatarSection}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  {avatarPreview ? (
                    <img
                      src={avatarPreview || "/placeholder.svg"}
                      alt="Avatar preview"
                      className={styles.avatarImage}
                    />
                  ) : (
                    <span className={styles.avatarText}>
                      {userInfo?.username
                        ? userInfo.username.substring(0, 1)
                        : ""}
                    </span>
                  )}
                </div>
                <label htmlFor="avatar-upload" className={styles.avatarUpload}>
                  <Camera className={styles.cameraIcon} />
                  <span className={styles.uploadText}>Change Photo</span>
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className={styles.hiddenInput}
                />
              </div>
              {errors.avatar && (
                <p className={styles.errorMessage}>{errors.avatar}</p>
              )}
            </div>

            {/* Display Name Field */}
            <div className={styles.fieldGroup}>
              <label htmlFor="nickname" className={styles.label}>
                Nickname
              </label>
              <div className={styles.inputWrapper}>
                <User className={styles.inputIcon} />
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.nickname ? styles.inputError : ""
                  }`}
                  placeholder="Enter your display name"
                />
              </div>
              {errors.nickname && (
                <p className={styles.errorMessage}>{errors.nickname}</p>
              )}
            </div>

            {/* Username Field */}
            <div className={styles.fieldGroup}>
              <label htmlFor="username" className={styles.label}>
                User Name
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
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className={styles.saveIcon} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
