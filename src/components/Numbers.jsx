const features = [
  {
    number: "01",
    title: "Safe Cargo",
    description:
      "Our storage facilities are secure and you can be rest assured of the safety of your items whilst in our care.",
  },
  {
    number: "02",
    title: "Fast Shipment",
    description:
      "We understand the need for flexibility and on time delivery. These requirements are the core of our service delivery. Your cargo is delivered in a safe and timely manner.",
  },
  {
    number: "03",
    title: "Affordable Prices",
    description:
      "As a market leader, we offer competitive rates for all time and cost requirements. All end-to-end logistics processes are supported by leading-edge information management systems, providing the customer with complete shipment information.",
  },
  {
    number: "04",
    title: "Door Step Delivery",
    description:
      "Our door to door cargo and ocean shipping service is fast, safe, efficient and highly effective. We can arrange for your consignment to be picked up from anywhere in the South Korea and have it delivered to your specified destination.",
  },
];

const Numbers = () => {
  return (
    <div className="mx-16 mt-6 grid grid-cols-4 grid-rows-1 border-t border-b border-[color:var(--border)] max-md:mx-6 max-md:grid-cols-2 max-md:grid-rows-[auto] max-sm:mx-4 max-sm:grid-cols-1">
      {features.map((feature, index) => (
        <div
          key={feature.number}
          className={`flex flex-col p-6 py-12 max-sm:text-center
            ${index < 3 ? "border-r border-[color:var(--border)]" : ""}
            ${index === 2 ? "max-md:border-r-0" : ""}
            ${index < 3 ? "max-md:border-b" : ""}
            ${index === 3 ? "max-md:border-l-0" : ""}
            max-sm:border-r-0
            ${index < 3 ? "max-sm:border-b" : ""}
          `}
        >
          <p className="text-[80px] font-heading font-extrabold leading-none text-[color:var(--accent)] opacity-30 max-sm:text-[60px]">
            {feature.number}
          </p>
          <h3 className="mt-6 text-[color:var(--text)] text-xl font-heading font-bold">
            {feature.title}
          </h3>
          <p className="text-[color:var(--text-muted)] mt-3 text-sm leading-relaxed flex-1">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Numbers;
