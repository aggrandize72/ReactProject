import { Button, Card, Form, Input, Modal, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";

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
  {
    key: 3,
    no: "0202",
    name: "英语",
    credit: 2,
  },
  {
    key: 4,
    no: "0202",
    name: "英语",
    credit: 2,
  },
  {
    key: 5,
    no: "0202",
    name: "英语",
    credit: 2,
  },
  {
    key: 6,
    no: "0202",
    name: "英语",
    credit: 2,
  },
  {
    key: 7,
    no: "0202",
    name: "英语",
    credit: 2,
  },
];

export default function List() {
  const [isShow, setIsShow] = useState(false);
  const [filterText, setFilterText] = useState("");
  const tableData = dataSource.filter(
    (item) => item.name.indexOf(filterText) != -1
  );
  const [isDisabled, setIsDisabled] = useState(
    Array(tableData.length).fill(false)
  );
  console.log(isDisabled);
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
      title: "操作",
      key: "c_button",
      render: (n, m, k) => {
        return (
          <>
            <Button
              onClick={() => handleOnClickDropButton(k)}
              style={{ marginRight: "10px" }}
            >
              退选
            </Button>
            <Button
              disabled={isDisabled[k]}
              onClick={() => handleOnClickSelectButton(k)}
            >
              {isDisabled[k] ? "已选" : "选择"}
            </Button>
          </>
        );
      },
      width: "20%",
    },
  ];

  function handleOnClickSelectButton(index) {
    console.log("1111", index);
    const nextIsDisabled = isDisabled;
    nextIsDisabled[index] = true;
    setIsDisabled(nextIsDisabled);
    console.log(nextIsDisabled);
  }

  function handleOnClickDropButton(index) {
    console.log("2222", index);
    const nextIsDisabled = isDisabled;
    nextIsDisabled[index] = false;
    setIsDisabled(nextIsDisabled);
    console.log(nextIsDisabled);
  }

  return (
    <>
      <Card
        title="课程管理"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsShow(true);
            }}
          ></Button>
        }
      >
        <Form layout="inline">
          <Form.Item label="课程名" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="请输入要查询的课程名"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </Form.Item>
        </Form>
        <Table dataSource={tableData} columns={columns}></Table>
      </Card>
      {/* <Modal
        title="输入"
        open={isShow}
        onCancel={() => {
          setIsShow(false);
        }}
      ></Modal> */}
    </>
  );
}
