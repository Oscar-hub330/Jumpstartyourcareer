import React, { Suspense, lazy, memo } from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";
import { Link } from "react-router-dom";

// Lazy chunks
const Slider = lazy(() => import("react-slick"));

// Static assets (already webp ✅)
import BankSetaLogo from "../assets/sponsors/bankseta.webp";
import TetaLogo from "../assets/sponsors/teta.webp";
import SasolLogo from "../assets/sponsors/sasol.webp";
import ChietaLogo from "../assets/sponsors/chieta.webp";
//import VodacomLogo from "../assets/sponsors/vodacom.webp";
import FpmSetaLogo from "../assets/sponsors/fpmseta.webp";
import PublicWorksLogo from "../assets/sponsors/publicworks.webp";
import ThaboMbekiFoundationLogo from "../assets/sponsors/ThaboMbekiFoundation.webp";
import DsdLogo from "../assets/sponsors/dsd.webp";
import QCTOlogo from "../assets/sponsors/QCTOlogo.webp";

/* =======================
   STATIC CONSTANTS
======================= */

const sponsors = Object.freeze([
  { name: "Thabo Mbeki Foundation", logo: ThaboMbekiFoundationLogo },
  //{ name: "Vodacom", logo: VodacomLogo },
  { name: "Department of Social Development", logo: DsdLogo },
  { name: "BankSeta", logo: BankSetaLogo },
  { name: "TETA", logo: TetaLogo },
  { name: "Sasol", logo: SasolLogo },
  { name: "Chieta", logo: ChietaLogo },
  { name: "FP&M Seta", logo: FpmSetaLogo },
  { name: "Department of Public Works", logo: PublicWorksLogo },
  { name: "QCTO", logo: QCTOlogo },
]);

const sponsorSettings = Object.freeze({
  dots: false,
  arrows: false,
  infinite: true,
  speed: 400,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 4,
  slidesToScroll: 1,
  lazyLoad: "progressive",
  pauseOnHover: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
});

const whiteCardGradient =
  "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(245,250,255,0.92))";

const futuristicBg =
  "linear-gradient(135deg, #fffaf5, #fef0e5, #ffe5cb)";

/* =======================
   COMPONENT
======================= */

const About = memo(() => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: futuristicBg,
        pt: "80px",
        pb: 6,
      }}
    >
      {/* HERO */}
      <section className="py-0 mx-4">
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#fea434", mb: 3 }}>
            About Us
          </Typography>

          <Typography sx={{ color: "#333", lineHeight: 1.8 }}>
            Jumpstart is a youth-focused non-profit organisation empowering rural
            youth through digital skills, entrepreneurship, and career programs.
          </Typography>
        </Container>
      </section>

      {/* VALUES */}
      <section className="mx-4 mt-8">
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {["Vision", "Mission", "Values"].map((title, i) => (
              <Card
                key={title}
                sx={{
                  border: "2px solid #fea434",
                  background: whiteCardGradient,
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography sx={{ color: "#fea434", fontWeight: 600, mb: 1 }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {[
                      "A society where rural youth and women contribute meaningfully using their skills.",
                      "Empowering rural youth and women through digital literacy and entrepreneurship.",
                      "Empowerment, Integrity, Innovation, Inclusivity, Impact.",
                    ][i]}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </section>

      {/* PARTNERS – DEFERRED */}
      <section className="mx-4 mt-12 mb-12">
        <Container maxWidth="lg">
          <Typography textAlign="center" sx={{ color: "#fea434", mb: 4 }} variant="h4">
            Partners of Jumpstart
          </Typography>

          <Card sx={{ background: whiteCardGradient, p: 3 }}>
            <Suspense fallback={<Box sx={{ height: 120 }} />}>
              <Slider {...sponsorSettings}>
                {sponsors.map((s) => (
                  <Box key={s.name} sx={{ display: "flex", justifyContent: "center" }}>
                    <Box
                      component="img"
                      src={s.logo}
                      alt={s.name}
                      loading="lazy"
                      decoding="async"
                      width={160}
                      height={80}
                      sx={{ objectFit: "contain" }}
                    />
                  </Box>
                ))}
              </Slider>
            </Suspense>
          </Card>
        </Container>
      </section>

      {/* CTA */}
      <section className="mx-4 text-center">
        <Container maxWidth="md">
          <Card sx={{ background: whiteCardGradient, p: 4 }}>
            <Typography sx={{ color: "#fea434", fontWeight: 700, mb: 2 }} variant="h5">
              Ready to make a difference?
            </Typography>

            <Typography sx={{ mb: 3 }}>
              Join our mission and empower the next generation.
            </Typography>

            <Link to="/contact">
              <button className="px-6 py-3 rounded-full bg-[#fea434] text-white font-semibold hover:bg-[#e69420] transition">
                Contact Us
              </button>
            </Link>
          </Card>
        </Container>
      </section>

      <Suspense fallback={null}>
    
      </Suspense>
    </Box>
  );
});
About.displayName = "About";

export default About;
