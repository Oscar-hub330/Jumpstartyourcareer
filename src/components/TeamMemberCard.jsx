/* eslint-disable react/prop-types */
import React from "react";

const TeamMemberCard = ({ name, surname, position, image }) => {
  return (
    <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-transform duration-300">
      {/* Image */}
      <div className="w-48 h-48 md:w-56 md:h-56 mb-4 rounded-full overflow-hidden border-4 border-[#fea434]">
        <img
          src={image}
          alt={`${name} ${surname}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name */}
      <h3 className="text-lg md:text-xl font-semibold">{name} {surname}</h3>

      {/* Position */}
      <p className="text-sm md:text-base text-[#555] mt-1">{position}</p>
    </div>
  );
};

export default TeamMemberCard;
