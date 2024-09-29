import { CatererColumn } from "./components/columns"
import { CatererClient } from "./components/client"
import { CatererDocument, SectionDocument } from "@/customTypes/CatererDocument"
import getCaterer from "@/utils/caterer/GetCaterer"

const formatMenu = (menu: SectionDocument['veg'] | SectionDocument['nonveg'] = {
  starter: [],
  maincourse: [],
  desert: [],
  welcomedrink: [],
  breads: [],
  rice: [],
}) => ({
  starter: menu.starter?.join(", ") ?? "",
  maincourse: menu.maincourse?.join(", ") ?? "",
  desert: menu.desert?.join(", ") ?? "",
  welcomedrink: menu.welcomedrink?.join(", ") ?? "",
  breads: menu.breads?.join(", ") ?? "",
  rice: menu.rice?.join(", ") ?? "",
})

const formatAddons = (addons: SectionDocument['addon'] = {
  starter: [],
  maincourse: [],
  desert: [],
  welcomedrink: [],
  breads: [],
  rice: [],
}) => ({
  starter: addons.starter?.map((addon) => `${addon.name} - ${addon.price}`).join(", ") ?? "",
  maincourse: addons.maincourse?.map((addon) => `${addon.name} - ${addon.price}`).join(", ") ?? "",
  desert: addons.desert?.map((addon) => `${addon.name} - ${addon.price}`).join(", ") ?? "",
  welcomedrink: addons.welcomedrink?.map((addon) => `${addon.name} - ${addon.price}`).join(", ") ?? "",
  breads: addons.breads?.map((addon) => `${addon.name} - ${addon.price}`).join(", ") ?? "",
  rice: addons.rice?.map((addon) => `${addon.name} - ${addon.price}`).join(", ") ?? "",
})

const formatSection = (section: SectionDocument | undefined) => ({
  vegMenu: formatMenu(section?.veg),
  nonVegMenu: formatMenu(section?.nonveg),
  addons: formatAddons(section?.addon),
  price: section?.price?.[0] ?? 0,
})

const CatererPage = async () => {
  const caterers: CatererDocument[] = await getCaterer()

  const formattedCaterers: CatererColumn[] = caterers.map((item) => ({
    id: item._id,
    name: item.name,
    description: item.description ?? "",
    rating: item.rating,
    reviews: item.reviews?.map(review => ({
      user: review.user,
      comment: review.comment,
      rating: review.rating,
      date: review.date.toISOString(),
    })) ?? [],
    like: item.like ?? [],
    contactUs: item.contactUs,
    yearOfEstd: item.yearOfEstd ?? 0,
    billboard: item.billboard ?? "",
    photos: item.photos ?? [],
    basic: formatSection(item.basic),
    standard: formatSection(item.standard),
    deluxe: formatSection(item.deluxe),
  }))

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CatererClient data={formattedCaterers} />
      </div>
    </div>
  )
}

export default CatererPage