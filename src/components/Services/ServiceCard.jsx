/* eslint-disable react/prop-types */
import React from "react";

export const ServiceCard = ({ title, description, icon: Icon }) => {
  return (
    <div className="h-full flex flex-col border border-gray-200 rounded-xl p-6 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      
      {/* Icon */}
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center mb-4 group-hover:from-orange-100 group-hover:to-orange-200 transition-colors">
        <Icon className="w-8 h-8 text-[#fea434]" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 leading-tight mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-700 leading-relaxed flex-1">
        {description}
      </p>

      {/* Accent line */}
      <div className="mt-6 w-12 h-1 bg-gradient-to-r from-[#fea434] to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
