import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { createBrowserHistory, createHashHistory } from "history";
import "./App.css";
import Header from "./Header";
import SideBar from "./component/SideBar/SideBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Projects from "./pages/Projects/Projects";
import About from "./pages/About/About";
import AddUser from "./pages/Users/AddUser";
import UserDetail from "./pages/Users/UserDetail";
import Trash from "./pages/Trash/Trash";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import AddProject from "./pages/Projects/AddProject";

const history = createHashHistory();

function App() {
  return (
    <HashRouter history={history}>
      <Routes>
        <Route path="/" element={<SideBar component={<Dashboard />} />} />
        <Route path="/users" element={<SideBar component={<Users />} />} />
        <Route
          path="/projects"
          element={<SideBar component={<Projects />} />}
        />
        <Route
          path="/projects/:id"
          element={<SideBar component={<ProjectDetail />} />}
        />
        <Route
          path="/addproject"
          element={<SideBar component={<AddProject />} />}
        />
        <Route path="/about" element={<SideBar component={<About />} />} />
        <Route path="/adduser" element={<SideBar component={<AddUser />} />} />
        <Route
          path="/userdetail/:id"
          element={<SideBar component={<UserDetail />} />}
        />
        <Route path="/trash" element={<SideBar component={<Trash />} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
