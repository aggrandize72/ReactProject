import { Card, Form, Input, Table, Switch } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function QueryStudent() {
  const url = [
    "http://localhost:12345/course",
    "http://localhost:12345/course/open",
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [inputCname, setInputCname] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const tableData = dataSource.filter(
    ({ cname }) => cname.indexOf(inputCname) != -1
  );

  useEffect(() => {
    axios
      .get(url[0])
      .then(({ data: { data } }) => {
        setDataSource(
          data.map(({ cno, cname, ccredit }) => ({ key: cno, cname, ccredit }))
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
          data.map(({ cno, cname, ccredit }) => ({ key: cno, cname, ccredit }))
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
        title="课程查询"
        extra={
          <div>
            <Switch
              checked={isOpen}
              onClick={handleClick}
              style={{ marginRight: "8px" }}
            />
            开课课程
          </div>
        }
      >
        <Form layout="inline">
          <Form.Item label="课程名" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="请输入要查询的课程"
              value={inputCname}
              onChange={(e) => setInputCname(e.target.value)}
            />
          </Form.Item>
        </Form>

        <Table
          pagination={{ pageSize: 7 }}
          dataSource={tableData}
          columns={[
            {
              title: "课程号",
              dataIndex: "key",
              key: "key",
            },
            {
              title: "课程名",
              dataIndex: "cname",
              key: "c_name",
            },
            {
              title: "学分",
              dataIndex: "ccredit",
              key: "c_credit",
            },
            {
              title: "...",
              key: "...",
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
