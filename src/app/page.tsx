import BanquetPage from "@/components/HomePage/banquet hall/page";
import ShowCategory from "@/components/HomePage/cetergories/Showcategory";
import HomePage from "@/components/HomePage/page";
import Services from "@/components/HomePage/Services/Services";

import axios from "axios";

const Home: React.FC = () => {
  return (
    <div>           
        <HomePage />
        <Services/>
        <ShowCategory/>
        <BanquetPage />
       
    </div>
  );
}

export default Home;
