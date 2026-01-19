import React from "react";
import TeamMemberCard from "../components/TeamMemberCard";
import { Users, Award, Target } from "lucide-react";

/* ===== Images (UNCHANGED) ===== */
import PhelepheImg from "../assets/Phelephe.webp";
import CeliweImg from "../assets/celiwe.webp";
import FortunateImg from "../assets/fortunate.webp";
import GoodnessImg from "../assets/goodness.webp";
import HlanyisekaImg from "../assets/hlayiseka.webp";
import InnocentImg from "../assets/innocent.webp";
import LesediImg from "../assets/lesedi.webp";
import MxolisiImg from "../assets/mxolisi.webp";
import NondumisoHRImg from "../assets/nondumisoHR.webp";
import NokuthulaMImg from "../assets/nokuthulaM.webp";
import OscarImg from "../assets/oscar.webp";
import TshepisoImg from "../assets/tshepiso.webp";
import WandileImg from "../assets/wandile.webp";
import BongiweImg from "../assets/bongiwe.webp";

/* ===== Data ===== */
const leadership = [
  { name: "Pleasure", surname: "Phelephe", position: "Centre Manager", image: PhelepheImg },
  { name: "Hlayiseka", surname: "Mkhabela", position: "Programme Manager", image: HlanyisekaImg },
  { name: "Goodness", surname: "Nkomo", position: "Project Manager", image: GoodnessImg },
];

const departments = [
  {
    title: "Communication",
    description: "Managing internal and external communication, media relations, and public engagement.",
    members: [
      { name: "Fortunate", surname: "Nkosi", position: "Communications Officer", image: FortunateImg },
    ],
  },
  {
    title: "HR",
    description: "Supporting staff wellbeing, recruitment, compliance, and organisational development.",
    members: [
      { name: "Innocent", surname: "Mathebula", position: "HR Specialist", image: InnocentImg },
      { name: "Nondumiso", surname: "Nkosi", position: "HR Specialist", image: NondumisoHRImg },
    ],
  },
  {
    title: "Finance",
    description: "Overseeing budgeting, financial reporting, governance, and accountability.",
    members: [
      { name: "Lesedi", surname: "Ndlovu", position: "Finance Officer", image: LesediImg },
    ],
  },
  {
    title: "Marketing",
    description: "Driving brand visibility, campaigns, partnerships, and stakeholder engagement.",
    members: [
      { name: "Celiwe", surname: "Wati", position: "Marketing Coordinator", image: CeliweImg },
      { name: "Bongiwe", surname: "Gama", position: "Marketing Coordinator", image: BongiweImg },
    ],
  },
  {
    title: "Technology Team",
    description: "Designing, building, and maintaining digital platforms that power innovation.",
    members: [
      { name: "Wandile", surname: "Magagula", position: "Head of Technology", image: WandileImg },
      { name: "Nokuthula", surname: "Msimango", position: "Technology Specialist", image: NokuthulaMImg },
      { name: "Tshepiso", surname: "Makuoa", position: "Technology Specialist", image: TshepisoImg },
      { name: "Oscar", surname: "Madalane", position: "Technology Specialist", image: OscarImg },
      { name: "Mxolisi", surname: "Ndimande", position: "Technology Specialist", image: MxolisiImg },
    ],
  },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-[#FFFAF5]">

      {/* ================= HERO ================= */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full border border-[#fea434]/30 text-[#fea434] bg-[#fea434]/10">
            Our Team
          </span>

          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            Meet Our <span className="text-[#fea434]">Leadership</span>
          </h1>

          <p className="text-sm text-gray-700 leading-relaxed">
            Passionate professionals dedicated to driving innovation, creating sustainable livelihoods,
            and transforming communities through strong leadership and collaboration.
          </p>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="bg-white py-12 border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: "Collaborative", description: "Working together to achieve shared goals" },
            { icon: Award, title: "Experienced", description: "Guided by expertise and proven results" },
            { icon: Target, title: "Mission-Driven", description: "Focused on long-term impact" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 justify-center">
              <div className="w-10 h-10 bg-[#fea434]/10 rounded-lg flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#fea434]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MANAGEMENT ================= */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            Executive <span className="text-[#fea434]">Management</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#fea434] mx-auto mb-4" />
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Strategic leadership guiding the organisation’s vision and operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((m, i) => (
            <TeamMemberCard key={i} {...m} />
          ))}
        </div>
      </section>

      {/* ================= DEPARTMENTS ================= */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {departments.slice(0, 4).map((dept, i) => (
            <div key={i} className="text-center">
              <h3 className="text-base font-semibold text-[#fea434]">
                {dept.title}
              </h3>

              <div className="w-10 h-[2px] bg-[#fea434] mx-auto my-3" />

              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                {dept.description}
              </p>

              <div className="space-y-6">
                {dept.members.map((m, idx) => (
                  <TeamMemberCard key={idx} {...m} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TECHNOLOGY ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            Technology <span className="text-[#fea434]">Team</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#fea434] mx-auto mb-4" />
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            {departments[4].description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {departments[4].members.map((m, i) => (
            <TeamMemberCard key={i} {...m} />
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-white py-14 border-t border-gray-100 text-center">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          Join Our Growing Team
        </h2>
        <p className="text-sm text-gray-600 max-w-xl mx-auto mb-6">
          We are always looking for talented individuals who share our passion for making a difference.
        </p>
        <button className="border border-[#fea434] text-[#fea434] px-6 py-2 rounded-md text-sm font-medium hover:bg-[#fea434]/10 transition">
          View Open Positions
        </button>
      </section>

    </div>
  );
};

export default Team;
