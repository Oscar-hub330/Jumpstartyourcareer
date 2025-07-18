import React, { } from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";
import Slider from "react-slick";
import Footer from "../components/Footer";

// Sponsor logos
import BankSetaLogo from "../assets/sponsors/bankseta.png";
import TetaLogo from "../assets/sponsors/teta.png";
import SasolLogo from "../assets/sponsors/sasol.png";
import ChietaLogo from "../assets/sponsors/chieta.png";
import VodacomLogo from "../assets/sponsors/vodacom.png";
import FpmSetaLogo from "../assets/sponsors/fpmseta.png";
import PublicWorksLogo from "../assets/sponsors/publicworks.png";
import ThaboMbekiFoundationLogo from "../assets/sponsors/thabombekifoundation.png";
import DsdLogo from "../assets/sponsors/dsd.png";
import QCTOlogo from "../assets/sponsors/QCTOlogo.png";

const sponsors = [
  { name: "Thabo Mbeki Foundation", logo: ThaboMbekiFoundationLogo },
  { name: "Vodacom", logo: VodacomLogo },
  { name: "Department of Social Development", logo: DsdLogo },
  { name: "BankSeta", logo: BankSetaLogo },
  { name: "TETA", logo: TetaLogo },
  { name: "Sasol", logo: SasolLogo },
  { name: "Chieta", logo: ChietaLogo },
  { name: "FP&M Seta", logo: FpmSetaLogo },
  { name: "Department of Public Works", logo: PublicWorksLogo },
  { name: "QCTO", logo: QCTOlogo },
];

const sponsorSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2500,
  lazyLoad: "ondemand", // ✅ Lazy load sponsor logos
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const whiteCardGradient =
  "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,250,255,0.92))";

const futuristicBg =
  "linear-gradient(135deg, #fffaf5, #fef0e5, #ffe5cb)"; // ✅ New background



const About = () => {
  return (
    <div
      className="text-orange-400 min-h-screen"
      style={{
        background: futuristicBg,
        backgroundAttachment: "fixed",
        paddingBottom: "2rem",
      }}
    >
      {/* Hero */}
      <section className="py-10 mx-4 mt-6">
        <Container maxWidth="md" className="text-center">
          <Typography
            variant="h4"
            className="font-bold text-[#fea434] mb-6 tracking-wide"
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-800 text-lg leading-relaxed px-2 md:px-8"
            sx={{
              fontWeight: 400,
              textShadow: "0px 1px 2px rgba(255,255,255,0.3)",
            }}
          >
            Jumpstart is a youth-focused non-profit organisation that empowers
            young people in rural areas through digital skills, entrepreneurship
            training, and career development programs.
          </Typography>
        </Container>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-0 mx-4 mt-8">
        <Container maxWidth="lg">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              {
                title: "Vision",
                desc: "A society where both rural youth and women use their skills to contribute meaningfully to the community.",
              },
              {
                title: "Mission",
                desc: "We empower rural youth and women with various skills—especially digital literacy and entrepreneurship—ensuring no one is left behind.",
              },
              {
                title: "Values",
                desc: "Empowerment, Integrity, Innovation, Inclusivity, and Impact.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                sx={{
                  border: "2px solid #fea434",
                  borderRadius: 2,
                  boxShadow: 3,
                  height: "100%",
                  background: whiteCardGradient,
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#fea434", fontWeight: 600, mb: 1 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Sponsors */}
      <section className="py-0 mx-4 mt-6 mb-8">
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            color="#fea434"
            textAlign="center"
            gutterBottom
            mb={6}
          >
            Partners of Jumpstart
          </Typography>
          <Card
            sx={{
              border: "2px solid #fea434",
              borderRadius: 2,
              boxShadow: 3,
              background: whiteCardGradient,
              p: 3,
            }}
          >
            <Slider {...sponsorSettings}>
              {sponsors.map((sponsor) => (
                <Box
                  key={sponsor.name}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    px: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    loading="lazy" // ✅ Lazy loading added
                    sx={{
                      maxHeight: 100,
                      maxWidth: "100%",
                      objectFit: "contain",
                      transition: "opacity 0.5s ease-in-out",
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </Card>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-2 text-center mx-4 mt-10">
        <Container maxWidth="md">
          <Card
            sx={{
              background: whiteCardGradient,
              borderRadius: 2,
              padding: 4,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h5"
              className="text-[#fea434] font-bold tracking-wide mb-4"
            >
              Ready to make a difference?
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-700 text-lg leading-relaxed mb-4 px-2 md:px-6"
            >
              Join our mission and help empower the next generation.
            </Typography>
            <a href="/contact">
              <button className="mt-4 px-6 py-3 rounded-full bg-[#fea434] text-white font-semibold hover:bg-[#e69420] transition duration-300 shadow-md">
                Contact Us
              </button>
            </a>
          </Card>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default About;
