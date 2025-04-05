import React from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import DocumentStorage from "./pages/DocumentStoragePage";
import ArchivePage from "./pages/ArchivePage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import "./styles/App.css";

const App = () => {
  const { user } = useAuthStore();

  return (
    <ConfigProvider>
      <HashRouter>
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/landing" element={user ? <LandingPage /> : <Navigate to="/" />} />
          <Route path="/storage" element={user ? <DocumentStorage /> : <Navigate to="/" />} />
          <Route path="/archive" element={user ? <ArchivePage /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </ConfigProvider>
  );
};

export default App;
