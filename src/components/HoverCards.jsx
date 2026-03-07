import cardImg from "../assets/card.png";

const HoverCards = () => {
  const cards = [
    {
      id: 1,
      title: "Air Freight",
      content:
        "Fast, reliable air cargo services connecting Korea, China, and Nigeria. We handle time-sensitive shipments with precision, ensuring your goods arrive safely and on schedule through our trusted airline partnerships.",
      image: cardImg,
    },
    {
      id: 2,
      title: "Air Cargo",
      content:
        "Complete end-to-end delivery from pickup to your final destination. Our seamless service eliminates the hassle of coordinating multiple carriers, giving you a single point of contact for your entire shipment.",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Packaging",
      content:
        "Professional packaging solutions designed to protect your cargo throughout its journey. From fragile electronics to heavy machinery, our expert team ensures every item is secured for safe transit across borders.",
      image:
        "https://images.unsplash.com/photo-1605732562742-3023a888e56e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {cards.map((card) => (
        <div
          key={card.id}
          className="group relative w-full h-96 max-md:h-80 max-sm:h-72 overflow-hidden transition-all duration-300"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${card.image})` }}
          ></div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

          {/* Title and Button at Bottom - Default State */}
          <div className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:invisible z-10">
            <h2 className="text-xl font-bold text-white mb-3">{card.title}</h2>
            <div className="w-full h-[2px] bg-white/30"></div>
          </div>

          {/* Content - Swipes up on Hover */}
          <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col justify-center items-center p-6 z-20 bg-black/85">
            <h2
              className="text-xl font-bold text-white mb-4"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
            >
              {card.title}
            </h2>
            <div className="w-full h-[2px] bg-white/50"></div>
            <p
              className="text-white leading-relaxed flex-grow flex items-center"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
            >
              {card.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HoverCards;
