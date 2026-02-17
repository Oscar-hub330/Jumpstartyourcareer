import React from "react";
import { ServiceCard } from "../components/Services/ServiceCard";
import {
  Code2,
  GraduationCap,
  Users,
  Sprout,
  Wrench,
  Shirt,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    title: "Coding, AI & Robotics",
    icon: Code2,
    description:
      "We equip rural youth with coding, AI, and robotics skills, preparing them for careers in the digital economy and tech innovation.",
  },
  {
    title: "Graduate Mentorship & Upskilling",
    icon: GraduationCap,
    description:
      "Bridging the gap between graduates and employers by providing hands-on work experience and professional development opportunities.",
  },
  {
    title: "Entrepreneurship Development",
    icon: Users,
    description:
      "Empowering rural youth with entrepreneurship skills, business mentorship and business funding to launch sustainable ventures.",
  },
  {
    title: "Poultry Farming & Agri-Tech",
    icon: Sprout,
    description:
      "Empowering rural communities with sustainable poultry farming skills, integrated with smart agriculture solutions.",
  },
  {
    title: "Equipment Support Programmes",
    icon: Wrench,
    description:
      "Supporting rural entrepreneurs with essential tools and machinery to ensure they participate meaningfully in the economy.",
  },
  {
    title: "Clothing Manufacturing Learnerships & Market Access",
    icon: Shirt,
    description:
      "Providing accredited clothing manufacturing programmes that promote economic independence for rural youth and women, ensuring they are integrated into the economy.",
  },
  {
    title: "Career Development & STEM",
    icon: Rocket,
    description:
      "Empowering rural learners to pursue in-demand careers, particularly in STEM (Science, Technology, Engineering, and Mathematics), that align with current and future market needs.",
  },
];

const impactStats = [
  { value: "760+", label: "Lives Impacted" },
  { value: "7+", label: "Communities Served" },
  { value: "10", label: "Core Programs" },
  { value: "85%", label: "Success Rate" },
];

const whyChooseUs = [
  {
    title: "Evidence-Based Approach",
    description:
      "All programs are designed using proven methodologies and best practices.",
  },
  {
    title: "Community-Centered",
    description:
      "We work alongside communities to ensure culturally relevant solutions.",
  },
  {
    title: "Sustainable Impact",
    description:
      "Focus on long-term outcomes that create lasting change and self-sufficiency.",
  },
  {
    title: "Inclusive Programs",
    description:
      "Finding talent and building a future that is inclusive of all, regardless of background or circumstance.",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO SECTION */}
      <section className="relative h-[38vh] flex items-center justify-center text-center bg-gradient-to-r from-[#FFFAF5] to-[#FFFAF5]">
        <div className="relative z-10 max-w-3xl px-4 text-gray-900">
          <h1 className="text-3xl font-semibold mb-4">Our Services</h1>
          <p className="text-base text-gray-800/90">
            Driving transformation through technology, education, and entrepreneurship in underserved communities.
          </p>
        </div>
      </section>

      {/* IMPACT STATS (OVERLAP HERO) */}
      <section className="relative -mt-0 px-4 z-16">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex justify-between gap-6 text-center -translate-y-1/2">
          {impactStats.map((stat) => (
            <div key={stat.label} className="flex-1">
              <div className="text-2xl font-bold text-[#fea434]">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Comprehensive Program Offerings
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Our integrated approach ensures sustainable development and long-term success for individuals and communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>

        {/* WHY CHOOSE US */}
        <div className="bg-[#fea434]/5 rounded-xl p-8 border border-[#fea434]/20">
          <h3 className="text-xl font-semibold text-center mb-6">
            Our Commitment to Excellence
          </h3>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#fea434] mt-1" />
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h3 className="text-2xl font-semibold mb-4">Ready to Make a Difference?</h3>
        <p className="text-base text-gray-600 mb-6">
          Join us in creating opportunities and transforming communities.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/contact"
            className="px-5 py-2.5 text-sm font-medium rounded-md bg-[#fea434] text-white hover:opacity-90 transition flex items-center gap-2"
          >
            Get Involved <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="/projects"
            className="px-5 py-2.5 text-sm font-medium rounded-md border border-[#fea434] text-[#fea434] hover:bg-[#fea434]/10 transition"
          >
            View Projects
          </a>
        </div>
      </section>

    </div>
  );
};

export default Services;
