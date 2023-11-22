import { SearchOutlined, SelectOutlined } from "@ant-design/icons";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const dropItems = [
  {
    key: "/login",
    label: <div>退出登录</div>,
  },
  {
    key: "/personal",
    label: <div>个人信息</div>,
  },
];

export const menuItems = [
  getItem("课程管理", "/student/course", <SelectOutlined />),
  getItem("查询信息", "/student/query", <SearchOutlined />, [
    getItem("查询学生", "/student/query/student"),
    getItem("查询教师", "/student/query/teacher"),
    getItem("查询成绩", "/student/query/grade"),
    getItem("查询课程", "/student/query/course"),
  ]),
];
