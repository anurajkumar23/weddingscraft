import Image from "next/image";
// import LogeSquare from "../../public/elements/LogoSquare.png";
import LoadingPlaceHolder from "@/components/ui/shared/LoadingPlaceHolder";


export default function Loading() {
  return (
    <main className="h-screen pb-20 flex flex-col items-center justify-center gap-4">
      {/* <Image
        className="bg-transparent rounded-t-full rounded-b-[1999px] mb-3"
        src={LogeSquare}
        alt="Bask Logo"
        width={150}
        height={150}
      /> */}
      <div className="-mt-4">
        <LoadingPlaceHolder />
      </div>
    </main>
  );
}
