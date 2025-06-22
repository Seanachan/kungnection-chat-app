import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/login/Register";
import ChatInterface from "./components/ChatInterface";
import EditProfilePage from "./components/edit-profile/page";
import ChangePasswordPage from "./components/change-passwd/page";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [activeChannel, setActiveChannel] = useState<{
    code: string;
    name: string;
    type: string;
  }>({ code: "", name: "", type: "" });
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false");
      return;
    }

    localStorage.setItem("isLoggedIn", isLoggedIn.toString());

    let logoutTimer: NodeJS.Timeout;

    if (isLoggedIn) {
      logoutTimer = setTimeout(
        () => {
          localStorage.removeItem("token");
          localStorage.setItem("isLoggedIn", "false");
          setIsLoggedIn(false);
          alert("You have been logged out due to inactivity.");
        },
        30 * 60 * 1000,
      ); // 30 minutes
    }

    return () => clearTimeout(logoutTimer);
  }, [isLoggedIn]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/chat" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/edit-profile"
          element={
            isLoggedIn ? <EditProfilePage/> : <Navigate to="/login" />
          }
        />

        <Route
          path="/change-passwd"
          element={
            isLoggedIn ? <ChangePasswordPage/> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/chat" replace />
            ) : (
              <LoginPage setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/chat"
          element={
            isLoggedIn ? (
              <ChatInterface
                activeChannel={activeChannel}
                setActiveChannel={setActiveChannel}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/chat" /> : <RegisterPage />}
        />
      </Routes>
    </>
  );
}

export default App;
