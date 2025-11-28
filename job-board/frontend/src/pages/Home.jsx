import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { request } from "../api";

export default function Home(){
  const [jobs, setJobs] = useState([]);
  useEffect(()=> {
    // sample fetch - backend must be running for real data
    request("/jobs").then(d=>setJobs(d || [])).catch(()=> setJobs([]));
  }, []);
  const featured = jobs.length ? jobs.slice(0,6) : [
    { id:1, title:"Frontend Developer", company:"Google", location:"Noida", description:"Build great UIs" },
    { id:2, title:"Backend Developer", company:"Microsoft", location:"Delhi", description:"APIs and services" }
  ];
  return (
    <div className="container">
      <h1>Welcome to JobBoard</h1>
      <h2>Featured Jobs</h2>
      <div className="grid">
        {featured.map(j=> <JobCard job={j} key={j.id} />)}
      </div>
    </div>
  );
}
