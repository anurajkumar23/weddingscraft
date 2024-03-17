import BanquetPage from "@/components/HomePage/banquet hall/page";
import HomePage from "@/components/HomePage/page";


const Home: React.FC = () => {
  return (
    <div className="bg-slate-50">           
        <HomePage />
        <BanquetPage />
    </div>
  );
}

export default Home;
