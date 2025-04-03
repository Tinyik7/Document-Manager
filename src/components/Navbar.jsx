import React from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

import "../styles/navbar.css";

const { Header } = Layout;

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
  
    return (
      <Header className="navbar">
        <Menu theme="dark" mode="horizontal" selectable={false} className="menu">
        <Menu.Item key="home"onClick={() => navigate("/landing")}className="menu-item">
          Главная
        </Menu.Item>
          <Menu.Item key="storage" onClick={() => navigate("/storage")} className="menu-item">
            Хранилище
          </Menu.Item>
          <Menu.Item key="archive" onClick={() => navigate("/archive")} className="menu-item">
            Архив
          </Menu.Item>
          <Menu.Item key="profile" onClick={() => navigate("/profile")} className="menu-item profile-menu">
            Профиль ({user.username})
          </Menu.Item>
        </Menu>
      </Header>
    );
  };

export default Navbar;
