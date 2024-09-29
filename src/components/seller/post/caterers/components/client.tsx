"use client"
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


import { columns, CatererColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface CatererClientProps {
  data: CatererColumn[];
}

export const CatererClient: React.FC<CatererClientProps> = ({
  data
}) => {

  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Caterers Data(${data.length})`} description="Manage Caterers for your store" />
        <Button onClick={() => router.push(`/seller/post/caterer/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
