import BanquetPage from "@/components/HomePage/banquet hall/page";
import HomePage from "@/components/HomePage/page";
import Services from "@/components/HomePage/Services/Services";

import axios from "axios";

const Home: React.FC = () => {
  return (
    <div>           
        <HomePage />
        <Services/>
        <BanquetPage />
       
    </div>
  );
}

export default Home;
