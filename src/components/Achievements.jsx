import horizontal from "../assets/horizontal.png";
import achievement from "../assets/achievement.png";
import { LuMoveRight } from "react-icons/lu";

const achievementGradient = {
  background:
    "linear-gradient(135deg, var(--achievement-gradient-start) 0%, var(--achievement-gradient-end) 100%)",
};

const achievements = [
  "20+ Years of Uninterrupted Service Since 2003",
  "3 Global Hubs: Korea, China, and Nigeria",
  "98% On-Time Delivery Rate for Global Shipments",
  "0 Hitches: Seamless Nigerian Customs Clearing",
];

const Achievements = () => {
  return (
    <div className="px-16 text-[color:var(--text)] mt-32 flex gap-12 max-md:px-6 max-md:flex-col max-md:gap-8 max-md:mt-20 max-sm:px-4 max-sm:mt-16">
      {/* CONTENT */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <img src={horizontal} alt="horizontal line" />
          <p>Our Achievements</p>
        </div>

        <h4 className="text-[40px] font-bold leading-tight mt-5 max-md:text-[32px] max-sm:text-[28px]">
          WHY OUR MILESTONES MATTER TO YOU
        </h4>

        <p className="text-base mt-4 max-w-[70%] max-md:max-w-full">
          <span className="font-bold">Two Decades of Reliability</span> We
          didn't just start yesterday. Registered as Hazyom Holdings in 2003, we
          have spent over 20 years perfecting the trade routes between Asia and
          Africa.
        </p>

        <p className="text-base mt-4 max-w-[70%] max-md:max-w-full">
          <span className="font-bold">Expert Customs Integration</span> Our
          long-term relationship with Nigerian Customs isn't just a stat—it's
          your guarantee. We've cleared thousands of shipments without the
          typical delays that halt other businesses.
        </p>

        <p className="text-base mt-4 max-w-[70%] max-md:max-w-full">
          <span className="font-bold">Multimodal Versatility</span> From small
          parcels to heavy machinery, we have successfully managed air, ocean,
          and land freight for over 500+ corporate clients worldwide.
        </p>

        <p className="text-base mt-4">We have:</p>
        {achievements.map((item, index) => (
          <div key={index} className="mt-4 md:w-[60%]">
            <div className="group relative flex items-center gap-3 cursor-pointer px-3 py-2">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={achievementGradient}
              />
              <LuMoveRight className="text-lg transition-transform duration-300 group-hover:translate-x-1 z-10" />
              <p className="z-10">{item}</p>
            </div>
            <hr className="border-gray-300 mt-2" />
          </div>
        ))}
      </div>

      {/* IMAGE */}
      <div className="flex-1 flex justify-end max-md:justify-center max-md:mt-4">
        <img
          src={achievement}
          alt="Global Express achievements"
          className="max-w-full h-auto max-md:max-w-[500px] max-sm:max-w-full"
        />
      </div>
    </div>
  );
};

export default Achievements;
