import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routers } from "./router";
import Main from "./pages/Main";
import { useEffect } from "react";

const App = () => {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
};

export default App;
