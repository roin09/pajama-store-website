import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
const routerData = [
  {
    id: 0,
    path: "/react",
    label: "Main",
    element: <Main />,
    withAuth: false,
  },
  {
    id: 1,
    path: "/react/register",
    label: "Register",
    element: <Register />,
    withAuth: false,
  },
  {
    id: 2,
    path: "/react/login",
    label: "Login",
    element: <Login />,
    withAuth: true,
  },
  {
    id: 3,
    path: "*",
    label: "Error",
    element: <Main />,
    withAuth: false,
  },
  // {
  //   id:,
  //   path:,
  //   label,
  //   element,
  //   withAuth
  //   }
];

export const routers = createBrowserRouter(
  routerData.map((ele) => {
    if (ele.withAuth) {
      return {
        path: ele.path,
        element: ele.element,
      };
    }
    return {
      path: ele.path,
      element: ele.element,
    };
  })
);

// export const SidebarContent = []
