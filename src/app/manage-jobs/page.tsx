import JobsTable from "@/app/manage-jobs/_components/jobs-table";

const ManageJobsPage = async () => {
  const jobs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-all-jobs`);
  const data = await jobs.json();

  return (
    <div className="flex flex-col gap-6 py-10">
      <JobsTable jobs={data.jobs} />
    </div>
  );
};

export default ManageJobsPage;