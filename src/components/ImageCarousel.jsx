import React, { useRef, useState, useMemo, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Typography, Button, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

/* Images */
import branding1 from "../assets/branding1.webp";
import branding2 from "../assets/branding2.webp";
import branding3 from "../assets/branding3.webp";


/* ================= SLIDES ================= */

const slidesData = Object.freeze([
  {
    title: "Empowering Rural Youth and Women",
    subtitle: "Equipping future leaders through tech, training, and innovation.",
    description:
      "Jumpstart programs provide real-world opportunities and mentorship.",
    buttonText: "Learn More",
    image: branding1,
    link: "/services",
  },
  {
    title: "Agricultural Skills for the Future",
    subtitle: "Building Agricultural Skills",
    description:
      "Hands-on programs to equip youth with sustainable farming knowledge.",
    buttonText: "Explore Programs",
    image: branding2,
    link: "/projects",
  },
  {
    title: "Entrepreneurship Development",
    subtitle: "Creating Opportunities",
    description:
      "Learn to create, manage, and scale successful enterprises in your community.",
    buttonText: "Get Started",
    image: branding3,
    link: "/about",
  },
]);


/* ================= COMPONENT ================= */

const ImageCarousel = () => {

  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo(() => slidesData, []);


  return (

    <Box sx={{ width: "100%", position: "relative" }}>

      <Swiper
        modules={[Autoplay, Navigation]}
        loop
        speed={600}
        autoplay={{ delay: 5000, disableOnInteraction: false }}

        navigation={{
          prevEl: ".carousel-prev",
          nextEl: ".carousel-next"
        }}

        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}

        className="w-full"
      >

        {slides.map((slide, index) => (

          <SwiperSlide key={slide.title}>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                alignItems: "center",
                width: "100%",
                height: { xs: "auto", md: "40vh", lg: "50vh" },
                bgcolor: "#fff",
                overflow: "hidden"
              }}
            >

              {/* TEXT */}

              <Box
                sx={{
                  width: { xs: "100%", lg: "50%" },
                  p: { xs: 3, sm: 4, md: 6, lg: 8 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >

                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#fea434",
                    fontWeight: 700,
                    mb: 1.5,
                    textTransform: "uppercase",
                    fontSize: { xs: "0.75rem", md: "0.9rem" }
                  }}
                >
                  {slide.subtitle}
                </Typography>


                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    color: "#111827",
                    fontSize: {
                      xs: "1.6rem",
                      sm: "2rem",
                      md: "2.4rem",
                      lg: "3rem"
                    }
                  }}
                >
                  {slide.title}
                </Typography>


                <Typography
                  variant="body1"
                  sx={{
                    mb: { xs: 3, md: 5 },
                    color: "#374151",
                    fontSize: { xs: "0.9rem", md: "1.1rem" },
                    lineHeight: 1.7
                  }}
                >
                  {slide.description}
                </Typography>


                <Button
                  component={Link}
                  to={slide.link}
                  variant="contained"
                  sx={{
                    bgcolor: "#fea434",
                    fontWeight: 700,
                    px: { xs: 3, md: 4 },
                    py: 1.5,
                    borderRadius: "10px",
                    textTransform: "none",
                    width: { xs: "100%", sm: "auto" },
                    maxWidth: 260,
                    "&:hover": { bgcolor: "#e06b1f" }
                  }}
                >
                  {slide.buttonText}
                </Button>

              </Box>



              {/* IMAGE */}

              <Box
                sx={{
                  width: { xs: "100%", lg: "50%" },
                  height: { xs: 260, sm: 320, md: "100%" },
                  position: "relative"
                }}
              >

                <Box
                  component="img"
                  src={slide.image}
                  alt={slide.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 1
                  }}
                />


                {/* DOTS */}

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 1.5,
                    zIndex: 20
                  }}
                >

                  {slidesData.map((_, i) => (

                    <Box
                      key={i}
                      sx={{
                        height: 10,
                        borderRadius: 10,
                        transition: "all .3s",
                        width: i === activeIndex ? 24 : 10,
                        bgcolor:
                          i === activeIndex
                            ? "#f97316"
                            : "rgba(255,255,255,0.7)"
                      }}
                    />

                  ))}

                </Box>

              </Box>

            </Box>

          </SwiperSlide>

        ))}

      </Swiper>


      {/* NAVIGATION */}

      <IconButton
        className="carousel-prev hidden sm:flex"
        sx={{
          position: "absolute",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.7)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.95)" },
          boxShadow: 2,
          zIndex: 10
        }}
      >
        <ChevronLeft size={18}/>
      </IconButton>


      <IconButton
        className="carousel-next hidden sm:flex"
        sx={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(255,255,255,0.7)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.95)" },
          boxShadow: 2,
          zIndex: 10
        }}
      >
        <ChevronRight size={18}/>
      </IconButton>

    </Box>

  );

};


export default memo(ImageCarousel);