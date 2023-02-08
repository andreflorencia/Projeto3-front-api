import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Company from "./components/pages/Company";
import NewProject from "./components/pages/NewProject";

import Projects from "./components/pages/Projects";
import Project from "./components/pages/Project";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import PrivateRoutes from "./components/utils/PrivateRoutes";
import ComNav from "./components/utils/ComNav";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route element={<ComNav />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/company" element={<Company />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/project/:id" element={<Project />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
