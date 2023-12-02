import { Card, Form, Input, Table, Switch } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function QueryStudent() {
  const [inputSname, setInputSname] = useState("");
  const [inputCname, setInputCname] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const tableData = dataSource.filter(
    ({ cname, sname, score }) =>
      cname.indexOf(inputCname) !== -1 &&
      sname.indexOf(inputSname) !== -1 &&
      score !== null
  );

  useEffect(() => {
    axios
      .get("http://localhost:12345/grade")
      .then(({ data: { data } }) => {
        console.log(data);
        setDataSource(
          data.map(({ gradeId, ...info }) => ({ key: gradeId, ...info }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Card title="成绩查询">
        <Form layout="inline">
          <Form.Item label="课程名" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="请输入要查询的课程名"
              value={inputCname}
              onChange={(e) => setInputCname(e.target.value)}
            />
          </Form.Item>
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
              title: "成绩编号",
              dataIndex: "key",
              key: "key",
            },
            {
              title: "课程名",
              dataIndex: "cname",
              key: "c_name",
            },
            {
              title: "学生名",
              dataIndex: "sname",
              key: "s_name",
            },
            {
              title: "成绩",
              dataIndex: "score",
              key: "score",
            },
          ]}
        ></Table>
      </Card>
    </>
  );
}
