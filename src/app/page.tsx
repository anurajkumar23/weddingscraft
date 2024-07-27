import BanquetPage from "@/components/HomePage/banquet hall/page";
import HomePage from "@/components/HomePage/page";

import axios from "axios";

const Home: React.FC = () => {
  return (
    <div >           
        <HomePage />
        <BanquetPage />
       
    </div>
  );
}

export default Home;
