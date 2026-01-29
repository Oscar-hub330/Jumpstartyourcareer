import React from "react";
import TeamMemberCard from "../components/TeamMemberCard";

/* ===== Images ===== */
import FortunateImg from "../assets/fortunate.webp";
import NondumisoHRImg from "../assets/nondumisoHR.webp";
import HlanyisekaImg from "../assets/hlayiseka.webp";
import GoodnessImg from "../assets/goodness.webp";
import WandileImg from "../assets/wandile.webp";
import MkhongoImg from "../assets/mkhongelo.webp";

/* ===== Jumpstart Management ONLY ===== */
const management = [
  { name: "Fortunate", surname: "Nkosi", position: "Campus Manager", image: FortunateImg },
  { name: "Nondumiso", surname: "Nkosi", position: "Human Resource", image: NondumisoHRImg },
  { name: "Hlayiseka", surname: "Mkhabela", position: "Programmes Manager", image: HlanyisekaImg },
  { name: "Mkhongelo", surname: "Mkhonto", position: "Monitoring & Evaluation", image: MkhongoImg }, // replace later
  { name: "Goodness", surname: "Nkomo", position: "Project Manager", image: GoodnessImg },
  { name: "Wandile", surname: "Magagula", position: "Innovation & IT", image: WandileImg },
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
            Jumpstart Your Career <span className="text-[#fea434]">Management</span>
          </h1>

          <p className="text-sm text-gray-700 leading-relaxed">
            Dedicated leaders guiding operations, programmes, innovation, and student success.
          </p>
        </div>
      </section>

      {/* ================= MANAGEMENT GRID ================= */}
      <section className="bg-white py-16 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {management.map((member, i) => (
              <TeamMemberCard key={i} {...member} />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Team;
