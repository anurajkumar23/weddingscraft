// CategoryPage.tsx
import React from 'react';
import CategoryCard from '@/components/CategoryCard';
import Banquet1 from "../../../../public/Banquet-1.jpg";
import Banquet2 from "../../../../public/Banquet-2.jpg";
import Catering from "../../../../public/cattering.jpg";
import Photographer from "../../../../public/Photographer.jpeg";


const CategoryPage: React.FC = () => {
    const categories = [
        { id: "1", src: Banquet1, alt: "Banquet", title: "Banquet Halls", links: "BanquetHall" },
        { id: "2", src: Banquet2, alt: "Decorators", title: "Decorators", links: "Decorators" },
        { id: "3", src: Catering, alt: "Catering", title: "Caterers", links: "Caterers" },
        { id: "4", src: Photographer, alt: "Photographer", title: "Photographers", links: "Photographers" }
    ];


    return (
        <div className='md:mt-10 gap-2 mt-2 flex flex-wrap justify-around w-full h-full '>
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    img={category.src}
                    alt={category.alt}
                    title={category.title}
                    link={category.links}
                />
            ))}
        </div>
    );
}

export default CategoryPage;
