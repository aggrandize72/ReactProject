import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { Layout, Menu, Dropdown, theme, Button, Breadcrumb } from "antd";
import logo from "../../image/p1.png";
import { dropItems, menuItems } from "../../data";
import index from "./index.module.css";

const { Header, Content, Sider } = Layout;

export default function StudentLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { pathname } = useLocation();
  const menuDefaultKey = ((key) => {
    let arrObj = [];

    const fn = (_arr) => {
      _arr.forEach((n) => {
        if (key.includes(n.key)) {
          arrObj = [...arrObj, n.key];
          if (n.children) {
            fn(n.children);
          }
        }
      });
    };
    fn(menuItems);

    return arrObj;
  })(pathname);

  const [navurl, setNavurl] = useState([]);
  useEffect(() => {
    setNavurl(
      ((pathname) => {
        let arrObj = [];

        const fn = (_arr) => {
          _arr.forEach((n) => {
            const { children, key, label } = n;
            arrObj.push({ title: label, key });

            if (n.children) {
              fn(n.children);
            }
          });
        };
        fn(menuItems);
        const temp = arrObj.filter(({ key }) => {
          return pathname.includes(key);
        });

        return temp.length > 0
          ? [{ title: "首页", key: "/student" }, ...temp]
          : [];
      })(pathname)
    );
  }, [pathname]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <img src={logo} className={index.sider_img} />
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={menuDefaultKey}
          defaultSelectedKeys={menuDefaultKey}
          items={menuItems}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <span className={index.header_span}>caox 的教育管理系统</span>
          <Dropdown
            menu={{
              items: dropItems,
              onClick: ({ key }) => {
                navigate(key);
              },
            }}
            placement="bottom"
            arrow
          >
            <a
              onClick={(e) => {
                e.defaultPrevented();
              }}
              className={index.header_img}
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
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Breadcrumb
            itemRender={(item, params, items, paths) => {
              const last = items.indexOf(item) === items.length - 1;
              return last ? (
                <span>{item.title}</span>
              ) : (
                <Link to={paths.join(item.key)} style={{ cursor: "pointer" }}>
                  {item.title}
                </Link>
              );
            }}
            items={navurl}
            separator=">"
            className={index.breadcrumb}
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
