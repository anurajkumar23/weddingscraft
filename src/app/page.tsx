import HomePage from "@/components/HomePage/page";
import Navbar from "@/components/Navbar";



export default function Home() {
  return (
    <div className="bg-slate-50">
      <Navbar/>
      <div className="py-20">
      <HomePage/>
      </div>
    </div>
  );
}
