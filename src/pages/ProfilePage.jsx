import React from "react";
import { Card, Typography, Button } from "antd";
import { useAuthStore} from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useDocumentStore } from "../store/useDocumentStore";

import "../styles/ProfilePage.css";

const { Title, Text } = Typography;

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const { documents } = useDocumentStore();
  const navigate = useNavigate();

  if (!user) {
    return <p>Вы не авторизованы</p>;
  }

  const userDocuments = documents.filter((doc) => doc.uploader === user.username);

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <Title level={3}>Кабинет пользователя</Title>
        <Text strong>Логин: </Text> {user.username}
        <br />
        <Text strong>Роль: </Text> {user.role === "admin" ? "Администратор" : "Работник"}
        <br />
        <br />
        <Button type="primary" danger onClick={logout} block>
          Выйти
        </Button>
      </Card>
    </div>
  );
};

export default ProfilePage;
