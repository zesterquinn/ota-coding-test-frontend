import { ArrowLeftIcon } from "lucide-react";
import JobInformation from "../_components/job-information";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const JobDetailsPage = async ({ params }: { params: { jobId: string } }) => {
  const { jobId } = await params;
  const { signal } = new AbortController();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}`, {
    signal,
  });
  const data = await response.json();
  const job = data.job;

  if (!job) {
    return <div>No job found...</div>;
  }

  return <div className="md:p-10 p-4">
    <Link href="/manage-jobs">
      <Button variant={'ghost'} className="mb-4">
        <ArrowLeftIcon className="w-4 h-4" /> See all jobs
      </Button>
    </Link>
    <JobInformation job={job} />
  </div>
};

export default JobDetailsPage;          