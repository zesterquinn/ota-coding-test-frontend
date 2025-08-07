'use client'
import { Job, JobDescription } from "@/types/job";
import { useEffect, useState } from "react";
import { redirect, useParams } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, } from "lucide-react";
import Link from "next/link";
import { JobDetails, JobSubHeader } from "@/app/_components/job-details";
import { cn } from "@/lib/utils";

const JobInformation = ({ job }: { job: Job }) => {
  const approved = job?.isPending === false && job?.isApproved === true && job?.isSpam === false
  const spam = job?.isPending === false && job?.isSpam === true && job?.isApproved === false
  const pending = job?.isPending === true && job?.isSpam === false && job?.isApproved === false

  const onClickApprove = async () => {
    const { signal } = new AbortController();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${job.id}/approve`, {
      method: 'put',
      signal,
    });

    redirect('/manage-jobs');
  }

  const onClickMarkAsSpam = async () => {
    const { signal } = new AbortController();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${job.id}/mark-as-spam`, {
      method: 'put',
      signal
    });

    redirect('/manage-jobs');
  }

  return (
    <div>
      <div className="sticky top-0 bg-white z-10 pt-10">
        <div className="pb-10">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold pb-4">{job?.name} | <span className={cn({
                'text-green-500': approved,
                'text-red-500': spam,
                'text-yellow-500': pending,
              })}>{approved ? 'Approved' : spam ? 'Spam' : pending ? 'Pending' : ''}</span></h1>
            </div>
            <div className="flex gap-4 sm:pb-0 pb-4">
              <Button size={'lg'} onClick={onClickApprove}>Approve</Button>
              <Button size={'lg'} variant={'destructive'} onClick={onClickMarkAsSpam}>Mark as Spam</Button>
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