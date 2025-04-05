import React, { useState } from "react";
import { Table, Input, Button, Upload, message, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDocumentStore } from "../store/useDocumentStore";
import { useAuthStore } from "../store/useAuthStore";
import "../styles/DocumentStoragePage.css";

const DocumentStoragePage = () => {
  const { documents, addDocument, archiveDocument, removeDocument } = useDocumentStore();
  const [search, setSearch] = useState("");
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuthStore();

  const handleUpload = () => {
    if (!name || !file) {
      message.error("Название и файл обязательны!");
      return;
    }
    addDocument({ name, description, file, date: new Date().toLocaleString() });
    setName("");
    setDescription("");
    setFile(null);
    message.success("Документ добавлен!");
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { title: "Название", dataIndex: "name", key: "name" },
    { title: "Описание", dataIndex: "description", key: "description" },
    { title: "Дата добавления", dataIndex: "date", key: "date" },
    {
      title: "Действия",
      render: (_, record) => (
        <div className="action-buttons">
          <Button className="action-btn" onClick={() => archiveDocument(record.id)}>
            Архивировать
          </Button>
          {user && user.role === "admin" && (
            <Button className="delete-btn" onClick={() => removeDocument(record.id)} danger>
              Удалить
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="storage-container">
      <Card className="upload-card">
        <Input
          placeholder="Название документа"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="upload-input"
        />
        <Input.TextArea
          placeholder="Описание (необязательно)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="upload-textarea"
        />
        <Upload
          beforeUpload={(file) => {
            setFile(file);
            return false;
          }}
          className="upload-section"
        >
          <Button icon={<UploadOutlined />} className="ant-btn">
            Выбрать файл
          </Button>
        </Upload>
        <Button type="primary" onClick={handleUpload} block className="upload-btn">
          Выгрузить файл
        </Button>
      </Card>
      <Input
        placeholder="Поиск по названию"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <Table
        columns={columns}
        dataSource={filteredDocuments}
        pagination={{ pageSize: 10 }}
        rowKey="key"
        className="document-table"
      />
    </div>
  );
};

export default DocumentStoragePage;
