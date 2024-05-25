// import ImageContainer from "./Imagecontainer";
import Photo from "../../../public/Banquet-1.jpg";
import Gallery from "../Gallery/Gallary"

interface JoinUsFormProps {
    onClose: () => void;
}


const JoinUsForm: React.FC<JoinUsFormProps> = ({ onClose }) => {

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white rounded-lg p-8 max-w-6xl max-h-6xl h-full w-full relative overflow-auto">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <h1 className='items-center text-center pb-2 font-bold'>
                    Photos/Video
                </h1>
                <div className="">
                    {/* {Images.map((image) => (
                        <ImageContainer
                            key={image.id}
                            img={image.src}
                            alt={image.alt}
                        />
                    ))} */}
                    <Gallery/>
                </div>

            </div>
        </div>
    );
};

export default JoinUsForm;
