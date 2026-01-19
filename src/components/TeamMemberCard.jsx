/* eslint-disable react/prop-types */
import React from "react";

const TeamMemberCard = ({
  image,
  name,
  surname,
  position,
  featured = false,
}) => {
  return (
    <div
      className={`bg-white rounded-xl p-5 text-center shadow-sm ${
        featured ? "border border-[#fea434]/30" : ""
      }`}
    >
      <img
        src={image}
        alt={`${name} ${surname}`}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />

      <h3 className="text-base font-semibold text-gray-900">
        {name} {surname}
      </h3>

      <p className="text-sm font-medium text-[#fea434] mt-1">
        {position}
      </p>
    </div>
  );
};

export default TeamMemberCard;
