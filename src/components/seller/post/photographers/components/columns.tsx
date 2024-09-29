"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type PhotographerColumn = {
  id: string;
  name: string;
  rating: number;
  location: string; 
  locationUrl: string;
  description: string;
  feature: string;
  price: string; 
  contactUs: number | string;
  yearOfEstd: number | string;
  services: string; 
  occasion: string;
  gallery: string; 
  photos: string; 
  createdAt: string;
};

export const columns: ColumnDef<PhotographerColumn>[] = [
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
    cell: ({ row }) => row.original.location || "N/A",
  },
  {
    accessorKey: "locationUrl",
    header: "Location URL",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => row.original.description || "No description",
  },
  {
    accessorKey: "feature",
    header: "Features",
    cell: ({ row }) => row.original.feature || "No features",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => row.original.price || "No prices listed",
  },
  {
    accessorKey: "contactUs",
    header: "Contact Us",
  },
  {
    accessorKey: "yearOfEstd",
    header: "Year of Establishment",
  },
  {
    accessorKey: "services",
    header: "Services",
    cell: ({ row }) => row.original.services || "No services listed",
  },
  {
    accessorKey: "occasion",
    header: "Occasion",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
  },
  {
    accessorKey: "gallery",
    header: "Gallery",
    cell: ({ row }) => row.original.gallery || "No gallery available",
  },
  {
    accessorKey: "photos",
    header: "Photos",
    cell: ({ row }) => row.original.photos || "No photos",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
