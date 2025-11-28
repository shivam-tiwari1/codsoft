import React, { useState } from "react";
import { request } from "../api";

export default function EmployerDashboard(){
  const [form,setForm] = useState({ title:'', company:'', location:'', type:'', salary:'', description:'', requirements:'' });
  const submit = async (e) => {
    e.preventDefault();
    const body = { ...form, requirements: form.requirements.split(',').map(s=>s.trim()) };
    await request('/jobs', 'POST', body);
    alert('Job posted (if backend running)');
  };
  return (
    <div className="container">
      <h1>Employer Dashboard</h1>
      <form className="form" onSubmit={submit}>
        <input placeholder="Job Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <input placeholder="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} />
        <input placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
        <input placeholder="Type" value={form.type} onChange={e=>setForm({...form,type:e.target.value})} />
        <input placeholder="Salary" value={form.salary} onChange={e=>setForm({...form,salary:e.target.value})} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <input placeholder="Requirements (comma separated)" value={form.requirements} onChange={e=>setForm({...form,requirements:e.target.value})} />
        <button className="btn" type="submit">Post Job</button>
      </form>
    </div>
  );
}
