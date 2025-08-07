import JobList from "@/app/job-listings/_components/job-list";
import SearchBar from "@/app/job-listings/_components/search-bar";

const JobListingsPage = async () => {
  return (
    <div className="flex flex-col gap-6 py-10">
      <div>
        <h1 className="text-3xl font-bold">Job Listing</h1>
      </div>
      <div>
        <JobList />
      </div>
    </div>
  );
};

export default JobListingsPage;