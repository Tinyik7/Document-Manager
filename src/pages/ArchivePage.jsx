import React, { useState } from "react";
import { Table, Input, Button, Card } from "antd";
import { useDocumentStore } from "../store/useDocumentStore";
import "../styles/archive.css";

const ArchivePage = () => {
  const { archivedDocuments, restoreDocument } = useDocumentStore();
  const [search, setSearch] = useState("");

  const filteredDocuments = archivedDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { title: "Название", dataIndex: "name", key: "name" },
    { title: "Описание", dataIndex: "description", key: "description" },
    { title: "Дата архивирования", dataIndex: "date", key: "date" },
    {
      title: "Действия",
      render: (_, record) => (
        <Button onClick={() => restoreDocument(record.id)}>Восстановить</Button>
      ),
    },
  ];

  return (
    <div className="archive-container">
      <Card className="search-card">
        <Input
          placeholder="Поиск по названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </Card>
      <Table columns={columns} dataSource={filteredDocuments} pagination={{ pageSize: 10 }} rowKey="key" />
    </div>
  );
};

export default ArchivePage;
