
import { connectToDB } from "@/utils/database";
import Banquet from "@/models/banquet";
import InfoUpdate  from "./components/infoUpdate";
// import { postBanquet as FormValues } from "@/interfaces/banquet";





export default async function Page({ params }: { params: { id: string } }) {
    
    const { id } = params;
    console.log(id,"hehee")
    
    await connectToDB();


const banquet = await Banquet.findById(id);
if (!banquet) {
  // Handle the case where no banquet data is found
  return <p className="text-white">Failed to fetch banquet Data</p>;
}
   
   
  return (
    <div className='text-white'>
        <div className='text-center text-3xl my-5 mb-[4rem]'>UPDATE BANQUET</div>
        <InfoUpdate banquet={banquet} id={id} />
    </div>
  );
}
