import BanquetPage from "@/components/HomePage/banquet hall/page";
import HomePage from "@/components/HomePage/page";
import Navbar from "@/components/Navbar";

const Home: React.FC = () => {
  return (
    <div className="bg-slate-50">
      <Navbar />
      <div className="py-20">
        <HomePage />
        <BanquetPage />
      </div>
    </div>
  );
}

export default Home;
