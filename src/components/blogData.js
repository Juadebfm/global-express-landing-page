import ship1 from "../assets/ship1.png";
import ship2 from "../assets/ship2.png";
import ship3 from "../assets/ship3.png";
import ship4 from "../assets/ship4.png";

const images = [ship1, ship2, ship3, ship4];

export const blogPosts = [
  {
    id: 1,
    image: images[0],
    date: "Monday, 3 Mar 2025",
    title: "How Air Freight Works: Korea to Nigeria in 5–7 Days",
    description:
      "We break down the full air freight journey — from pickup in Seoul to doorstep delivery in Lagos — and what affects your transit time.",
    tags: [
      { name: "Air Freight", color: "text-[#FF6600]", bgColor: "bg-[#FFF4EE]" },
      { name: "Nigeria", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
    ],
  },
  {
    id: 2,
    image: images[1],
    date: "Wednesday, 19 Mar 2025",
    title: "Sea Freight vs. Air Freight: Which Is Right for Your Cargo?",
    description:
      "Cost, weight, urgency, and item type all factor into the decision. Here's how to choose the right mode for your next shipment.",
    tags: [
      { name: "Sea Freight", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "Air Freight", color: "text-[#FF6600]", bgColor: "bg-[#FFF4EE]" },
    ],
  },
  {
    id: 3,
    image: images[2],
    date: "Tuesday, 1 Apr 2025",
    title: "Nigerian Customs Clearance: A Step-by-Step Guide for Importers",
    description:
      "Navigating SON, NAFDAC, and NCS requirements doesn't have to be stressful. Here's what to expect and how to prepare your documentation.",
    tags: [
      { name: "Customs", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
      { name: "Nigeria", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
    ],
  },
  {
    id: 4,
    image: images[3],
    date: "Friday, 18 Apr 2025",
    title: "Understanding CBM: How We Calculate Sea Freight Rates",
    description:
      "Cubic metre (CBM) pricing can be confusing. We explain how ocean freight is measured and priced so you can estimate costs before you ship.",
    tags: [
      { name: "Sea Freight", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "Pricing", color: "text-[#FF6600]", bgColor: "bg-[#FFF4EE]" },
    ],
  },
  {
    id: 5,
    image: images[0],
    date: "Monday, 5 May 2025",
    title: "Door-to-Door Shipping from Korea: What's Included",
    description:
      "Our D2D service covers collection, export customs, sea or air transit, import clearance, and last-mile delivery. Here's exactly what that means for you.",
    tags: [
      { name: "D2D", color: "text-[#FF6600]", bgColor: "bg-[#FFF4EE]" },
      { name: "Korea", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 6,
    image: images[1],
    date: "Thursday, 22 May 2025",
    title: "Shipping Electronics from Korea: Compliance Requirements",
    description:
      "Consumer electronics face strict NAFDAC and SON requirements at Nigerian ports. We walk through what approvals are needed before your goods ship.",
    tags: [
      { name: "Electronics", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "Compliance", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 7,
    image: images[2],
    date: "Tuesday, 10 Jun 2025",
    title: "Tracking Your Shipment in Real Time: How It Works",
    description:
      "Every shipment on our platform gets a live tracking number. Here's how we update status from warehouse receipt through customs release to final delivery.",
    tags: [
      { name: "Tracking", color: "text-[#FF6600]", bgColor: "bg-[#FFF4EE]" },
      { name: "Operations", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
    ],
  },
  {
    id: 8,
    image: images[3],
    date: "Monday, 30 Jun 2025",
    title: "Prohibited and Restricted Items: What You Cannot Ship",
    description:
      "Certain goods are barred by Korean export law or Nigerian import regulations. This list covers the most common restricted categories for Korea–Nigeria routes.",
    tags: [
      { name: "Compliance", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
      { name: "Customs", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
    ],
  },
  {
    id: 9,
    image: images[0],
    date: "Wednesday, 16 Jul 2025",
    title: "How to Pack Fragile Items for International Sea Freight",
    description:
      "Ocean transit is long and container conditions vary. Here are the packing standards we recommend for glassware, ceramics, and fragile machinery parts.",
    tags: [
      { name: "Sea Freight", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "Packaging", color: "text-[#FF6600]", bgColor: "bg-[#FFF4EE]" },
    ],
  },
  {
    id: 10,
    image: images[1],
    date: "Friday, 1 Aug 2025",
    title: "FCL vs. LCL: When Does a Full Container Load Make Sense?",
    description:
      "Full Container Load is more cost-effective above a certain volume. We explain when to upgrade from LCL and how lead time changes with each option.",
    tags: [
      { name: "Sea Freight", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "Pricing", color: "text-[#FF6600]", bgColor: "bg-[#FFF4EE]" },
    ],
  },
  {
    id: 11,
    image: images[2],
    date: "Tuesday, 19 Aug 2025",
    title: "Supplier Coordination: How We Pick Up From Korean Manufacturers",
    description:
      "Our Korean office manages supplier pickups across Seoul, Incheon, Busan, and Goyang. Here's how the supplier booking and collection process works.",
    tags: [
      { name: "Korea", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
      { name: "Operations", color: "text-[#FF6600]", bgColor: "bg-[#FFF4EE]" },
    ],
  },
  {
    id: 12,
    image: images[3],
    date: "Thursday, 4 Sep 2025",
    title: "Invoice and Duty Planning: Avoiding Delays at the Port",
    description:
      "Incorrect commercial invoices are one of the top causes of customs hold-ups in Nigeria. Here's how to prepare your paperwork correctly the first time.",
    tags: [
      { name: "Customs", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
      { name: "Documentation", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
    ],
  },
];
