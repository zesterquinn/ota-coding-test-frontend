import { Skeleton } from "@/components/ui/skeleton";

const JobListingsLoading = () => {
  return (
    <div className="flex flex-col gap-6 py-10">
      <div>
        <h1 className="text-3xl font-bold">Job Listing</h1>
      </div>
      <div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className="h-40 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobListingsLoading;