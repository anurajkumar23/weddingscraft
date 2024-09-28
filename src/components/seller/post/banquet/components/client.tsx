"use client"
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


import { columns, BanquetColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";



interface BanquetClientProps {
  data: BanquetColumn[];
}

export const BanquetClient: React.FC<BanquetClientProps> = ({
  data
}) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Banquets Data(${data.length})`} description="Manage Banquets for your store" />
        <Button onClick={() => router.push(`/seller/post/banquet/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Banquets" />
    </>
  );
};
