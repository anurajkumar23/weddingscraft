import Image, { StaticImageData } from 'next/image';

interface CategoryCardProps {
    img: string| StaticImageData;
    alt: string;
    title: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ img, alt, title }) => {


    return (
        <div >
            <div>
                <div className='border overflow-hidden flex justify-center items-center rounded-full'>
                    <Image
                        src={img}
                        alt={alt}
                        className='object-cover md:w-48 md:h-48 w-36 h-36 hover:scale-105 transition-transform duration-300 cursor-pointer'
                    />
                </div>
                <h1 className='text-center font-medium'>{title}</h1>
            </div>
        </div>
    );
};

export default CategoryCard;
