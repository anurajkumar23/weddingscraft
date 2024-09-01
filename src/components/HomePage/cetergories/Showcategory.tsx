import Image from 'next/image';
import ChooseCategoryImage from '../../../../public/Design_elements/Choose Different Services.png';
import Categories from './Categories';
import BanQuetHall from '../../../../public/Design_elements/AK_04936_vhdoet.avif';
import Decorator from "../../../../public/Design_elements/christmas-tree-6924746_1280 1.png"
import Catering from "../../../../public/Design_elements/buffet-315691_1280 1.png"
import Photographer from "../../../../public/Design_elements/camera-7726802_1280 1.png"
import sign from './Sign.svg';

const ShowCategory = () => {
  const categories = [
    { id: '1', src: BanQuetHall, alt: 'Banquet', title: 'Banquet Halls', links: 'BanquetHall' },
    { id: '2', src: Decorator, alt: 'Decorators', title: 'Decorators', links: 'Decorators' },
    { id: '3', src: Catering, alt: 'Catering', title: 'Caterers', links: 'Caterers' },
    { id: '4', src: Photographer, alt: 'Photographer', title: 'Photographers', links: 'Photographers' }
  ];

  return (
    <div className="w-full container max-h-full pt-12">
      <div className="justify-center ">
        <Image
          src={ChooseCategoryImage}
          alt="Choose Different Services"
          className="w-1/2 justify-center items-center mx-auto"
        />
        <div className="flex gap-x-4 justify-center items-center pt-2">
          <hr className="w-32 border-gray-600 border-2" />
          <Image src={sign} alt="Sign" />
          <hr className="w-32 border-red-500 border-2" />
        </div>
      </div>

      <div className="pt-8 self-stretch items-end justify-start px-0 pb-2 md:gap-8 grid grid-cols-2 md:grid-cols-4 text-white gap-4">
        {categories.map(category => (
          <Categories key={category.id} src={category.src} alt={category.alt} title={category.title} />
        ))}
      </div>

      <div className="pt-6 self-stretch flex flex-row items-start justify-center py-0 pl-6 pr-5">
        <button className="cursor-pointer p-3 bg-[#ff4444] rounded-[10px] flex flex-row items-start justify-start whitespace-nowrap hover:bg-[#ff5e5e]">
          <div className="text-[1.3rem] font-semibold text-white">
            More Categories
          </div>
        </button>
      </div>
    </div>
  );
};

export default ShowCategory;
