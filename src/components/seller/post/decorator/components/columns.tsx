"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
// import { ImageCell } from "./image-cell";

export type DecoratorColumn = {
  id: string;
  name: string;
  description: string;
  rating: number;
  location: string;
  price: number[];
  contactUs: number;
  yearOfEstd: number;
  billboard: string;
  photos: string[];
};

export const columns: ColumnDef<DecoratorColumn>[] = [
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
    cell: ({ row }) => {
      const price = row.original.price;
      return `${price[0]} - ${price[price.length - 1]}`;
    },
  },
  {
    accessorKey: "yearOfEstd",
    header: "Year of Establishment",
  },
  {
    accessorKey: "contactUs",
    header: "Contact Number",
  },
  // {
  //   accessorKey: "photos",
  //   header: "Photos",
  //   cell: ({ row }) => <ImageCell images={row.original.photos} />,
  // },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];