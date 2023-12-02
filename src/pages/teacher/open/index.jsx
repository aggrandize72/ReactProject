import { Button, Card, Form, Input, Modal, Table, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Open() {
  const [dataSource, setDataSource] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [isShow, setIsShow] = useState(false);
  const inputRef = useRef(null);
  const clickKeyRef = useRef(0);
  const tableData = dataSource.filter(
    ({ cname }) => cname.indexOf(filterText) != -1
  );
  useEffect(() => {
    axios
      .get("http://localhost:12345/course/list/20030001")
      .then(({ data: { data } }) => {
        setDataSource(data.map((item) => ({ ...item, key: item.cno })));
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
              console.log({ list: dataSource, no: "20030001" });
              axios
                .post(
                  "http://localhost:12345/course/list",
                  { list: dataSource, no: "20030001" },
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
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </Form.Item>
        </Form>
        <Table
          dataSource={tableData}
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
              title: "学分",
              dataIndex: "ccredit",
              key: "c_credit",
            },
            {
              title: "操作",
              dataIndex: "opened",
              render: (opened, m) => {
                return (
                  <>
                    <Button
                      disabled={!opened}
                      onClick={() => {
                        setDataSource(
                          dataSource.map((item) =>
                            item.key === m.key
                              ? { ...item, opened: false }
                              : item
                          )
                        );
                      }}
                      style={{ marginRight: "10px" }}
                    >
                      退课
                    </Button>
                    <Button
                      disabled={opened}
                      onClick={() => {
                        clickKeyRef.current = m.key;
                        setIsShow(true);
                      }}
                    >
                      {opened ? "已开课" : "开课"}
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
        title="输入"
        open={isShow}
        onCancel={() => {
          setIsShow(false);
        }}
        onOk={() => {
          setDataSource(
            dataSource.map((item) =>
              item.key === clickKeyRef.current
                ? {
                    ...item,
                    opened: true,
                    maxStudent: inputRef.current.input.value,
                  }
                : item
            )
          );
          setIsShow(false);
        }}
      >
        <Form layout="horizontal">
          <Form.Item
            label="最大人数"
            name="maxStudent"
            rules={[{ required: true, message: "请输入允许选课的最大人数" }]}
          >
            <Input
              type="number"
              placeholder="请输入允许选课的最大人数"
              ref={inputRef}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
