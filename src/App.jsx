import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import DocumentStorage from "./pages/DocumentStoragePage";
import ArchivePage from "./pages/ArchivePage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import {useAuthStore} from "./store/useAuthStore";
import "./styles/App.css";

const App = () => {
  const { user } = useAuthStore();

  return (
    <ConfigProvider>
      <BrowserRouter>
        {user && <Navbar className = "header"/>}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/landing" element={user ? <LandingPage /> : <Navigate to="/" />} />
          <Route path="/storage" element={user ? <DocumentStorage /> : <Navigate to="/" />} />
          <Route path="/archive" element={user ? <ArchivePage /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
