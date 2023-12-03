import { Button, Card, Form, Input, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Select() {
  const studentInfo = useSelector((state) => state.student.student);
  const [dataSource, setDataSource] = useState([]);
  const [cname, setCname] = useState("");
  const [tname, setTname] = useState("");
  const tableSource = dataSource.filter(
    (item) => item.cname.indexOf(cname) != -1 && item.tname.indexOf(tname) != -1
  );

  useEffect(() => {
    axios
      .get(`http://localhost:12345/open/list/${studentInfo.sno}`)
      .then(({ data: { data } }) => {
        setDataSource(data.map((item) => ({ ...item, key: item.openId })));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleClick(key) {
    setDataSource(
      dataSource.map((item) =>
        item.key === key ? { ...item, selected: !item.selected } : item
      )
    );
  }

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
                  "http://localhost:12345/open/list",
                  { list: dataSource, no: studentInfo.sno },
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
              onChange={(e) => {
                setCname(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="教师名" style={{ margin: "0 0 10px 40px" }}>
            <Input
              placeholder="请输入要查询的教师名"
              value={tname}
              onChange={(e) => {
                setTname(e.target.value);
              }}
            />
          </Form.Item>
        </Form>
        <Table
          dataSource={tableSource}
          columns={[
            {
              title: "课程编号",
              dataIndex: "key",
              key: "open_id",
            },
            {
              title: "课程名",
              dataIndex: "cname",
              key: "c_name",
            },
            {
              title: "教师",
              dataIndex: "tname",
              key: "t_name",
            },
            {
              title: "最大学生数",
              dataIndex: "maxStudent",
              key: "max_student",
            },
            {
              title: "操作",
              dataIndex: "selected",
              render: (selected, m, k) => {
                return (
                  <>
                    <Button
                      disabled={!selected}
                      onClick={() => {
                        handleClick(m.key);
                      }}
                      style={{ marginRight: "10px" }}
                    >
                      退选
                    </Button>
                    <Button
                      disabled={selected}
                      onClick={() => {
                        handleClick(m.key);
                      }}
                    >
                      {selected ? "已选" : "选择"}
                    </Button>
                  </>
                );
              },
              width: "20%",
            },
          ]}
        ></Table>
      </Card>
    </>
  );
}
