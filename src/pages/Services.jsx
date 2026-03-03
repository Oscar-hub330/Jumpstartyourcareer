import React, { memo, useMemo } from "react";
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

/* ================= STATIC DATA ================= */

const servicesData = Object.freeze([
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
      "Providing accredited clothing manufacturing programmes that promote economic independence for rural youth and women.",
  },
  {
    title: "Career Development & STEM",
    icon: Rocket,
    description:
      "Empowering rural learners to pursue in-demand careers aligned with current and future market needs.",
  },
]);

const impactStatsData = Object.freeze([
  { value: "760+", label: "Lives Impacted" },
  { value: "7+", label: "Communities Served" },
  { value: "10", label: "Core Programs" },
  { value: "85%", label: "Success Rate" },
]);

const whyChooseUsData = Object.freeze([
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
      "Finding talent and building a future that is inclusive of all.",
  },
]);

/* ================= COMPONENT ================= */

const Services = memo(() => {
  const services = useMemo(() => servicesData, []);
  const impactStats = useMemo(() => impactStatsData, []);
  const whyChooseUs = useMemo(() => whyChooseUsData, []);

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="flex items-center justify-center text-center bg-[#FFFAF5]" style={{ minHeight: "32vh" }}>
        <div className="max-w-3xl px-4 py-10 text-gray-900">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-3">Our Services</h1>

          <p className="text-sm sm:text-base text-gray-800/90 max-w-xl mx-auto">
            Driving transformation through technology, education, and entrepreneurship in underserved communities.
          </p>
        </div>
      </section>


      {/* IMPACT STATS */}
      <section className="px-4 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

          {impactStats.map(stat => (
            <div key={stat.label}>
              <div className="text-xl sm:text-2xl font-bold text-[#fea434]">
                {stat.value}
              </div>

              <div className="text-xs sm:text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}

        </div>
      </section>


      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-4 py-14 sm:py-16">

        <div className="text-center mb-10 sm:mb-12">

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
            Comprehensive Program Offerings
          </h2>

          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Our integrated approach ensures sustainable development and long-term success for individuals and communities.
          </p>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-14 sm:mb-16">

          {services.map(service => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}

        </div>


        {/* WHY CHOOSE US */}
        <div className="bg-[#fea434]/5 rounded-xl p-5 sm:p-8 border border-[#fea434]/20">

          <h3 className="text-lg sm:text-xl font-semibold text-center mb-5 sm:mb-6">
            Our Commitment to Excellence
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto">

            {whyChooseUs.map(item => (
              <div key={item.title} className="flex gap-3">

                <CheckCircle2 className="w-5 h-5 text-[#fea434] mt-1 flex-shrink-0" />

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
      <section className="py-14 sm:py-16 text-center px-4">

        <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          Ready to Make a Difference?
        </h3>

        <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
          Join us in creating opportunities and transforming communities.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">

          <a
            href="/contact"
            className="px-5 py-2.5 text-sm font-medium rounded-md bg-[#fea434] text-white hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            Get Involved
            <ArrowRight className="w-4 h-4"/>
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
});

export default Services;