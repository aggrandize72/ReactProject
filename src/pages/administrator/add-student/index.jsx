import { Button, Card, Form, Input, Modal, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

export default function AddStudent() {
  const [dataSource, setDataSource] = useState([]);
  const [sno, setSno] = useState("");
  const [sname, setSname] = useState("");
  const [isShow, setIsShow] = useState(false);
  const formRef = useRef(null);
  const clickKeyRef = useRef(0);
  const tableData = dataSource.filter(
    ({ sno, sname }) => sname.indexOf(sname) !== -1 && sno.indexOf(sno) !== -1
  );
  useEffect(() => {
    axios
      .get("http://localhost:12345/student")
      .then(({ data: { data } }) => {
        setDataSource(
          data.map((item) => ({ ...item, key: item.sno, update: false }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function saveData() {
    console.log([...dataSource]);
    axios
      .post("http://localhost:12345/student", [...dataSource], {
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
        title="添加学生"
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
          <Form.Item label="学号" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="请输入要查询的学号"
              value={sno}
              onChange={(e) => setSno(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="姓名" style={{ marginBottom: "10px" }}>
            <Input
              placeholder="请输入要查询的姓名"
              value={sname}
              onChange={(e) => setSname(e.target.value)}
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
              key: "s_no",
            },
            {
              title: "姓名",
              dataIndex: "sname",
              key: "s_name",
              render: (sname, m) => {
                return m.update ? (
                  <Input
                    value={m.sname}
                    onChange={(e) => {
                      setDataSource(
                        dataSource.map((item) =>
                          item.key === m.key
                            ? { ...item, sname: e.target.value }
                            : item
                        )
                      );
                    }}
                    rules={[{ required: true, message: "请输入姓名" }]}
                  />
                ) : (
                  <span>{sname}</span>
                );
              },
            },
            {
              title: "性别",
              dataIndex: "ssex",
              key: "s_sex",
              render: (ssex, m) => {
                return m.update ? (
                  <Input
                    value={m.ssex}
                    onChange={(e) => {
                      setDataSource(
                        dataSource.map((item) =>
                          item.key === m.key
                            ? { ...item, ssex: e.target.value }
                            : item
                        )
                      );
                    }}
                    rules={[{ required: true, message: "请输入性别" }]}
                  />
                ) : (
                  <span>{ssex}</span>
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
        title={`确定删除学生 ${clickKeyRef.current.sname} 吗？`}
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
        title="输入添加的学生信息"
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
              key: formRef.current.getFieldsValue().sno,
            },
          ]);
          setIsShow(false);
        }}
      >
        <Form layout="horizontal" style={{ marginTop: "30px" }} ref={formRef}>
          <Form.Item
            label="学号"
            name="sno"
            rules={[{ required: true, message: "请输入学号" }]}
          >
            <Input placeholder="请输入学号" />
          </Form.Item>
          <Form.Item
            label="姓名"
            name="sname"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="性别"
            name="ssex"
            rules={[{ required: true, message: "请输入性别" }]}
          >
            <Input placeholder="请输入性别" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
