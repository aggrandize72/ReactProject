import { Card, Form, Input, Table, Switch } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function QueryStudent() {
  const url = [
    "http://localhost:12345/student",
    "http://localhost:12345/student/selected",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [inputSname, setInputSname] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const tableData = dataSource.filter(
    ({ sname }) => sname.indexOf(inputSname) != -1
  );

  useEffect(() => {
    axios
      .get(url[0])
      .then(({ data: { data } }) => {
        setDataSource(
          data.map(({ sno, sname, ssex }) => ({ key: sno, sname, ssex }))
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
          data.map(({ sno, sname, ssex }) => ({ key: sno, sname, ssex }))
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
        title="学生查询"
        extra={
          <div>
            <Switch
              checked={isOpen}
              onClick={handleClick}
              style={{ marginRight: "8px" }}
            />
            选课学生
          </div>
        }
      >
        <Form layout="inline">
          <Form.Item label="学生名" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="请输入要查询的学生"
              value={inputSname}
              onChange={(e) => setInputSname(e.target.value)}
            />
          </Form.Item>
        </Form>

        <Table
          pagination={{ pageSize: 7 }}
          dataSource={tableData}
          columns={[
            {
              title: "学号",
              dataIndex: "key",
              key: "key",
            },
            {
              title: "名字",
              dataIndex: "sname",
              key: "s_name",
            },
            {
              title: "性别",
              dataIndex: "ssex",
              key: "s_sex",
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
