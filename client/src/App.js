import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      <BrowserRouter>
        <Routes>
          <Route path="/react" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
