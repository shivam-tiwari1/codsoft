import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../api";

export default function JobDetail(){
  const { id } = useParams();
  const [job,setJob] = useState(null);
  useEffect(()=> {
    request(`/jobs/${id}`).then(d=>setJob(d)).catch(()=>setJob(null));
  },[id]);
  if (!job) return <div className="container"><p>Loading or job not found.</p></div>;
  return (
    <div className="container">
      <h1>{job.title}</h1>
      <p className="muted">{job.company} • {job.location}</p>
      <p>{job.description}</p>
      <button className="btn">Apply Now</button>
    </div>
  );
}
