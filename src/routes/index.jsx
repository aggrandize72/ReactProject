import { Navigate } from "react-router-dom";
import Login from "../pages/login";
import StudentLayout from "../pages/student";
import Welcome from "../pages/welcome";
import QueryStudent from "../pages/query/student";
import QueryTeacher from "../pages/query/teacher";
import QueryGrade from "../pages/query/grade";
import QueryCourse from "../pages/query/course";
import List from "../pages/student/list";

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
        element: <List />,
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
        element: <Navigate to="course" />,
      },
    ],
  },
  {
    path: "/teacher",
    element: <StudentLayout />,
    children: [
      {
        path: "course",
        element: <List />,
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
        element: <Navigate to="course" />,
      },
    ],
  },
  {
    path: "/administrator",
    element: <StudentLayout />,
    children: [
      {
        path: "course",
        element: <List />,
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
        element: <Navigate to="course" />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
];
