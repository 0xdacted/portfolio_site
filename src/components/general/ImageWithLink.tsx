import React, { useState } from 'react';
import Spinner from './Spinner';
import { Link } from 'gatsby';

export interface ImageWithLinkProps {
  src: string;
  alt: string;
  link: string;
}

export const ImageWithLink: React.FC<ImageWithLinkProps> = ({
  src,
  alt,
  link,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center m-1 lg:mb-4 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-sm">
      <Link to={link} className="relative">
        <div className="flex justify-center items-center h-10.5 sm:h-11.5 md:h-10 lg:h-10.5 xl:h-11 xxl:h-12">
          {isLoading && <Spinner />}
          <img
            className="w-full h-full"
            src={src}
            alt={alt}
            onLoad={handleLoad}
            style={isLoading ? { display: `none` } : {}}
          />
        </div>
      </Link>
    </div>
  );
};
