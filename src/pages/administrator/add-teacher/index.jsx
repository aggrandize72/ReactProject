import { Button, Card, Form, Input, Modal, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

export default function AddTeacher() {
  const [dataSource, setDataSource] = useState([]);
  const [tno, setTno] = useState("");
  const [tname, setTname] = useState("");
  const [isShow, setIsShow] = useState(false);
  const formRef = useRef(null);
  const clickKeyRef = useRef(0);
  const tableData = dataSource.filter(
    ({ tno, tname }) => tname.indexOf(tname) !== -1 && tno.indexOf(tno) !== -1
  );
  useEffect(() => {
    axios
      .get("http://localhost:12345/teacher")
      .then(({ data: { data } }) => {
        setDataSource(
          data.map((item) => ({ ...item, key: item.tno, update: false }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function saveData() {
    console.log([...dataSource]);
    axios
      .post("http://localhost:12345/teacher", [...dataSource], {
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
        title="添加教师"
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
          <Form.Item label="工号" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="请输入要查询的工号"
              value={tno}
              onChange={(e) => setTno(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="姓名" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="请输入要查询的姓名"
              value={tname}
              onChange={(e) => setTname(e.target.value)}
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
              key: "t_no",
            },
            {
              title: "姓名",
              dataIndex: "tname",
              key: "t_name",
              render: (tname, m) => {
                return m.update ? (
                  <Input
                    value={m.tname}
                    onChange={(e) => {
                      setDataSource(
                        dataSource.map((item) =>
                          item.key === m.key
                            ? { ...item, tname: e.target.value }
                            : item
                        )
                      );
                    }}
                    rules={[{ required: true, message: "请输入姓名" }]}
                  />
                ) : (
                  <span>{tname}</span>
                );
              },
            },
            {
              title: "年龄",
              dataIndex: "tage",
              key: "t_age",
              render: (tage, m) => {
                return m.update ? (
                  <Input
                    value={m.tage}
                    onChange={(e) => {
                      setDataSource(
                        dataSource.map((item) =>
                          item.key === m.key
                            ? { ...item, tage: e.target.value }
                            : item
                        )
                      );
                    }}
                    rules={[{ required: true, message: "请输入性别" }]}
                  />
                ) : (
                  <span>{tage}</span>
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
        title={`确定删除教师 ${clickKeyRef.current.tname} 的信息吗？`}
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
        title="输入添加的教师信息"
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
              key: formRef.current.getFieldsValue().tno,
            },
          ]);
          setIsShow(false);
        }}
      >
        <Form layout="horizontal" style={{ marginTop: "30px" }} ref={formRef}>
          <Form.Item
            label="工号"
            name="tno"
            rules={[{ required: true, message: "请输入工号" }]}
          >
            <Input placeholder="请输入工号" />
          </Form.Item>
          <Form.Item
            label="姓名"
            name="tname"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="年龄"
            name="tage"
            rules={[{ required: true, message: "请输入年龄" }]}
          >
            <Input type="number" placeholder="请输入年龄" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
