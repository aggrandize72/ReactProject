import { Button, Card, Form, Input, Modal, Table, Switch } from "antd";
import React, { useState } from "react";

export default function QueryStudent() {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  const tableData = dataSource.filter(
    (item) => item.name.indexOf(filterText) != -1
  );

  return (
    <>
      <Card
        title="教师查询"
        extra={
          <div>
            <Switch
              checked={isOpen}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          </div>
        }
      >
        <Form layout="inline">
          <Form.Item label="教师名" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="请输入要查询的姓名"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </Form.Item>
        </Form>

        <Table dataSource={tableData} columns={columns}></Table>
      </Card>
    </>
  );
}

const columns = [
  {
    title: "序号",
    key: "id",
    render: (n, m, k) => {
      return <span>{k + 1}</span>;
    },
  },
  {
    title: "课程号",
    dataIndex: "no",
    key: "c_no",
  },
  {
    title: "课程名",
    dataIndex: "name",
    key: "c_name",
  },
  {
    title: "学分",
    dataIndex: "credit",
    key: "c_credit",
  },
  {
    title: "",
    key: "c_button",
    render: () => {
      return <Button></Button>;
    },
    width: "10%",
  },
];

const dataSource = [
  {
    key: 1,
    no: "0201",
    name: "数学",
    credit: 3,
  },
  {
    key: 2,
    no: "0202",
    name: "英语",
    credit: 2,
  },
];
