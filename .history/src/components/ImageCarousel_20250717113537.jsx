import React, { useState } from "react";
import Slider from "react-slick";
import { Container, Typography, Button } from "@mui/material";

// ✅ Local images (consider compressing and converting to WebP outside code)
import branding1 from "../assets/oscar.jpg";
import branding2 from "../assets/branding2.jpg";
import branding3 from "../assets/branding3.jpg";

const slides = [
  {
    title: "Empowering Rural & Youth",
    subtitle: "Equipping future leaders through tech, training, and innovation.",
    image: branding1,
  },
  {
    title: "Agricultural Skills for the Future",
    subtitle: "Jumpstart programs provide real-world opportunities and mentorship.",
    image: branding2,
  },
  {
    title: "Tech-Driven Change",
    subtitle: "Transforming communities through ICT education and outreach.",
    image: branding3,
  },
];

const ImageCarousel = () => {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    lazyLoad: "ondemand", // ✅ Lazy load only when needed
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[70vh] md:h-[50vh]">
            {/* ✅ Placeholder while loading */}
            {!loadedImages[index] && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
            )}

            {/* ✅ Image with smooth fade-in */}
            <img
              src={slide.image}
              alt={slide.title}
              loading="lazy"
              onLoad={() => handleImageLoad(index)}
              className={`w-full h-full object-cover brightness-75 transition-opacity duration-700 ${
                loadedImages[index] ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* ✅ Overlay with content */}
            <div className="absolute inset-0 flex items-center bg-gradient-to-t from-black/70 via-transparent to-transparent z-10">
              <Container maxWidth="lg" className="text-white px-6">
                <div className="max-w-2xl animate-fade-in">
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#fea434",
                      fontWeight: "bold",
                      fontSize: {
                        xs: "2rem",
                        sm: "2.5rem",
                        md: "3.5rem",
                      },
                      mb: 2,
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#fff",
                      fontSize: {
                        xs: "1rem",
                        md: "1.25rem",
                      },
                      mb: 4,
                    }}
                  >
                    {slide.subtitle}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#fea434",
                      color: "#000",
                      fontWeight: "bold",
                      px: 3,
                      py: 1.5,
                      borderRadius: "10px",
                      textTransform: "none",
                      transition: "0.3s",
                      "&:hover": {
                        backgroundColor: "#e0922c",
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </Container>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
