import React from "react";
import cardImg from "../assets/card.png";

const HoverCards = () => {
  const cards = [
    {
      id: 1,
      title: "Air Freight",
      content:
        "Discover breathtaking peaks and serene valleys. Experience the thrill of hiking through nature's most magnificent landscapes, where every trail offers a new adventure and stunning views await at every turn.",
      image: cardImg,
    },
    {
      id: 2,
      title: "Air cargo door -to- door",
      content:
        "Dive into crystal-clear waters and explore vibrant marine life. From snorkeling in coral reefs to sailing across vast blue horizons, the ocean holds endless possibilities for unforgettable experiences.",
      image: cardImg,
    },
    {
      id: 3,
      title: "Packaging",
      content:
        "Navigate bustling cityscapes filled with culture and innovation. Discover hidden gems in vibrant neighborhoods, taste exotic cuisines, and immerse yourself in the energy of metropolitan life.",
      image: cardImg,
    },
    {
      id: 4,
      title: "Fund Transfer",
      content:
        "Journey through golden dunes and ancient landscapes. Experience the mystique of endless sands, star-filled nights, and the unique beauty of life thriving in the harshest conditions.",
      image: cardImg,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {cards.map((card) => (
        <div
          key={card.id}
          className="group relative w-full h-96  overflow-hidden transition-all duration-300"
        >
          {/* Background Image - stays visible on hover */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat r"
            style={{ backgroundImage: `url(${card.image})` }}
          ></div>

          {/* Dark overlay - stays visible on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 "></div>

          {/* Title and Button at Bottom - Default State */}
          <div className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:invisible z-10">
            <h2 className="text-xl font-bold text-white mb-3">{card.title}</h2>
            <div className="w-full h-[2px] bg-white/30 mb-2"></div>
            <button className="py-3  text-[#FFFFFF] text-[13px] font-semibold rounded-lg transition-colors duration-200 shadow-lg">
              Read More
            </button>
          </div>

          {/* Content - Swipes up on Hover */}
          <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col justify-center items-center p-6 z-20">
            <h2
              className="text-xl font-bold text-white mb-4"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
            >
              {card.title}
            </h2>
            <div className="w-full h-[2px] bg-white/50 "></div>
            <p
              className="text-white mb-6 leading-relaxed flex-grow flex items-center"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
            >
              {card.content}
            </p>
            <button className="py-3 text-[#FFFFFF] font-semibold rounded-lg  transition-colors duration-200 shadow-lg">
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HoverCards;
