import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Typography, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

import branding1 from "../assets/branding1.webp";
import branding2 from "../assets/branding2.webp";
import branding3 from "../assets/branding3.webp";

const slides = [
  {
    title: "Empowering rural youth and Women",
    subtitle: "Equipping future leaders through tech, training, and innovation.",
    description: "Jumpstart programs provide real-world opportunities and mentorship.",
    buttonText: "Learn More",
    image: branding1,
    link: "/services",
  },
  {
    title: "Agricultural Skills for the Future",
    subtitle: "Building Agricultural Skills",
    description: "Hands-on programs to equip youth with sustainable farming knowledge.",
    buttonText: "Explore Programs",
    image: branding2,
    link: "/projects",
  },
  {
    title: "Entrepreneurship Development",
    subtitle: "Creating Opportunities",
    description: "Learn to create, manage, and scale successful enterprises in your community.",
    buttonText: "Get Started",
    image: branding3,
    link: "/about",
  },
];

const ImageCarousel = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full relative">
      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Navigation]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        speed={600}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col lg:flex-row items-center w-full h-[60vh] md:h-[50vh] bg-white">
              {/* Left Column - Text */}
              <div className="lg:w-1/2 w-full p-6 lg:p-16 flex flex-col justify-center h-full z-10 relative">
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#fea434",
                    fontWeight: "bold",
                    mb: 2,
                    textTransform: "uppercase",
                    fontSize: { xs: "0.85rem", md: "0.95rem" },
                  }}
                >
                  {slide.subtitle}
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    mb: 3,
                    fontSize: { xs: "2rem", md: "3rem" },
                    color: "#111827",
                  }}
                >
                  {slide.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 6,
                    fontSize: { xs: "0.95rem", md: "1.2rem" },
                    color: "#374151",
                  }}
                >
                  {slide.description}
                </Typography>

                {/* Button linked to relative page */}
                <Button
                  component={Link}
                  to={slide.link}
                  variant="contained"
                  sx={{
                    backgroundColor: "#fea434",
                    color: "#fff",
                    fontWeight: "bold",
                    px: 4,
                    py: 1.5,
                    borderRadius: "10px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#e06b1f" },
                  }}
                >
                  {slide.buttonText}
                </Button>
              </div>

              {/* Right Column - Image */}
              <div className="lg:w-1/2 w-full h-full flex justify-center items-center relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Dots positioned over image */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                  {slides.map((_, i) => (
                    <span
                      key={i}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        i === activeIndex ? "w-6 bg-orange-500" : "w-3 bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <IconButton className="swiper-button-prev hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow z-10">
        <ChevronLeft size={18} />
      </IconButton>
      <IconButton className="swiper-button-next hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-2 rounded-full shadow z-10">
        <ChevronRight size={18} />
      </IconButton>
    </div>
  );
};

export default ImageCarousel;
