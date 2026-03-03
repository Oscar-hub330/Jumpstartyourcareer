// src/data/projectData.js

import ContractSigning from "../assets/contractsigning.jpeg";
import ContractSigning2 from "../assets/contractsigning2.webp";
import ContractSigning3 from "../assets/contractSigning3.jpeg";
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
import Energy1 from "../assets/energy1.jpeg";
import Energy2 from "../assets/energy2.webp";
import Energy3 from "../assets/energy3.webp";

export const projects = [
  {
    title: "Clean Energy Programme",
    startDate: "01 October 2025",
    endDate: "30 September 2026",
    description:
      "The JumpStart Clean Energy Programme trains learners in renewable energy and sustainable technology through hands-on, practical skills development that prepares them for opportunities in the green economy. Delivered at the new JumpStart campus in Cairnside, Mbombela, the programme combines modern facilities with real-world training to empower youth and promote environmental responsibility.",
    images: [Energy1, Energy2, Energy3],
    status: "ongoing",
  },
  {
    title: "Software & Robotics Development Programme",
    startDate: "01 August 2025",
    endDate: "31 May 2026",
    description:
      "We’re training 200 rural innovators from Maganduzweni and Pienaar in full-stack development, mobile apps, and robotics. This equips youth to launch startups and drive digital innovation in their communities.",
    images: [ContractSigning, ContractSigning2, ContractSigning3],
    status: "ongoing",
  },
  {
    title: "Graduates Programme",
    startDate: "02 May 2025",
    endDate: "30 April 2026",
    description:
      "The Graduates Programme bridges the gap between academic studies and employment through hands-on experience and mentorship. It equips rural graduates with real-world skills, boosting their confidence and employability.",
    images: [Graduates1, Graduates2, Graduates3],
    status: "ongoing",
  },
  {
    title: "Poultry Production Programme",
    startDate: "02 January 2025",
    endDate: "30 June 2025",
    description:
      "This programme equips rural youth with hands-on skills in poultry farming, combining traditional methods with modern tools. It supports food security and income generation by helping participants launch sustainable poultry businesses in their communities.",
    images: [PoultryProgramme, Poultry6, PoultryProgramme2],
    status: "completed",
  },
  {
    title: "Equipment Support Programme",
    startDate: "10 November 2023",
    endDate: "18 December 2023",
    description:
      "This programme provides rural entrepreneurs with machinery and tools to boost productivity and economic inclusion. It bridges the resource gap and supports startup growth.",
    images: [Equip1, Equip2, Equip3],
    status: "planned",
  },
  
  {
    title: "Sewing Learnership",
    startDate: "01 November 2022",
    endDate: "30 June 2023",
    description:
      "Jumpstart empowered local women and youth with skills in tailoring and textile production. The programme fostered entrepreneurship and sustainable income generation.",
    images: [Sewing1, Sewing2, Sewing3],
    status: "completed",
  },
  {
    title: "Entrepreneurship Training & Support",
    startDate: "01 June 2022",
    endDate: "30 November 2022",
    description:
      "Empowering rural youth and graduates with the skills to build and sustain businesses. Participants receive mentorship, startup toolkits, and links to funding opportunities.",
    images: [Entrepreneurship1, Entrepreneurship2, Entrepreneurship3],
    status: "completed",
  },
];
