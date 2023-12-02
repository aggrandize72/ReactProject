import { Card, Form, Input, Table, Switch } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function QueryStudent() {
  const url = [
    "http://localhost:12345/teacher",
    "http://localhost:12345/teacher/opened",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [inputTname, setInputTname] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const tableData = dataSource.filter(
    ({ tname }) => tname.indexOf(inputTname) !== -1
  );

  useEffect(() => {
    axios
      .get(url[0])
      .then(({ data: { data } }) => {
        setDataSource(
          data.map(({ tno, tname, tage }) => ({ key: tno, tname, tage }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleClick() {
    axios
      .get(url[isOpen ? 0 : 1])
      .then(({ data: { data } }) => {
        setDataSource(
          data.map(({ tno, tname, tage }) => ({ key: tno, tname, tage }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Card
        title="教师查询"
        extra={
          <div>
            <Switch
              checked={isOpen}
              onClick={handleClick}
              style={{ marginRight: "8px" }}
            />
            开课教师
          </div>
        }
      >
        <Form layout="inline">
          <Form.Item label="教师名" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="请输入要查询的教师"
              value={inputTname}
              onChange={(e) => setInputTname(e.target.value)}
            />
          </Form.Item>
        </Form>

        <Table
          pagination={{ pageSize: 7 }}
          dataSource={tableData}
          columns={[
            {
              title: "工号",
              dataIndex: "key",
              key: "key",
            },
            {
              title: "名字",
              dataIndex: "tname",
              key: "t_name",
            },
            {
              title: "年龄",
              dataIndex: "tage",
              key: "t_age",
            },
            {
              title: "照片",
              key: "photo",
              render() {
                return <div>loading...</div>;
              },
            },
          ]}
        ></Table>
      </Card>
    </>
  );
}
