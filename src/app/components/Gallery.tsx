import React from "react";
import { ImageWithFallback } from "./image-rules/ImageWithFallback";

export function Gallery() {
  const images = [
    {
      src: "/assets/couple.png",
      alt: "Couple portrait",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      src: "/assets/Sarah.png",
      alt: "Wedding venue",
      span: "",
    },
    {
      src: "/assets/Michael.jpg",
      alt: "Flowers",
      span: "",
    },
    {
      src: "https://images.unsplash.com/photo-1689181273522-200c36e8c864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBlbGVnYW50fGVufDF8fHx8MTc2Nzk0MjYwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Wedding rings",
      span: "md:col-span-2",
    },
    {
      src: "https://images.unsplash.com/photo-1660765035817-4b686af17664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMHJvbWFudGljfGVufDF8fHx8MTc2Nzk0MzgzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Flowers",
      span: "",
    },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl mb-4 text-[#8b9eb5] italic">
            Gallery
          </h2>
          <div className="w-24 h-px bg-[#8b9eb5] mx-auto mb-6"></div>
          <p className="text-xl text-gray-700">
            A glimpse into our journey together
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 auto-rows-[250px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ${image.span}`}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8b9eb5]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 italic">
            More photos coming soon after our special day!
          </p>
        </div>
      </div>
    </div>
  );
}
