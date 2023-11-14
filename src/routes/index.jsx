import Student from "../components/Student";
import Teacher from "../components/Teacher";
import MyLayout from "../MyLayout";
import Login from "../components/Login";
import { Navigate } from "react-router-dom";

export default [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <MyLayout />,
    children: [
      {
        path: "student",
        element: <Student />,
      },
      {
        path: "teacher",
        element: <Teacher />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
];
