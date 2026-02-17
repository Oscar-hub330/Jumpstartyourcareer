import React from "react";
import TeamMemberCard from "../components/TeamMemberCard";

/* ===== Images ===== */
import FortunateImg from "../assets/fortunate.jpg";
import NondumisoHRImg from "../assets/nondumiso.jpg";
import HlanyisekaImg from "../assets/hlayiseka.webp";
import GoodnessImg from "../assets/goodness.jpg";
import WandileImg from "../assets/wandile.webp";
import MkhongoImg from "../assets/mkhongelo.jpg";

/* ===== Jumpstart Management ONLY ===== */
const management = [
  { name: "Fortunate", surname: "Nkosi", position: "Campus Manager", image: FortunateImg },
  { name: "Nondumiso", surname: "Nkosi", position: "HR Manager", image: NondumisoHRImg },
  { name: "Hlayiseka", surname: "Mkhabela", position: "Programmes Manager", image: HlanyisekaImg },
  { name: "Mkhongelo", surname: "Mkhonto", position: "Monitoring & Evaluation Manager", image: MkhongoImg },
  { name: "Goodness", surname: "Nkomo", position: "Project Manager", image: GoodnessImg },
  { name: "Wandile", surname: "Magagula", position: "Innovation & IT Manager", image: WandileImg },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-[#FFFAF5]">

      {/* ================= HERO ================= */}
      <section className="py-12 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full border border-[#fea434]/30 text-[#fea434] bg-[#fea434]/10">
            Our Team
          </span>

          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            Jumpstart Your Career <span className="text-[#fea434]">Management</span>
          </h1>

          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            Dedicated leaders guiding operations, programmes, innovation, and student success.
          </p>
        </div>
      </section>

      {/* ================= MANAGEMENT GRID ================= */}
      <section className="bg-white py-8 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">

          {/* First Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {management.slice(0, 3).map((member, i) => (
              <TeamMemberCard key={i} {...member} />
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {management.slice(3).map((member, i) => (
              <TeamMemberCard key={i} {...member} />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Team;
