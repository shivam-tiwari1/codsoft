import React, { useState } from "react";
import { request } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [form,setForm] = useState({ name:'', email:'', password:'', role:'candidate', company:'' });
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const res = await request('/auth/register', 'POST', form);
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/');
    } else {
      alert(res.msg || 'Register failed');
    }
  };
  return (
    <div className="container">
      <h1>Register</h1>
      <form className="form" onSubmit={submit}>
        <input placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
          <option value="candidate">Candidate</option>
          <option value="employer">Employer</option>
        </select>
        <input placeholder="Company (if employer)" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} />
        <button className="btn" type="submit">Register</button>
      </form>
    </div>
  );
}
