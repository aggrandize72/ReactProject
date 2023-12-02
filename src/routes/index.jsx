import { Navigate } from "react-router-dom";
import Login from "../pages/login";
import StudentLayout from "../pages/student";
import Welcome from "../pages/welcome";
import QueryStudent from "../pages/query/student";
import QueryTeacher from "../pages/query/teacher";
import QueryGrade from "../pages/query/grade";
import QueryCourse from "../pages/query/course";
import Select from "../pages/student/select";
import TeacherLayout from "../pages/teacher";
import Open from "../pages/teacher/open";
import Update from "../pages/teacher/update";
import AdministratorLayout from "../pages/administrator";
import AddStudent from "../pages/administrator/add-student";
import AddTeacher from "../pages/administrator/add-teacher";
import AddCourse from "../pages/administrator/add-course";
import Personal from "../pages/personal";

export default [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/student",
    element: <StudentLayout />,
    children: [
      {
        path: "course",
        element: <Select />,
      },
      {
        path: "query",
        element: <Welcome />,
        children: [
          {
            path: "student",
            element: <QueryStudent />,
          },
          {
            path: "teacher",
            element: <QueryTeacher />,
          },
          {
            path: "grade",
            element: <QueryGrade />,
          },
          {
            path: "course",
            element: <QueryCourse />,
          },
          {
            path: "",
            element: <Navigate to="student" />,
          },
        ],
      },
      {
        path: "",
        element: <Navigate to="course" />,
      },
    ],
  },
  {
    path: "/teacher",
    element: <TeacherLayout />,
    children: [
      {
        path: "course",
        element: <Welcome />,
        children: [
          {
            path: "open",
            element: <Open />,
          },
          {
            path: "update",
            element: <Update />,
          },
          {
            path: "",
            element: <Navigate to="open" />,
          },
        ],
      },
      {
        path: "query",
        element: <Welcome />,
        children: [
          {
            path: "student",
            element: <QueryStudent />,
          },
          {
            path: "teacher",
            element: <QueryTeacher />,
          },
          {
            path: "grade",
            element: <QueryGrade />,
          },
          {
            path: "course",
            element: <QueryCourse />,
          },
          {
            path: "",
            element: <Navigate to="student" />,
          },
        ],
      },
      {
        path: "",
        element: <Navigate to="course" />,
      },
    ],
  },
  {
    path: "/administrator",
    element: <AdministratorLayout />,
    children: [
      {
        path: "add",
        element: <Welcome />,
        children: [
          {
            path: "student",
            element: <AddStudent />,
          },
          {
            path: "teacher",
            element: <AddTeacher />,
          },
          {
            path: "course",
            element: <AddCourse />,
          },
          {
            path: "",
            element: <Navigate to="student" />,
          },
        ],
      },
      {
        path: "query",
        element: <Welcome />,
        children: [
          {
            path: "student",
            element: <QueryStudent />,
          },
          {
            path: "teacher",
            element: <QueryTeacher />,
          },
          {
            path: "grade",
            element: <QueryGrade />,
          },
          {
            path: "course",
            element: <QueryCourse />,
          },
        ],
      },
      {
        path: "",
        element: <Navigate to="add" />,
      },
    ],
  },
  {
    path: "/personal",
    element: <Personal />,
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
];
