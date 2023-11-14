import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";

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
    key: "1",
    label: (
      <a rel="退出登录" href="/">
        退出登录
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a rel="noopener noreferrer" href="/personal">
        个人信息
      </a>
    ),
  },
];

export const siderItems = [
  getItem("学生界面", "/admin/student", <PieChartOutlined />),
  getItem("教师界面", "/admin/teacher", <DesktopOutlined />),
];
