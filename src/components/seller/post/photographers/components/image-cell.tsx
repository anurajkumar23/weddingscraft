import Image from 'next/image';

interface ImageCellProps {
  images: string[];
}

export const ImageCell: React.FC<ImageCellProps> = ({ images }) => {
  return (
    <div className="flex space-x-2">
      {images.slice(0, 3).map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Decorator image ${index + 1}`}
          width={50}
          height={50}
          className="object-cover rounded"
        />
      ))}
      {images.length > 3 && <span>+{images.length - 3}</span>}
    </div>
  );
};