import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Axios } from "axios";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Create from "./pages/create/Create";
import Saved from "./pages/saved/Saved";
import Nav from "./components/nav/Nav";

function App() {
  return (
    <div className="app">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/saved" element={<Saved />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
