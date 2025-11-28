import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }){
  return (
    <article className="job-card">
      <h3>{job.title}</h3>
      <p className="muted">{job.company} • {job.location || 'Remote'}</p>
      <p>{job.description?.slice(0,120)}...</p>
      <Link to={`/jobs/${job._id || job.id}`} className="btn" style={{marginTop:10}}>View</Link>
    </article>
  );
}
