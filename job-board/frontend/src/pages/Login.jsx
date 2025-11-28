import React, { useState } from "react";
import { request } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await request('/auth/login', 'POST', { email, password });
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/');
    } else {
      alert(res.msg || 'Login failed');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form className="form" onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn" type="submit">Login</button>
      </form>
    </div>
  );
}
