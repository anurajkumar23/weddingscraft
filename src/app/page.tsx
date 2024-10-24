import AboutTitle from "@/components/HomePage/About/AboutPage";
import BanquetPage from "@/components/HomePage/banquet hall/page";
import ShowCategory from "@/components/HomePage/cetergories/Showcategory";
import OurServices from "@/components/HomePage/OurServices/OurServices";
import HomePage from "@/components/HomePage/page";
import Services from "@/components/HomePage/Services/Services";
import getBanquet from "@/utils/banquet/GetBanquet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dream Wedding - Find Your Perfect Wedding Services in Patna',
  description: 'Discover top wedding venues, caterers, decorators, and photographers in Patna. Plan your dream wedding with ease.',
  openGraph: {
    title: 'Dream Wedding - Your One-Stop Wedding Planning Solution',
    description: "Find and book the best wedding services in Patna. From venues to photographers, we've got you covered.",
    images: ['/og-image.jpg'],
  },
}

interface HomeProps {
  searchParams: { q: string };
}

const Home: React.FC<HomeProps> = async ({ searchParams }) => {
  const banquet = await getBanquet()
  const query = searchParams.q || ''

  return (
    <div>           
        <HomePage searchParams={{ q: query }} />
        <Services/>
        <ShowCategory/>
        <BanquetPage data={banquet} link="Banquet" />
        <OurServices/>
        <AboutTitle/>
    </div>
  );
}

export default Home;