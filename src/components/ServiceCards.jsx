import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const CIRCLE_RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

const AnimatedCircle = ({ percentage, stat, isVisible }) => {
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState("0");

  useEffect(() => {
    if (!isVisible) return;

    let start = null;
    const duration = 1500;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const ratio = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - ratio, 3);

      setProgress(eased * percentage);

      // Count up the display text
      const suffix = stat.slice(-1);
      const numPart = parseFloat(stat.slice(0, -1));
      const current = (eased * numPart).toFixed(numPart >= 10 ? 0 : 1);
      setDisplayText(`${current}${suffix}`);

      if (ratio < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayText(stat);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, percentage, stat]);

  const offset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  return (
    <div className="relative w-[130px] h-[130px] flex-shrink-0 max-sm:mx-auto">
      <svg
        width="130"
        height="130"
        viewBox="0 0 130 130"
        className="transform -rotate-90"
      >
        {/* Background track */}
        <circle
          cx="65"
          cy="65"
          r={CIRCLE_RADIUS}
          fill="none"
          stroke="var(--border)"
          strokeWidth="8"
          opacity="0.3"
        />
        {/* Animated progress arc */}
        <circle
          cx="65"
          cy="65"
          r={CIRCLE_RADIUS}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="transition-none"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[28px] font-heading font-extrabold text-[color:var(--accent)]">
        {displayText}
      </span>
    </div>
  );
};

AnimatedCircle.propTypes = {
  percentage: PropTypes.number.isRequired,
  stat: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

const ServiceCards = ({ cards, className = "" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex gap-8 max-md:flex-col max-md:gap-8 ${className}`}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex flex-1 items-center gap-5 max-sm:flex-col max-sm:text-center"
        >
          <AnimatedCircle
            percentage={card.percentage}
            stat={card.stat}
            isVisible={isVisible}
          />
          <div className="flex-1">
            <p className="text-[12px] font-heading font-semibold tracking-wider text-[color:var(--accent)] uppercase">
              {card.subtitle}
            </p>
            <h5 className="font-heading font-bold text-[20px] text-[color:var(--text)] mt-1">
              {card.title}
            </h5>
            <p className="font-body text-base text-[color:var(--text-muted)] mt-1 leading-relaxed">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

ServiceCards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      stat: PropTypes.string.isRequired,
      percentage: PropTypes.number.isRequired,
      subtitle: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
};

export default ServiceCards;
