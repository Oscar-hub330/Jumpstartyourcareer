/* eslint-disable react/display-name */
import React,
{
  useState,
  useMemo,
  lazy,
  Suspense,
  useCallback,
  memo
} from "react";

import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Box,
  TextField
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";


/* ================= API CONFIG ================= */

const ACCENT = "#fea434";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : window.location.origin);

const API_URL = `${BASE_URL}/api/subscribe`;


/* ================= LAZY ================= */

const ImageCarousel =
  lazy(() =>
    import("../components/ImageCarousel")
  );


/* ================= FOCUS CARD ================= */

const FocusAreaCard = memo(({title,description}) => (

  <Card
    elevation={0}
    sx={{
      border:`1px solid ${ACCENT}`,
      borderRadius:2,
      height:"100%"
    }}
  >

    <CardContent
      sx={{
        textAlign:"center",
        p:{xs:2.5,sm:3}
      }}
    >

      <Typography
        variant="h6"
        fontWeight={600}
        color={ACCENT}
        mb={1.5}
      >

        {title}

      </Typography>


      <Typography
        variant="body2"
        color="#444"
        sx={{
          lineHeight:1.6,
          fontSize:{
            xs:"0.85rem",
            sm:"0.9rem"
          }
        }}
      >

        {description}

      </Typography>

    </CardContent>

  </Card>

));


FocusAreaCard.propTypes = {

  title:PropTypes.string.isRequired,
  description:PropTypes.string.isRequired

};



/* ================= COMPONENT ================= */

function Home(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [status,setStatus] = useState("");



  /* ================= FOCUS AREAS ================= */

  const focusAreas = useMemo(()=>[

    {
      title:"Skills Development",
      description:
      "Empowering youth with hands-on training in technology and life skills."
    },

    {
      title:"Entrepreneurship Training",
      description:
      "Training rural youth in business models and problem-solving."
    },

    {
      title:"Digital Skills",
      description:
      "Delivering digital literacy, AI, and robotics education."
    },

    {
      title:"Renewable & Clean Energy",
      description:
      "Offering rural youth courses on clean energy."
    },

    {
      title:"Career Development & STEM",
      description:
      "Exposing learners to diverse professional opportunities."
    },

    {
      title:"Work Placement",
      description:
      "Providing graduates with real-world workplace experience."
    },

    {
      title:"Youth Center",
      description:
      "Providing internet access and life skills training."
    }

  ],[]);



  /* ================= SUBSCRIBE ================= */

  const handleSubscribe = useCallback(async()=>{

    if(!email || !email.includes("@")){
      setStatus("Please enter a valid email.");
      return;
    }

    try{

      const res =
        await axios.post(
          API_URL,
          {email}
        );

      if(res.status===200 || res.status===201){

        setEmail("");

        setStatus(
          res.data.message ||
          "Subscribed successfully!"
        );

      }

    }
    catch(err){

      if(err.response)

        setStatus(
          err.response.data.message ||
          "Subscription failed."
        );

      else

        setStatus(
          "Server error. Try again later."
        );

    }

  },[email]);



  /* ================= UI ================= */

  return(

    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        px:{xs:2,sm:3,md:4},
        py:{xs:3,md:4},
        color:"#333",
        minHeight:"100vh",
        background:"#FFFAF5"
      }}
    >



{/* HERO */}

<Box textAlign="center" mb={{xs:6,md:8}}>

<Typography
fontWeight="bold"
color={ACCENT}
variant="h3"
mb={2}

sx={{
fontSize:{
xs:"1.8rem",
sm:"2.3rem",
md:"3rem"
}
}}
>

Empowering Rural Youth

</Typography>



<Typography
mb={4}
mx="auto"
maxWidth={700}
color="#555"

sx={{
px:{xs:1,sm:0},
fontSize:{
xs:"0.95rem",
md:"1rem"
}
}}
>

Through skills development,
entrepreneurship training,
and ICT education.

</Typography>



<Box
gap={2}
display="flex"
flexWrap="wrap"
justifyContent="center"
>

<Button
variant="contained"
onClick={()=>navigate("/projects")}

sx={{
bgcolor:ACCENT,
px:{xs:3,md:4},
width:{xs:"100%",sm:"auto"},
maxWidth:300
}}
>

Explore Projects

</Button>



<Button
variant="outlined"
onClick={()=>navigate("/contact")}

sx={{
px:{xs:3,md:4},
color:ACCENT,
borderColor:ACCENT,
width:{xs:"100%",sm:"auto"},
maxWidth:300
}}
>

Get Involved

</Button>

</Box>

</Box>



{/* CAROUSEL */}

<Box mb={{xs:6,md:10}}>

<Suspense
fallback={
<Box textAlign="center" py={6}>
Loading...
</Box>
}
>

<ImageCarousel/>

</Suspense>

</Box>



{/* FOCUS AREAS */}

<Box mb={{xs:6,md:10}}>

<Typography
variant="h4"
textAlign="center"
color={ACCENT}
mb={{xs:4,md:6}}

sx={{
fontSize:{
xs:"1.6rem",
md:"2rem"
}
}}
>

Our Focus Areas

</Typography>



<Box
display="grid"

gridTemplateColumns={{

xs:"1fr",
sm:"1fr 1fr",
md:"repeat(3,1fr)",
lg:"repeat(4,1fr)"

}}

gap={{xs:2.5,md:4}}

>

{focusAreas.map((area,i)=>(

<FocusAreaCard
key={i}
title={area.title}
description={area.description}
/>

))}

</Box>

</Box>



{/* NEWSLETTER */}

<Box

textAlign="center"

p={{xs:3,md:4}}

borderRadius={2}

border={`1px solid rgba(254,164,52,0.2)`}

bgcolor="rgba(254,164,52,0.05)"

>

<Typography
variant="h4"
color={ACCENT}
mb={2}

sx={{
fontSize:{
xs:"1.6rem",
md:"2rem"
}
}}
>

Stay Connected

</Typography>



<Typography
mb={4}
mx="auto"
maxWidth={600}
color="#555"

sx={{
fontSize:{
xs:"0.9rem",
md:"1rem"
}
}}
>

Sign up for our newsletter to get updates.

</Typography>



<Box
gap={2}
mx="auto"
maxWidth={600}
display="flex"

flexDirection={{
xs:"column",
sm:"row"
}}

>

<TextField
fullWidth
size="small"
label="Email Address"
value={email}
onChange={e=>setEmail(e.target.value)}

sx={{bgcolor:"#fff"}}
/>



<Button
variant="contained"
onClick={handleSubscribe}

sx={{
bgcolor:ACCENT,
whiteSpace:"nowrap",
height:{sm:40}
}}
>

Subscribe

</Button>

</Box>



{status && (

<Typography
mt={2}
fontSize="0.9rem"

color={
status.includes("success")
?"success.main"
:"error"
}
>

{status}

</Typography>

)}

</Box>

</Container>

);

}

export default memo(Home);