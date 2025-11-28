import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";

function App(){
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/jobs/:id" element={<JobDetail/>} />
          <Route path="/employer" element={<PrivateRoute><EmployerDashboard/></PrivateRoute>} />
          <Route path="/candidate" element={<PrivateRoute><CandidateDashboard/></PrivateRoute>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
