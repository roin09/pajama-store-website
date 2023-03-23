import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
const App = () => {
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
