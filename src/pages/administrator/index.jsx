import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { Layout, Menu, Dropdown, theme, Button, Breadcrumb } from "antd";
import logo from "../../image/p1.png";
import { dropItems, administratorMenuItems as menuItems } from "../../data";
import administratorStyle from "./index.module.css";

const { Header, Content, Sider } = Layout;

export default function AdministratorLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [navurl, setNavurl] = useState([]);
  const [menuDefaultKey, setMenuDefaultKey] = useState(set(pathname));

  useEffect(() => {
    setMenuDefaultKey(set(pathname));
    setNavurl(
      ((pathname) => {
        let arrObj = [];

        const fn = (_arr) => {
          _arr.forEach((n) => {
            const { children, key, label } = n;
            arrObj.push({ title: label, key });

            if (children) {
              fn(children);
            }
          });
        };
        fn(menuItems);
        const temp = arrObj.filter(({ key }) => {
          return pathname.includes(key);
        });

        return temp.length > 0
          ? [{ title: "首页", key: "/teacher" }, ...temp]
          : [];
      })(pathname)
    );
  }, [pathname]);

  function set(pathname) {
    let arrObj = [];

    const fn = (_arr) => {
      _arr.forEach((n) => {
        if (pathname.includes(n.key)) {
          arrObj = [...arrObj, n.key];
          if (n.children) {
            fn(n.children);
          }
        }
      });
    };
    fn(menuItems);
    return arrObj;
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <img src={logo} className={administratorStyle.sider_img} />
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={menuDefaultKey}
          selectedKeys={menuDefaultKey}
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
          <span className={administratorStyle.header_span}>
            caox 的教育管理系统
          </span>
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
              className={administratorStyle.header_img}
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
            className={administratorStyle.breadcrumb}
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
