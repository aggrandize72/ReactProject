// import Student from "./components/Student";
// import Teacher from "./components/Teacher";
import { useRoutes } from "react-router-dom";
// import MyLayout from "./MyLayout";
import routes from "./routes";

export default function App() {
  const element = useRoutes(routes);
  return <>{element}</>;
}
