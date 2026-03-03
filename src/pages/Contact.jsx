/* eslint-disable no-unused-vars */
import React, { useState, memo } from "react";
import axios from "axios";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  Stack,
  Alert,
  CircularProgress
} from "@mui/material";

import {
  PhoneInTalk,
  EmailOutlined,
  LocationOn,
  Facebook,
  Twitter,
  Instagram
} from "@mui/icons-material";


/* ================= CONFIG ================= */

const ACCENT = "#fea434";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : window.location.origin);

const API_URL = `${BASE_URL}/api/contact`;



/* ================= COMPONENT ================= */

function Contact() {

  const [form,setForm] = useState({
    name:"",
    email:"",
    subject:"",
    message:""
  });

  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState("");
  const [error,setError] = useState("");



  /* ================= HANDLERS ================= */

  const handleChange = e => {

    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

  };


  const handleSubmit = async e => {

    e.preventDefault();

    setSuccess("");
    setError("");


    if(
      !form.name ||
      !form.email ||
      !form.subject ||
      !form.message
    ){
      setError("Please fill in all fields.");
      return;
    }


    try{

      setLoading(true);

      await axios.post(
        API_URL,
        form
      );

      setSuccess(
        "Message sent successfully ✓"
      );

      setForm({
        name:"",
        email:"",
        subject:"",
        message:""
      });

    }
    catch(err){

      setError(
        "Failed to send message. Try again later."
      );

    }
    finally{

      setLoading(false);

    }

  };



  /* ================= CONTACT INFO ================= */

  const contactDetails = [

    {
      label:"Phone",
      value:"+27 63 964 7736",
      icon:<PhoneInTalk sx={{color:ACCENT}}/>
    },

    {
      label:"Email",
      value:"info@jumpstartyourcareer.org.za",
      icon:<EmailOutlined sx={{color:ACCENT}}/>
    },

    {
      label:"Address",
      value:"01 Bafana Bafana Road, Mbombela, South Africa",
      icon:<LocationOn sx={{color:ACCENT}}/>
    }

  ];


  const socials = [

    {Icon:Facebook,url:"https://facebook.com"},
    {Icon:Twitter,url:"https://twitter.com"},
    {Icon:Instagram,url:"https://instagram.com"}

  ];



  /* ================= UI ================= */

  return(

    <Box
      sx={{
        py:6,
        display:"flex",
        alignItems:"center",
        minHeight:"100vh",
        bgcolor:"#fff7ed"
      }}
    >


      <Container
        maxWidth="md"
        sx={{
          gap:4,
          display:"grid",
          gridTemplateColumns:{
            xs:"1fr",
            md:"1fr 1fr"
          }
        }}
      >



        {/* CONTACT INFO */}

        <Box
          gap={3}
          display="flex"
          flexDirection="column"
        >

          <Typography
            fontWeight={700}
            fontSize={24}
            color={ACCENT}
          >
            Contact Us
          </Typography>


          {contactDetails.map((item,i)=>(

            <Stack
              key={i}
              spacing={2}
              direction="row"
              alignItems="center"
            >

              {item.icon}

              <Box>

                <Typography
                  fontSize={12}
                  fontWeight={600}
                  color="#666"
                >
                  {item.label}
                </Typography>

                <Typography fontSize={14}>
                  {item.value}
                </Typography>

              </Box>

            </Stack>

          ))}



          <Divider/>


          <Stack direction="row" spacing={2}>

            {socials.map(({Icon,url},i)=>(

              <Link
                key={i}
                href={url}
                target="_blank"
              >

                <Icon
                  sx={{
                    color:ACCENT,

                    "&:hover":{
                      transform:"scale(1.15)"
                    }

                  }}
                />

              </Link>

            ))}

          </Stack>

        </Box>



        {/* FORM */}

        <Box
          component="form"
          onSubmit={handleSubmit}

          sx={{

            p:4,
            gap:2,
            display:"flex",
            borderRadius:3,
            bgcolor:"#fff",
            flexDirection:"column",

            boxShadow:
            "0 8px 25px rgba(0,0,0,0.06)"

          }}

        >


          <Typography
            fontWeight={700}
            fontSize={18}
            textAlign="center"
            color={ACCENT}
          >
            Send a Message
          </Typography>


          {success && (
            <Alert severity="success">
              {success}
            </Alert>
          )}


          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}



          <TextField
            fullWidth
            size="small"
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />


          <TextField
            fullWidth
            size="small"
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />


          <TextField
            fullWidth
            size="small"
            label="Subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
          />


          <TextField
            fullWidth
            rows={4}
            multiline
            size="small"
            label="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
          />


          <Button
            type="submit"
            variant="contained"
            disabled={loading}

            sx={{

              py:1.2,
              fontWeight:600,
              bgcolor:ACCENT,

              "&:hover":{

                bgcolor:"#fff",
                color:ACCENT,
                border:`1px solid ${ACCENT}`

              }

            }}

          >

            {loading
              ? <CircularProgress size={20}/>
              : "Send Message"
            }

          </Button>

        </Box>


      </Container>


    </Box>

  );

}

export default memo(Contact);