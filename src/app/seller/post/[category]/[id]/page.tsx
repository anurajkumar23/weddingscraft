
// import { getCatererById } from '@/lib/api/caterer';
// import { getDecoratorById } from '@/lib/api/decorator';
// import { getPhotographerById } from '@/lib/api/photographer';
// import BanquetForm from '@/components/seller/post/banquet/BanquetForm';
// import CatererForm from '@/components/seller/post/caterer/CatererForm';
// import DecoratorForm from '@/components/seller/post/decorator/DecoratorForm';
// import PhotographerForm from '@/components/seller/post/photographer/PhotographerForm';


import { BanquetForm } from "@/components/seller/post/banquet/components/BanquetForm";
import DecoratorForm from "@/components/seller/post/decorator/components/DecoratorForm";
import getBanquetId from "@/utils/banquet/GetbanquetId";
import getDecoratorId from "@/utils/decorator/GetDecoratorId";

export default async function EditPage({ params }: { params: { category: string; id: string } }) {
    const { category, id } = params;
    let data;
    let FormComponent;



    switch (category) {
        case 'banquet':
            if (id !== 'new') {
                data = await getBanquetId(id);
            }
            FormComponent = BanquetForm;
            break;
        // case 'caterer':
        //   data = await getCatererById(id);
        //   FormComponent = CatererForm;
        //   break;
        case 'decorator':
            if (id !== 'new') {
                data = await getDecoratorId(id);
            }
            FormComponent = DecoratorForm;
            break;
        // case 'photographer':
        //   data = await getPhotographerById(id);
        //   FormComponent = PhotographerForm;
        //   break;
        default:
            return <div>Invalid category</div>;
    }

    // if (!data) {
    //     return <div>Item not found</div>;
    // }

    return (
        <div className="container mx-auto p-4">
            <FormComponent initialData={data} />
        </div>
    );
}