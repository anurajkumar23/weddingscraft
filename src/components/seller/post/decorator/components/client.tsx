"use client"
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


import { columns, DecoratorColumn } from "./columns";
// import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface DecoratorClientProps {
  data: DecoratorColumn[];
}

export const DecoratorClient: React.FC<DecoratorClientProps> = ({
  data
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Decorators Data(${data.length})`} description="Manage Decorators for your store" />
        <Button onClick={() => router.push(`/seller/post/decorator/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />

    </>
  );
};
