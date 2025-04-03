import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography } from "antd";
import "../styles/landing.css";

const { Title } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <Card className="landing-card">
        <Title level={2}>Добро пожаловать в систему управления документами</Title>
        <Button type="primary" onClick={() => navigate("/storage")} block>
          Перейти в хранилище документов
        </Button>
        <Button type="default" onClick={() => navigate("/archive")} block>
          Перейти в архив документов
        </Button>
      </Card>
    </div>
  );
};

export default LandingPage;
