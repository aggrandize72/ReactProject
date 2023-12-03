import { Button, Card, Form, Input, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Update() {
  const [dataSource, setDataSource] = useState([]);
  const [cname, setCname] = useState("");
  const [sname, setSname] = useState("");

  const teacherInfo = useSelector((state) => state.teacher.teacher);
  const tableData = dataSource.filter(
    ({ cname, sname }) =>
      cname.indexOf(cname) != -1 && sname.indexOf(sname) != -1
  );
  useEffect(() => {
    axios
      .get(`http://localhost:12345/grade/${teacherInfo.tno}`)
      .then(({ data: { data } }) => {
        setDataSource(data.map((item) => ({ ...item, key: item.gradeId })));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Card
        title="课程管理"
        extra={
          <Button
            type="primary"
            onClick={() => {
              axios
                .post(
                  "http://localhost:12345/grade",
                  { list: dataSource, no: teacherInfo.tno },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then(() => {
                  message.info("上传完成！");
                })
                .catch((error) => {
                  message.info("上传失败！");
                  console.log(error);
                });
            }}
          >
            保存
          </Button>
        }
      >
        <Form layout="inline">
          <Form.Item label="课程名" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="请输入要查询的课程名"
              value={cname}
              onChange={(e) => setCname(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="学生" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="请输入要查询的学生"
              value={sname}
              onChange={(e) => setSname(e.target.value)}
            />
          </Form.Item>
        </Form>
        <Table
          dataSource={tableData}
          columns={[
            {
              title: "课程编号",
              dataIndex: "key",
              key: "grade_id",
            },
            {
              title: "课程名",
              dataIndex: "cname",
              key: "c_name",
            },
            {
              title: "学生",
              dataIndex: "sname",
              key: "s_name",
            },
            {
              title: "成绩",
              dataIndex: "score",
              width: "12%",
              render: (score, m, k) => {
                return (
                  <Input
                    value={score}
                    onChange={(e) => {
                      setDataSource(
                        dataSource.map((item) =>
                          item.key === m.key
                            ? { ...item, score: e.target.value }
                            : item
                        )
                      );
                    }}
                  />
                );
              },
            },
          ]}
        ></Table>
      </Card>
    </>
  );
}
