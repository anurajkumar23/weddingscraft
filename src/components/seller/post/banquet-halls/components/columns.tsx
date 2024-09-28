"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type BanquetColumn = {
  id: string;
  name: string;
  rating: number;
  location: string;
  description: string;
  price: number;
  capacity: number;
  type: string;
  yearOfEstd: number;
  contactUs: number;
  specialFeature: string;
  availability: string;
  operatingDays: string;
  openHours: string;
  createdAt: string;
};

export const columns: ColumnDef<BanquetColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "yearOfEstd",
    header: "Year of Establishment",
  },
  {
    accessorKey: "contactUs",
    header: "Contact Number",
  },
  {
    accessorKey: "specialFeature",
    header: "Special Features",
  },
  {
    accessorKey: "availability",
    header: "Availability",
  },
  {
    accessorKey: "operatingDays",
    header: "Operating Days",
  },
  {
    accessorKey: "openHours",
    header: "Open Hours",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
