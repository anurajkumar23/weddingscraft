import { cookies } from "next/headers";
import InnerCardPage from "@/components/InnerCard/InnerCardPage";
import getBanquet from "@/utils/banquet/GetBanquet";
import FilterData from "../../components/filter/FilterData";

export const metadata = {
  title: "Banquet Halls / Marriage Hall",
  description:
    "Discover and book the best banquet halls and marriage halls for your special occasions. With Dream Wedding, find the perfect venue that fits your style and budget. Enjoy seamless planning and exceptional service to make your wedding day truly unforgettable.",
  alternates: {
    canonical: `/BanquetHall`,
  },
};

// Fetch banquet data server-side based on applied filters
const Page = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const banquet = await getBanquet(searchParams); // Pass searchParams from URL as filters

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-medium mb-4">Top Banquet Halls in Patna</h1>
      <FilterData />

      {/* Render InnerCardPage with the fetched banquet data  */}
      <InnerCardPage data={banquet} link="BanquetHall" imgLink="banquet" />
    </div>
  );
};

export default Page;
