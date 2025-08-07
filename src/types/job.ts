interface Job {
  createdAt: string;
  department: string;
  employmentType: string;
  id: number;
  jobDescriptions: JobDescription[];
  name: string;
  occupation: string;
  occupationCategory: string;
  office: string;
  recruitingCategory: string;
  schedule: string;
  seniority: string;
  subcompany: string;
  yearsOfExperience: string;
  isPending: boolean;
  isSpam: boolean;
  isApproved: boolean;
}

interface JobDescription {
  name: string;
  value: string;
}

export type { Job, JobDescription };