import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button, Typography } from "antd";
import {useAuthStore} from "../store/useAuthStore";
import "../styles/LoginPage.css";

const { Title } = Typography;

const users = [
  { username: "admin1", password: "admin123", role: "admin" },
  { username: "admin2", password: "admin123", role: "admin" },
  { username: "admin3", password: "admin123", role: "admin" },
  { username: "worker1", password: "worker123", role: "worker" },
  { username: "worker2", password: "worker123", role: "worker" },
  { username: "worker3", password: "worker123", role: "worker" },
  { username: "worker4", password: "worker123", role: "worker" },
  { username: "worker5", password: "worker123", role: "worker" },
];

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setUser(user);
      navigate("/landing");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={3}>Вход в систему</Title>
        <Input
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input.Password
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-text">{error}</p>}
        <Button type="primary" onClick={handleLogin} block>
          Войти
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;
