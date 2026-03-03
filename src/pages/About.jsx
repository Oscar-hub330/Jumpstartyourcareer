import React, { Suspense, lazy, memo, useMemo } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

/* Lazy Slider */
const Slider = lazy(() => import("react-slick"));

/* Sponsor Logos */

import BankSetaLogo from "../assets/sponsors/bankseta.webp";
import TetaLogo from "../assets/sponsors/teta.webp";
import SasolLogo from "../assets/sponsors/sasol.webp";
import ChietaLogo from "../assets/sponsors/chieta.webp";
import FpmSetaLogo from "../assets/sponsors/fpmseta.webp";
import PublicWorksLogo from "../assets/sponsors/publicworks.webp";
import ThaboMbekiFoundationLogo from "../assets/sponsors/ThaboMbekiFoundation.webp";
import DsdLogo from "../assets/sponsors/dsd.webp";
import QCTOlogo from "../assets/sponsors/QCTOlogo.webp";


/* ================= STATIC CONSTANTS ================= */

const whiteCardGradient =
  "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(245,250,255,0.92))";

const futuristicBg =
  "linear-gradient(135deg, #fffaf5, #fef0e5, #ffe5cb)";


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

    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3
      }
    },

    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2
      }
    },

    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2
      }
    }

  ]
});
/* ================= COMPONENT ================= */

const About = memo(() => {


  /* Stable Sponsor List */

  const sponsors = useMemo(
    () => [
      { name: "Thabo Mbeki Foundation", logo: ThaboMbekiFoundationLogo },
      { name: "Department of Social Development", logo: DsdLogo },
      { name: "BankSeta", logo: BankSetaLogo },
      { name: "TETA", logo: TetaLogo },
      { name: "Sasol", logo: SasolLogo },
      { name: "Chieta", logo: ChietaLogo },
      { name: "FP&M Seta", logo: FpmSetaLogo },
      { name: "Department of Public Works", logo: PublicWorksLogo },
      { name: "QCTO", logo: QCTOlogo },
    ],
    []
  );


  const values = useMemo(
    () => [
      {
        title: "Vision",
        text: "A society where rural youth and women contribute meaningfully using their skills.",
      },
      {
        title: "Mission",
        text: "Empowering rural youth and women through digital literacy and entrepreneurship.",
      },
      {
        title: "Values",
        text: "Empowerment, Integrity, Innovation, Inclusivity, Impact.",
      },
    ],
    []
  );


  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: futuristicBg,
        pt: { xs: "70px", md: "80px" },
        pb: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3 },
      }}
    >


{/* ================= HERO ================= */}

<Container
maxWidth="md"
sx={{
textAlign:"center",
mb:{xs:5,md:6}
}}
>

<Typography
variant="h4"
sx={{
fontWeight:700,
color:"#fea434",
mb:3,
fontSize:{
xs:"1.7rem",
md:"2.2rem"
}
}}
>
About Us
</Typography>


<Typography
sx={{
color:"#333",
lineHeight:1.8,
fontSize:{
xs:"0.95rem",
md:"1.05rem"
}
}}
>

Jumpstart is a youth-focused non-profit organisation empowering rural
youth through digital skills, entrepreneurship, and career programs.

</Typography>

</Container>



{/* ================= VALUES ================= */}

<Container maxWidth="lg" sx={{ mb:{xs:6,md:8} }}>

<Box
sx={{

display:"grid",

gridTemplateColumns:{
xs:"1fr",
sm:"1fr 1fr",
md:"repeat(3,1fr)"
},

gap:{xs:2.5,md:3}

}}
>

{values.map((item)=>(
<Card
key={item.title}
elevation={0}
sx={{
border:"2px solid #fea434",
background:whiteCardGradient,
borderRadius:2,
height:"100%"
}}
>

<CardContent>

<Typography
sx={{
color:"#fea434",
fontWeight:600,
mb:1,
fontSize:{
xs:"1rem",
md:"1.1rem"
}
}}
>

{item.title}

</Typography>


<Typography
variant="body2"
sx={{
color:"#555",
fontSize:{
xs:"0.9rem",
md:"0.95rem"
},
lineHeight:1.7
}}
>

{item.text}

</Typography>


</CardContent>

</Card>
))}

</Box>

</Container>



{/* ================= PARTNERS ================= */}

<Container maxWidth="lg" sx={{ mb:{xs:6,md:10} }}>

<Typography
textAlign="center"
variant="h4"
sx={{
color:"#fea434",
mb:{xs:3,md:4},
fontSize:{
xs:"1.6rem",
md:"2rem"
}
}}
>

Partners of Jumpstart

</Typography>


<Card
elevation={0}
sx={{
background:whiteCardGradient,
p:{xs:2,md:3}
}}
>

<Suspense
fallback={
<Box
sx={{
height:120
}}
/>
}
>

<Slider {...sponsorSettings}>

{sponsors.map((sponsor)=>(
<Box
key={sponsor.name}
sx={{
display:"flex",
justifyContent:"center",
px:1
}}
>

<Box
component="img"
src={sponsor.logo}
alt={sponsor.name}
loading="lazy"
decoding="async"
width={150}
height={70}
sx={{
objectFit:"contain"
}}
/>

</Box>
))}

</Slider>

</Suspense>

</Card>

</Container>



{/* ================= CTA ================= */}

<Container maxWidth="md">

<Card
elevation={0}
sx={{
background:whiteCardGradient,
p:{xs:3,md:4},
textAlign:"center"
}}
>

<Typography
variant="h5"
sx={{
color:"#fea434",
fontWeight:700,
mb:2,
fontSize:{
xs:"1.4rem",
md:"1.7rem"
}
}}
>

Ready to make a difference?

</Typography>


<Typography
sx={{
mb:3,
fontSize:{
xs:"0.95rem",
md:"1rem"
}
}}
>

Join our mission and empower the next generation.

</Typography>


<Button
component={Link}
to="/contact"
variant="contained"
sx={{
bgcolor:"#fea434",
px:4,
py:1.3,
borderRadius:"25px",
fontWeight:600,
textTransform:"none",
"&:hover":{
bgcolor:"#e69420"
}
}}
>

Contact Us

</Button>


</Card>

</Container>


</Box>

);

});

About.displayName="About";

export default About;