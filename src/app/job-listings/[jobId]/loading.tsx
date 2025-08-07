import { Skeleton } from "@/components/ui/skeleton";

const JobDetailsLoading = () => {
  return <div className="p-10">
    <div>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  </div>;
};

export default JobDetailsLoading;