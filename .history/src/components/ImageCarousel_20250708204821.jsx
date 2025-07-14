import React from "react";
import Slider from "react-slick";
import { Typography, Button, Container } from "@mui/material";

const slides = [
  {
    title: "Empowering Rural Youth",
    subtitle: "Equipping future leaders through tech, training, and innovation.",
    image: "/assets/branding1.jpg",
  },
  {
    title: "Skills for the Future",
    subtitle: "Jumpstart programs provide real-world opportunities and mentorship.",
    image: "/assets/branding2.jpg",
  },
  {
    title: "Tech-Driven Change",
    subtitle: "Transforming communities through ICT education and outreach.",
    image: "/assets/branding3.jpg",
  },
];

const ImageCarousel = () => {
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
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[80vh] md:h-[90vh]">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center">
              <Container maxWidth="lg" className="text-white px-6">
                <div className="max-w-2xl animate-fade-in">
                  <Typography
                    variant="h3"
                    className="font-bold mb-4 leading-tight drop-shadow-md"
                    sx={{
                      color: "#fea434",
                      fontSize: {
                        xs: "2rem",
                        sm: "2.5rem",
                        md: "3.5rem",
                      },
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="mb-6 drop-shadow-lg"
                    sx={{
                      color: "#fff",
                      fontSize: {
                        xs: "1rem",
                        md: "1.25rem",
                      },
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
