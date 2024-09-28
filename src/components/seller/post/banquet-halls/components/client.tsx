
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";


import { columns, BanquetColumn } from "./columns";


interface BanquetClientProps {
  data: BanquetColumn[];
}

export const BanquetClient: React.FC<BanquetClientProps> = ({
  data
}) => {


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Banquets Data(${data.length})`} description="Manage Banquets for your store" />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Banquets" />
    </>
  );
};
