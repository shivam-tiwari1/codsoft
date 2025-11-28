import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { request } from "../api";

export default function Jobs(){
  const [jobs, setJobs] = useState([]);
  const [q,setQ] = useState('');
  useEffect(()=> {
    request('/jobs').then(d=>setJobs(d || [])).catch(()=>setJobs([]));
  },[]);
  const filtered = jobs.filter(j=> j.title?.toLowerCase().includes(q.toLowerCase()) || j.company?.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="container">
      <h1>Job Listings</h1>
      <div style={{marginBottom:12}}>
        <input placeholder="Search jobs..." value={q} onChange={e=>setQ(e.target.value)} style={{padding:8,width:'60%'}} />
      </div>
      <div className="grid">
        {filtered.length? filtered.map(j=> <JobCard job={j} key={j._id || j.id} />) : <p>No jobs found.</p>}
      </div>
    </div>
  );
}
