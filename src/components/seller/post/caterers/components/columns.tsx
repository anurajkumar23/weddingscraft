"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type CatererColumn = {
  id: string
  name: string
  description: string
  rating: number
  reviews: {
    user: string
    comment: string
    rating: number
    date: string
  }[]
  like: string[]
  contactUs: number
  yearOfEstd: number
  billboard: string
  photos: string[]
  basic: PackageSection
  standard: PackageSection
  deluxe: PackageSection
}

type PackageSection = {
  price: number
  vegMenu: MenuSection
  nonVegMenu: MenuSection
  addons: MenuSection
}

type MenuSection = {
  starter: string
  maincourse: string
  desert: string
  welcomedrink: string
  breads: string
  rice: string
}

const MenuCell = ({ menu }: { menu: MenuSection }) => (
  <div className="space-y-1">
    <p><span className="font-semibold">Starter:</span> {menu.starter}</p>
    <p><span className="font-semibold">Main Course:</span> {menu.maincourse}</p>
    <p><span className="font-semibold">Desert:</span> {menu.desert}</p>
    <p><span className="font-semibold">Welcome Drink:</span> {menu.welcomedrink}</p>
    <p><span className="font-semibold">Breads:</span> {menu.breads}</p>
    <p><span className="font-semibold">Rice:</span> {menu.rice}</p>
  </div>
)

const PackageCell = ({ packageData }: { packageData: PackageSection }) => (
  <div className="space-y-4">
    <p><span className="font-semibold">Price:</span>₹ {packageData.price.toFixed(2)}</p>
    <div>
      <h4 className="font-semibold">Veg Menu</h4>
      <MenuCell menu={packageData.vegMenu} />
    </div>
    <div>
      <h4 className="font-semibold">Non-Veg Menu</h4>
      <MenuCell menu={packageData.nonVegMenu} />
    </div>
    <div>
      <h4 className="font-semibold">Add-ons</h4>
      <MenuCell menu={packageData.addons} />
    </div>
  </div>
)

export const columns: ColumnDef<CatererColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.rating.toFixed(1)}</span>
    ),
  },
  {
    accessorKey: "contactUs",
    header: "Contact",
  },
  {
    accessorKey: "yearOfEstd",
    header: "Year Established",
  },
  {
    accessorKey: "basic",
    header: "Basic Package",
    cell: ({ row }) => <PackageCell packageData={row.original.basic} />,
  },
  {
    accessorKey: "standard",
    header: "Standard Package",
    cell: ({ row }) => <PackageCell packageData={row.original.standard} />,
  },
  {
    accessorKey: "deluxe",
    header: "Deluxe Package",
    cell: ({ row }) => <PackageCell packageData={row.original.deluxe} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]

export default function Component() {
  return null
}