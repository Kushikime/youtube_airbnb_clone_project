import "./App.css";

import { Route, Routes } from "react-router";
import Homepage from "@pages/Homepage/Homepage";
import AuthPage from "@pages/AuthPage/AuthPage";
import Layout from "./Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
