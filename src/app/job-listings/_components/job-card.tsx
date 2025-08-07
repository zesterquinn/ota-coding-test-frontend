
import Link from "next/link";
import { Job } from "@/types/job";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";

const JobCard = ({ job }: { job: Job }) => {
  return (
    <Link href={`/job-listings/${job.id}`} >
      <Card className="h-full">
        <CardHeader>
          <div className="flex flex-col gap-1">
            <CardTitle className="line-clamp-2 text-md font-extrabold">{job.name}</CardTitle>
            <CardDescription className="font-semibold italic">{job.subcompany}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="text-sm">
          <span className="line-clamp-3" dangerouslySetInnerHTML={{ __html: job.jobDescriptions[0]?.value || 'N/A' }} />
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            <Badge className="capitalize">{String(job.employmentType).split('_').join(' ')}</Badge>
            <Badge className="capitalize">{job.schedule}</Badge>
            <Badge>{job.office}</Badge>
            <Badge>{job.department}</Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobCard;