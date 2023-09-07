import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Login from "./components/Login";
import Main from "./components/Main";
import { useGlobalContext } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { setAccessToken, accessToken, setUser, user } = useGlobalContext();

  useEffect(() => {
    if (!window.location.hash) return;
    const newAccessToken = window.location.hash.split("=")[1].split("&")[0];
    setAccessToken(newAccessToken);
    window.history.replaceState({}, "http://localhost:5173/", "/");
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    setUser();
  }, [accessToken]);

  if (!user) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="*" element={<Main />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
