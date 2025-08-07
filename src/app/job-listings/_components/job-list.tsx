import JobCard from "./job-card";
import { Job } from "@/types/job";

const JobList = async () => {
  const { signal } = new AbortController();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
    signal,
  });
  const data = await response.json();
  const jobs = [...data.jobs, ...data.cachedExternalJobs]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
      {jobs.map((job: Job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;