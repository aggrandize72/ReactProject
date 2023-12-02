import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Form, Radio, Input, Button } from "antd";
import logo from "../../image/logo1.png";
import index from "./index.module.css";
import axios from "axios";

export default function Login() {
  const [radio, setRadio] = useState("/student");
  const navigate = useNavigate();

  return (
    <div>
      <Row>
        <Col
          xl={{ span: 6, push: 9 }}
          sm={{ span: 10, push: 6 }}
          xs={{ span: 22, push: 1 }}
        >
          <img src={logo} className={index.img} />
          <Card title="caox 的教育管理系统" style={{ textAlign: "center" }}>
            <Form
              labelCol={{ span: 6 }}
              onFinish={(value) => {
                console.log(value);
                axios
                  .post(`http://localhost:12345${radio}/login`, value, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  .then((response) => {
                    console.log(response.data);
                    navigate(radio);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              <Radio.Group
                value={radio}
                buttonStyle="solid"
                className={index.radio}
                onChange={(e) => setRadio(e.target.value)}
              >
                <Radio.Button value="/teacher">教师</Radio.Button>
                <Radio.Button value="/student">学生</Radio.Button>
                <Radio.Button value="/administrator">管理员</Radio.Button>
              </Radio.Group>
              <hr />
              <br />
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: "请输入用户名" }]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input.Password placeholder="请输入密码" />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{
                    margin: "0 auto",
                    display: "block",
                  }}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
