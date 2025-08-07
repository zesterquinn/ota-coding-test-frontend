import { Button } from "@/components/ui/button";
import JobInformation from "./_components/job-information";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const JobDetailsPage = async ({ params }: { params: { jobId: string } }) => {
  const { jobId } = await params;
  const { signal } = new AbortController();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${jobId}`, {
    signal,
  });
  const job = await response.json();

  if (!job) {
    return <div>No job found...</div>;
  }

  return <div className="md:p-10 p-4">
    <Link href="/job-listings">
      <Button variant={'ghost'} className="mb-4">
        <ArrowLeftIcon className="w-4 h-4" /> See all jobs
      </Button>
    </Link>
    <JobInformation job={job.job} />
  </div>
};

export default JobDetailsPage;          