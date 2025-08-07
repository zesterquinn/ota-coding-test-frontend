'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types/job";
import { cn } from "@/lib/utils";
import Link from "next/link";


const JobsTable = ({ jobs }: { jobs: Job[] }) => {
  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Company",
      accessorKey: "subcompany",
    },
    {
      header: "Posted By",
      accessorKey: "user.fullName",
    },
    {
      header: "Status",
      cell: ({ row: { original } }: { row: { original: Job } }) => {
        const approved = original?.isPending === false && original?.isApproved === true && original?.isSpam === false
        const spam = original?.isPending === false && original?.isSpam === true && original?.isApproved === false
        const pending = original?.isPending === true && original?.isSpam === false && original?.isApproved === false

        return <div className="flex gap-1">
          <Badge variant="outline"
            className={cn({
              'text-white': true,
              'bg-yellow-500': pending,
              'bg-green-500': approved,
              'bg-red-500': spam,
            })}>
            {pending ? 'Pending' : approved ? 'Approved' : 'Spam'}
          </Badge>
        </div>
      }
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: ({ row: { original } }: { row: { original: Job } }) => {
        return <div className="flex gap-4">
          <Link href={`/manage-jobs/${original.id}`}>
            <Button size="sm">View</Button>
          </Link>
        </div>
      }
    },
  ];


  return (
    <Card>
      <CardHeader>
        <CardTitle>All Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={jobs} />
      </CardContent>
    </Card>
  );
};

export default JobsTable;