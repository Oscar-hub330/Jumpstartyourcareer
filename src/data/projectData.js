// src/data/projectData.js

import ContractSigning from "../assets/contractsigning.webp";
import ContractSigning2 from "../assets/contractsigning2.webp";
import ContractSigning3 from "../assets/contractsigning3.webp";
import Graduates1 from "../assets/graduates1.webp";
import Graduates2 from "../assets/graduates2.webp";
import Graduates3 from "../assets/graduates3.webp";
import Entrepreneurship1 from "../assets/entrepreneurship1.webp";
import Entrepreneurship2 from "../assets/entrepreneurship2.webp";
import Entrepreneurship3 from "../assets/entrepreneurship3.webp";
import PoultryProgramme from "../assets/poultryprogramme.webp";
import Poultry6 from "../assets/poultry6.webp";
import PoultryProgramme2 from "../assets/poultryprogramme2.webp";
import Sewing1 from "../assets/sewing1.webp";
import Sewing2 from "../assets/sewing2.webp";
import Sewing3 from "../assets/sewing3.webp";
import Equip1 from "../assets/equip1.webp";
import Equip2 from "../assets/equip2.webp";
import Equip3 from "../assets/equip3.webp";

export const projects = [
  {
    title: "Software & Robotics Development Programme",
    startDate: "March 2023",
    endDate: "Ongoing",
    description:
      "We’re training 200 rural innovators from Maganduzweni and Pienaar in full-stack development, mobile apps, and robotics. This equips youth to launch startups and drive digital innovation in their communities.",
    images: [ContractSigning, ContractSigning2, ContractSigning3],
    status: "ongoing",
  },
  {
    title: "Graduates Programme",
    startDate: "January 2022",
    endDate: "December 2023",
    description:
      "The Graduates Programme bridges the gap between academic studies and employment through hands-on experience and mentorship. It equips rural graduates with real-world skills, boosting their confidence and employability.",
    images: [Graduates1, Graduates2, Graduates3],
    status: "completed",
  },
  {
    title: "Entrepreneurship Training & Support",
    startDate: "July 2021",
    endDate: "Ongoing",
    description:
      "Empowering rural youth and graduates with the skills to build and sustain businesses. Participants receive mentorship, startup toolkits, and links to funding opportunities.",
    images: [Entrepreneurship1, Entrepreneurship2, Entrepreneurship3],
    status: "ongoing",
  },
  {
    title: "Poultry Production Programme",
    startDate: "April 2022",
    endDate: "June 2023",
    description:
      "This programme equips rural youth with hands-on skills in poultry farming, combining traditional methods with modern tools. It supports food security and income generation by helping participants launch sustainable poultry businesses in their communities.",
    images: [PoultryProgramme, Poultry6, PoultryProgramme2],
    status: "completed",
  },
  {
    title: "Equipment Support Programme",
    startDate: "May 2023",
    endDate: "October 2023",
    description:
      "This programme provides rural entrepreneurs with machinery and tools to boost productivity and economic inclusion. It bridges the resource gap and supports startup growth.",
    images: [Equip1, Equip2, Equip3],
    status: "planned",
  },
  {
    title: "Sewing Learnership",
    startDate: "February 2021",
    endDate: "August 2021",
    description:
      "Jumpstart empowered local women and youth with skills in tailoring and textile production. The programme fostered entrepreneurship and sustainable income generation.",
    images: [Sewing1, Sewing2, Sewing3],
    status: "completed",
  },
];
