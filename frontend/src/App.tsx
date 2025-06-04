import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/login/Register";

function App() {
  const [token, setToken] = useState("");

  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginPage setToken={setToken} />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/" element={<LoginPage setToken={setToken} />} />
    </Routes>
    </>
  );
}

export default App;
