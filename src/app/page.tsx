import AboutTitle from "@/components/HomePage/About/AboutPage";
import BanquetPage from "@/components/HomePage/banquet hall/page";
import ShowCategory from "@/components/HomePage/cetergories/Showcategory";
import OurServices from "@/components/HomePage/OurServices/OurServices";
import HomePage from "@/components/HomePage/page";
import Services from "@/components/HomePage/Services/Services";
import getBanquet from "@/utils/banquet/GetBanquet";


const Home: React.FC = async() => {

  const banquet = await getBanquet()

  return (
    <div>           
        <HomePage />
        <Services/>
        <ShowCategory/>
        <BanquetPage data={banquet} link="Banquet" />
        <OurServices/>
        <AboutTitle/>
    </div>
  );
}

export default Home;
