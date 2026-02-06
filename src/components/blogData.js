// Make sure these paths match your actual folder structure
import ship1 from "../assets/ship1.png";
import ship2 from "../assets/ship2.png";
import ship3 from "../assets/ship3.png";
import ship4 from "../assets/ship4.png";

export const blogPosts = [
  {
    id: 1,
    image: ship1,
    date: "Sunday, 1 Jan 2023",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    tags: [
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "Research", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      {
        name: "Presentation",
        color: "text-[#C14315]",
        bgColor: "bg-[#FDF2FA]",
      },
    ],
  },
  {
    id: 2,
    image: ship2,
    date: "Monday, 2 Jan 2023",
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    tags: [
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "Research", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 3,
    image: ship3,
    date: "Tuesday, 3 Jan 2023",
    title: "Building your API Stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    tags: [
      { name: "Development", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "API", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
    ],
  },
  {
    id: 4,
    image: ship4,
    date: "Wednesday, 4 Jan 2023",
    title: "Grid system for better Design User Interface",
    description:
      "A grid system is a design tool used to arrange content on a webpage. It creates consistency across layouts.",
    tags: [
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "Interface", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 5,
    image: ship1,
    date: "Thursday, 5 Jan 2023",
    title: "Introduction to Wireframing",
    description:
      "Wireframing is an essential part of the design process. Learn the basics and best practices.",
    tags: [
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "UX", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
    ],
  },
  {
    id: 6,
    image: ship2,
    date: "Friday, 6 Jan 2023",
    title: "Understanding Color Theory",
    description:
      "Color theory is both the science and art of using color. Learn how to use it effectively in your designs.",
    tags: [
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "Theory", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 7,
    image: ship3,
    date: "Saturday, 7 Jan 2023",
    title: "Responsive Web Design Basics",
    description:
      "Creating websites that work seamlessly across all devices is crucial in today's mobile-first world.",
    tags: [
      { name: "Development", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "Responsive", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
    ],
  },
  {
    id: 8,
    image: ship4,
    date: "Sunday, 8 Jan 2023",
    title: "Typography in Modern Design",
    description:
      "Good typography is invisible, bad typography is everywhere. Learn the fundamentals of great typography.",
    tags: [
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "Typography", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 9,
    image: ship1,
    date: "Monday, 9 Jan 2023",
    title: "Mastering CSS Flexbox",
    description:
      "Flexbox is a powerful layout tool that makes it easier to design flexible responsive layout structure.",
    tags: [
      { name: "CSS", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "Development", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
    ],
  },
  {
    id: 10,
    image: ship2,
    date: "Tuesday, 10 Jan 2023",
    title: "Design Systems 101",
    description:
      "A design system is a collection of reusable components guided by clear standards for building products.",
    tags: [
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "Systems", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 11,
    image: ship3,
    date: "Wednesday, 11 Jan 2023",
    title: "User Research Methods",
    description:
      "Understanding your users is key to creating successful products. Explore various research methods.",
    tags: [
      { name: "Research", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "UX", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
    ],
  },
  {
    id: 12,
    image: ship4,
    date: "Thursday, 12 Jan 2023",
    title: "Accessibility in Web Design",
    description:
      "Making the web accessible to everyone is not just good practice, it's essential for inclusive design.",
    tags: [
      {
        name: "Accessibility",
        color: "text-[#FF6600]",
        bgColor: "bg-[#F9F5FF]",
      },
      { name: "Web", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 13,
    image: ship1,
    date: "Friday, 13 Jan 2023",
    title: "Prototyping Best Practices",
    description:
      "Prototyping helps you test and validate ideas before full development. Learn the best practices.",
    tags: [
      { name: "Prototyping", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
    ],
  },
  {
    id: 14,
    image: ship2,
    date: "Saturday, 14 Jan 2023",
    title: "Mobile-First Design Approach",
    description:
      "Starting with mobile design first ensures your product works great on smaller screens and scales up.",
    tags: [
      { name: "Mobile", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "Design", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 15,
    image: ship3,
    date: "Sunday, 15 Jan 2023",
    title: "Animation in UI Design",
    description:
      "Thoughtful animations can enhance user experience by providing feedback and guiding attention.",
    tags: [
      { name: "Animation", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "UI", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
    ],
  },
  {
    id: 16,
    image: ship4,
    date: "Monday, 16 Jan 2023",
    title: "Dark Mode Design Patterns",
    description:
      "Dark mode is more than just inverting colors. Learn how to design effective dark mode experiences.",
    tags: [
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "UI", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 17,
    image: ship1,
    date: "Tuesday, 17 Jan 2023",
    title: "Information Architecture",
    description:
      "Organizing and structuring content effectively is crucial for usability and findability.",
    tags: [
      { name: "IA", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "UX", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
    ],
  },
  {
    id: 18,
    image: ship2,
    date: "Wednesday, 18 Jan 2023",
    title: "Microinteractions Design",
    description:
      "Small details make a big difference. Learn how to design delightful microinteractions.",
    tags: [
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "Interaction", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 19,
    image: ship3,
    date: "Thursday, 19 Jan 2023",
    title: "Component-Driven Development",
    description:
      "Building UIs with components improves reusability, consistency, and development speed.",
    tags: [
      { name: "Development", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "Components", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
    ],
  },
  {
    id: 20,
    image: ship4,
    date: "Friday, 20 Jan 2023",
    title: "Design Handoff Process",
    description:
      "Smooth handoffs between design and development teams are essential for successful product delivery.",
    tags: [
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "Process", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 21,
    image: ship1,
    date: "Saturday, 21 Jan 2023",
    title: "Usability Testing Methods",
    description:
      "Testing with real users reveals issues and opportunities you might never discover otherwise.",
    tags: [
      { name: "Testing", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "UX", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
    ],
  },
  {
    id: 22,
    image: ship2,
    date: "Sunday, 22 Jan 2023",
    title: "Design Thinking Process",
    description:
      "Design thinking is a human-centered approach to innovation that puts the user at the center.",
    tags: [
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "Thinking", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 23,
    image: ship3,
    date: "Monday, 23 Jan 2023",
    title: "Performance Optimization",
    description:
      "Fast-loading websites provide better user experience and rank higher in search results.",
    tags: [
      { name: "Performance", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "Web", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
    ],
  },
  {
    id: 24,
    image: ship4,
    date: "Tuesday, 24 Jan 2023",
    title: "Content Strategy Basics",
    description:
      "Good content strategy ensures your message reaches the right people at the right time.",
    tags: [
      { name: "Content", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "Strategy", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 25,
    image: ship1,
    date: "Wednesday, 25 Jan 2023",
    title: "Version Control for Designers",
    description:
      "Version control isn't just for developers. Learn how designers can benefit from Git and similar tools.",
    tags: [
      { name: "Tools", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
    ],
  },
  {
    id: 26,
    image: ship2,
    date: "Thursday, 26 Jan 2023",
    title: "Design Critique Guidelines",
    description:
      "Effective design critiques help teams improve their work and grow as designers.",
    tags: [
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "Critique", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 27,
    image: ship3,
    date: "Friday, 27 Jan 2023",
    title: "Inclusive Design Principles",
    description:
      "Designing for diversity and inclusion makes products better for everyone.",
    tags: [
      { name: "Inclusive", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
    ],
  },
  {
    id: 28,
    image: ship4,
    date: "Saturday, 28 Jan 2023",
    title: "Design Documentation",
    description:
      "Good documentation ensures design decisions are understood and implemented correctly.",
    tags: [
      {
        name: "Documentation",
        color: "text-[#FF6600]",
        bgColor: "bg-[#F9F5FF]",
      },
      { name: "Process", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
  {
    id: 29,
    image: ship1,
    date: "Sunday, 29 Jan 2023",
    title: "Designing for Emotion",
    description:
      "Emotional design creates connections between users and products that go beyond functionality.",
    tags: [
      { name: "Emotion", color: "text-[#3538CD]", bgColor: "bg-[#EEF4FF]" },
      { name: "Design", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
    ],
  },
  {
    id: 30,
    image: ship2,
    date: "Monday, 30 Jan 2023",
    title: "The Future of Design",
    description:
      "Emerging technologies and trends are shaping the future of design in exciting new ways.",
    tags: [
      { name: "Future", color: "text-[#FF6600]", bgColor: "bg-[#F9F5FF]" },
      { name: "Trends", color: "text-[#C14315]", bgColor: "bg-[#FDF2FA]" },
    ],
  },
];
