import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  DatabaseOutlined,
  InboxOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
        <Menu.Item
          key="home"
          onClick={() => navigate("/landing")}
          className="menu-item"
          icon={<HomeOutlined />}
        >
          Главная
        </Menu.Item>
        <Menu.Item
          key="storage"
          onClick={() => navigate("/storage")}
          className="menu-item"
          icon={<DatabaseOutlined />}
        >
          Хранилище
        </Menu.Item>
        <Menu.Item
          key="archive"
          onClick={() => navigate("/archive")}
          className="menu-item"
          icon={<InboxOutlined />}
        >
          Архив
        </Menu.Item>
        {user && (
          <Menu.Item
            key="profile"
            onClick={() => navigate("/profile")}
            className="menu-item"
            icon={<UserOutlined />}
          >
            Профиль ({user.username})
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default Navbar;
