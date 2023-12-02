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

export const studentMenuItems = [
  getItem("课程管理", "/student/course", <SelectOutlined />),
  getItem("查询信息", "/student/query", <SearchOutlined />, [
    getItem("查询学生", "/student/query/student"),
    getItem("查询教师", "/student/query/teacher"),
    getItem("查询成绩", "/student/query/grade"),
    getItem("查询课程", "/student/query/course"),
  ]),
];

export const teacherMenuItems = [
  getItem("课程管理", "/teacher/course", <SelectOutlined />, [
    getItem("开设课程", "/teacher/course/open"),
    getItem("录入成绩", "/teacher/course/update"),
  ]),
  getItem("查询信息", "/teacher/query", <SearchOutlined />, [
    getItem("查询学生", "/teacher/query/student"),
    getItem("查询教师", "/teacher/query/teacher"),
    getItem("查询成绩", "/teacher/query/grade"),
    getItem("查询课程", "/teacher/query/course"),
  ]),
];

export const administratorMenuItems = [
  getItem("信息管理", "/administrator/add", <SelectOutlined />, [
    getItem("添加学生", "/administrator/add/student"),
    getItem("添加教师", "/administrator/add/teacher"),
    getItem("添加课程", "/administrator/add/course"),
  ]),
  getItem("查询信息", "/administrator/query", <SearchOutlined />, [
    getItem("查询学生", "/administrator/query/student"),
    getItem("查询教师", "/administrator/query/teacher"),
    getItem("查询成绩", "/administrator/query/grade"),
    getItem("查询课程", "/administrator/query/course"),
  ]),
];
