'use client'
import { Job, JobDescription as JobDescriptionType } from "@/types/job";

const JobSubHeader = ({ job }: { job: Job }) => {
  return (
    <div className="flex flex-row gap-2">
      {[job?.employmentType, job?.schedule, job?.office].map((item, index, data) => (
        <div key={index} className="flex flex-row gap-2">
          <div className={'font-semibold capitalize'}>{item?.split('_').join(' ') || 'N/A'}</div>
          {data.length > index && <div>|</div>}
        </div>
      ))}
      <div className="flex flex-row gap-2">
        <div className={'font-semibold'}>{job?.subcompany}</div>
      </div>
    </div>
  );
};

const JobDetails = ({ job }: { job: Job }) => {
  return (
    <div>
      {job?.jobDescriptions?.map((description: JobDescriptionType, index: number) => (
        <div key={index} className="pb-10">
          <h2 className="text-lg font-extrabold mb-2" >
            {description.name}
          </h2>
          <div className="job-description" dangerouslySetInnerHTML={{ __html: description.value }} />
        </div>
      ))}
    </div>
  );
};


export { JobSubHeader, JobDetails };