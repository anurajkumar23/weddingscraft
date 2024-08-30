import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import border from "../../public/Design_elements/border 1-1.png";

interface CategoryCardProps {
    img: string | StaticImageData;
    alt: string;
    title: string;
    link: string | undefined;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ img, alt, title, link }) => {
    return (
        <div>
            <Link href={`/${link}`}>
                <div className="relative flex flex-col items-center">
                    {/* Wrapper for the outer circle with padding */}
                    <div className="relative flex justify-center items-center p-4">
                        {/* Outer border circle */}
                        <Image
                            src={border}
                            alt=''
                            width={600}
                            height={600}
                            className='absolute top-0 left-0 w-full h-full'
                        />
                        {/* Inner image circle */}
                        <div className='relative border-2 flex justify-center items-center rounded-full'>
                            <Image
                                src={img}
                                alt={alt}
                                className='object-cover md:w-48 md:h-48 w-36 h-36 hover:scale-105 transition-transform duration-300 cursor-pointer rounded-full'
                                loading='lazy'
                            />
                    <h1 className='absolute text-white text-center font-semibold text-xl mt-2'>{title}</h1>
                        </div>
                    </div>
                    {/* Title */}
                </div>
            </Link>
        </div>
    );
};

export default CategoryCard;
