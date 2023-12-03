import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Dropdown,
  theme,
  Button,
  Breadcrumb,
  Modal,
  Form,
  Card,
  Input,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../image/p1.png";
import { dropItems, studentMenuItems as menuItems } from "../../data";
import studentStyle from "./index.module.css";
import { studentSignOut } from "../../store/slices/student";
import axios from "axios";

const { Header, Content, Sider } = Layout;

export default function StudentLayout() {
  const studentInfo = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isShow, setIsShow] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [navurl, setNavurl] = useState([]);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    again: "",
  });
  const [menuDefaultKey, setMenuDefaultKey] = useState(set(pathname));
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (!studentInfo.isLogged) {
      navigate("/login");
    } else {
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
            ? [{ title: "首页", key: "/student" }, ...temp]
            : [];
        })(pathname)
      );
    }
  }, [pathname]);

  function set(key) {
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
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <img src={logo} className={studentStyle.sider_img} />
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
          <span className={studentStyle.header_span}>caox 的教育管理系统</span>
          <Dropdown
            menu={{
              items: dropItems,
              onClick: ({ key }) => {
                if (key === "/login") {
                  dispatch(studentSignOut());
                  navigate(key);
                }
                setIsShow(true);
              },
            }}
            placement="bottom"
            arrow
          >
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
              className={studentStyle.header_img}
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
            className={studentStyle.breadcrumb}
          />
          <Outlet />
        </Content>
      </Layout>
      <Modal
        open={isShow !== false}
        footer={() => {
          return (
            <div>
              <Button
                onClick={() => {
                  switch (isShow) {
                    case "update": {
                      if (
                        studentInfo.student.password === password.oldPassword
                      ) {
                        setIsShow("next");
                      } else {
                        alert("原密码错误");
                      }
                      break;
                    }
                    case "next": {
                      if (password.newPassword === password.again) {
                        axios
                          .put(
                            "http://localhost:12345/student",
                            {
                              ...studentInfo.student,
                              password: password.newPassword,
                            },
                            {
                              headers: {
                                "Content-Type": "application/json",
                              },
                            }
                          )
                          .then(() => {
                            dispatch(studentSignOut());
                            alert("修改成功,请重新登录");
                            navigate("/login");
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      } else {
                        alert("两次密码不一致");
                      }
                      break;
                    }
                    default: {
                      setIsShow("update");
                      break;
                    }
                  }
                }}
              >
                {isShow === "update"
                  ? "下一步"
                  : isShow === "next"
                  ? "确定"
                  : "修改密码"}
              </Button>
            </div>
          );
        }}
        onCancel={() => {
          setPassword({
            oldPassword: "",
            newPassword: "",
            again: "",
          });
          setIsShow(false);
        }}
      >
        <Card title="个人信息">
          {isShow === "update" ? (
            <Form>
              <Form.Item
                label="原密码"
                name="oldPassword"
                rules={[
                  { required: true, message: "请输入允许选课的最大人数" },
                ]}
              >
                <Input.Password
                  placeholder="请输入原密码"
                  value={password.oldPassword}
                  onChange={(e) => {
                    setPassword({
                      ...password,
                      oldPassword: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Form>
          ) : isShow === "next" ? (
            <Form>
              <Form.Item
                label="新密码"
                name="newPassword"
                rules={[
                  { required: true, message: "请输入允许选课的最大人数" },
                ]}
              >
                <Input.Password
                  placeholder="请输入新密码"
                  value={password.newPassword}
                  onChange={(e) => {
                    setPassword({
                      ...password,
                      newPassword: e.target.value,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="再次确认"
                name="again"
                rules={[
                  { required: true, message: "请输入允许选课的最大人数" },
                ]}
              >
                <Input.Password
                  placeholder="请再次确认密码"
                  value={password.again}
                  onChange={(e) => {
                    setPassword({
                      ...password,
                      again: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Form>
          ) : (
            <Form>
              <Form.Item label="学号" name="sno">
                {"\u00A0"}
                {studentInfo.student.sno}
              </Form.Item>
              <Form.Item label="姓名" name="sname">
                {"\u00A0"}
                {studentInfo.student.sname}
              </Form.Item>
              <Form.Item label="性别" name="ssex">
                {"\u00A0"}
                {studentInfo.student.ssex}
              </Form.Item>
            </Form>
          )}
        </Card>
      </Modal>
    </Layout>
  );
}
