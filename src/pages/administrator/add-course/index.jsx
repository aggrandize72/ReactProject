import { Button, Card, Form, Input, Modal, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

export default function AddCourse() {
  const [dataSource, setDataSource] = useState([]);
  const [cno, setCno] = useState("");
  const [cname, setCname] = useState("");
  const [isShow, setIsShow] = useState(false);
  const formRef = useRef(null);
  const clickKeyRef = useRef(0);
  const tableData = dataSource.filter(
    ({ cno, cname }) => cname.indexOf(cname) !== -1 && cno.indexOf(cno) !== -1
  );
  useEffect(() => {
    axios
      .get("http://localhost:12345/course")
      .then(({ data: { data } }) => {
        setDataSource(
          data.map((item) => ({ ...item, key: item.cno, update: false }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function saveData() {
    console.log([...dataSource]);
    axios
      .post("http://localhost:12345/course", [...dataSource], {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        message.info("上传完成！");
      })
      .catch((error) => {
        message.info("上传失败！");
        console.log(error);
      });
  }

  return (
    <>
      <Card
        title="添加课程"
        extra={
          <>
            <Button
              type="primary"
              onClick={saveData}
              style={{ marginRight: "10px" }}
            >
              保存
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setIsShow("add");
              }}
            >
              <PlusOutlined />
            </Button>
          </>
        }
      >
        <Form layout="inline">
          <Form.Item label="课程编号" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="请输入要查询的课程编号"
              value={cno}
              onChange={(e) => setCno(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="课程名" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="请输入要查询的课程名"
              value={cname}
              onChange={(e) => setCname(e.target.value)}
            />
          </Form.Item>
        </Form>
        <Table
          pagination={{ pageSize: 7 }}
          dataSource={tableData}
          columns={[
            {
              title: "课程编号",
              dataIndex: "key",
              key: "c_no",
            },
            {
              title: "课程名",
              dataIndex: "cname",
              key: "c_name",
              render: (n, m) => {
                return m.update ? (
                  <Input
                    value={m.cname}
                    onChange={(e) => {
                      setDataSource(
                        dataSource.map((item) =>
                          item.key === m.key
                            ? { ...item, cname: e.target.value }
                            : item
                        )
                      );
                    }}
                    rules={[{ required: true, message: "请输入课程名" }]}
                  />
                ) : (
                  <span>{n}</span>
                );
              },
            },
            {
              title: "学分",
              dataIndex: "ccredit",
              key: "c_credit",
              render: (n, m) => {
                return m.update ? (
                  <Input
                    value={m.ccredit}
                    onChange={(e) => {
                      setDataSource(
                        dataSource.map((item) =>
                          item.key === m.key
                            ? { ...item, ccredit: e.target.value }
                            : item
                        )
                      );
                    }}
                    rules={[{ required: true, message: "请输入学分" }]}
                  />
                ) : (
                  <span>{n}</span>
                );
              },
            },
            {
              title: "操作",
              dataIndex: "update",
              render: (update, m) => {
                return (
                  <>
                    <Button
                      danger
                      onClick={() => {
                        clickKeyRef.current = m;
                        setDataSource(
                          dataSource.map((item) =>
                            item.key === m.key
                              ? {
                                  ...item,
                                  update: !update,
                                }
                              : item
                          )
                        );
                      }}
                    >
                      {update ? "确定" : "修改"}
                    </Button>
                    <Button
                      danger
                      onClick={() => {
                        clickKeyRef.current = m;
                        setIsShow("delete");
                      }}
                    >
                      删除
                    </Button>
                  </>
                );
              },
              width: "20%",
            },
          ]}
        ></Table>
      </Card>
      <Modal
        title={`确定删除课程 ${clickKeyRef.current.cname} 吗？`}
        open={isShow === "delete"}
        onCancel={() => {
          setIsShow(false);
        }}
        onOk={() => {
          setDataSource(
            dataSource.filter((item) => item.key !== clickKeyRef.current.key)
          );
          setIsShow(false);
        }}
      ></Modal>
      <Modal
        title="输入添加的课程信息"
        open={isShow === "add"}
        onCancel={() => {
          setIsShow(false);
        }}
        onOk={() => {
          console.log(formRef.current.getFieldsValue());
          setDataSource([
            ...dataSource,
            {
              ...formRef.current.getFieldsValue(),
              key: formRef.current.getFieldsValue().cno,
            },
          ]);
          setIsShow(false);
        }}
      >
        <Form layout="horizontal" style={{ marginTop: "30px" }} ref={formRef}>
          <Form.Item
            label="课程号"
            name="cno"
            rules={[{ required: true, message: "请输入课程号" }]}
          >
            <Input placeholder="请输入课程号" />
          </Form.Item>
          <Form.Item
            label="课程名"
            name="cname"
            rules={[{ required: true, message: "请输入课程名" }]}
          >
            <Input placeholder="请输入课程名" />
          </Form.Item>
          <Form.Item
            label="学分"
            name="ccredit"
            rules={[{ required: true, message: "请输入课程学分" }]}
          >
            <Input type="number" placeholder="请输入课程学分" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
