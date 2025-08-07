'use client'
import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { JobDetails, JobSubHeader } from "@/app/_components/job-details";

const JobInformation = ({ job }: { job: Job }) => {
  return (
    <div>
      <div className="sticky top-0 bg-white z-10 pt-10">
        <div className="pb-10">
          <div className="flex flex-row justify-between items-center">
            <div className="sm:mr-0 mr-10">
              <h1 className="text-3xl font-extrabold pb-4">{job?.name}</h1>
            </div>
            <div>
              <Button size={'lg'} onClick={() => window.open(`${process.env.NEXT_PUBLIC_MRGE_URL}/job/${job.id}#apply`, '_blank')}>Apply Now</Button>
            </div>
          </div>
          <JobSubHeader job={job} />
        </div>
      </div>
      <div>
        <JobDetails job={job} />
      </div>
    </div>
  );
};

export default JobInformation;          