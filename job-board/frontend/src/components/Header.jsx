import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
  return (
    <header className="header">
      <div className="logo"><Link to="/" style={{color:'white',textDecoration:'none'}}>JobBoard</Link></div>
      <nav>
        <Link to="/jobs">Jobs</Link>
        <Link to="/employer">Employer</Link>
        <Link to="/candidate">Candidate</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}
