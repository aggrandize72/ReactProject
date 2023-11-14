import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme, Dropdown } from "antd";
import logo from "./image/p1.png";
// import routes from "./routes";
import { dropItems, siderItems } from "./data";
import "./MyLayout.css";

const { Header, Content, Footer, Sider } = Layout;

export default function MyLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["/student"]}
          mode="inline"
          onClick={({ key }) => {
            navigate(key);
          }}
          items={siderItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <span className="headerSpan">曹兴的教育管理系统</span>
          <Dropdown
            menu={{
              items: dropItems,
            }}
            placement="bottom"
            arrow
          >
            <a
              onClick={(e) => {
                e.defaultPrevented();
              }}
              className="headerImg"
            >
              <img
                src={logo}
                style={{
                  width: "30px",
                  borderRadius: "100%",
                }}
              />
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <>{Outlet}</>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
