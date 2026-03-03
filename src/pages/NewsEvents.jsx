/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo, memo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Modal,
  Stack,
  Divider,
  IconButton,
  Container,
  CircularProgress,
  TextField,
  MenuItem
} from "@mui/material";

import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";


/* ================= API CONFIG ================= */

const ACCENT = "#fea434";

/* Auto environment detection */

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : window.location.origin);

const API_URL = `${BASE_URL}/api/newsletters`;


/* ================= BUTTON ================= */

const StyledButton = memo(({ children, ...props }) => (

  <Button
    {...props}
    variant="contained"
    sx={{
      bgcolor: ACCENT,
      color: "#fff",
      fontWeight: 600,
      textTransform: "none",
      fontSize: { xs: 12, sm: 14, md: 15 },
      py: { xs: 0.8, sm: 1 },
      px: { xs: 1.5, sm: 2 },
      minWidth: { xs: 80, sm: 100 },
      "&:hover": { bgcolor: ACCENT }
    }}
  >
    {children}
  </Button>

));


/* ================= COMPONENT ================= */

function NewsEvents() {

  const [newsletters, setNewsletters] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(6);

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");


  /* ================= FETCH ================= */

  useEffect(() => {

    const fetchNewsletters = async () => {

      try {

        const res = await axios.get(API_URL);

        setNewsletters(
          Array.isArray(res.data)
            ? res.data
            : []
        );

      } catch (error) {

        console.error(
          "Newsletter fetch error:",
          error.message
        );

        setNewsletters([]);

      } finally {

        setLoading(false);

      }
    };

    fetchNewsletters();

  }, []);



  /* ================= SHARE ================= */

  const shareNewsletter = (nl) => {

    const shareUrl =
      `${window.location.origin}/news/${nl.slug || nl._id}`;

    if (navigator.share)

      navigator.share({
        title: nl.title,
        url: shareUrl
      });

    else

      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          nl.title + " " + shareUrl
        )}`
      );

  };


  /* ================= RENDER SECTIONS ================= */

  const renderSection = (sec, index) => {

    if (!sec.text && !sec.image)
      return null;

    return (

      <Box key={index} sx={{ mb: 3 }}>

        <Stack
          spacing={2}
          alignItems="center"
          direction={{
            xs: "column",
            md:
              sec.imagePosition === "left"
                ? "row"
                : sec.imagePosition === "right"
                ? "row-reverse"
                : "column"
          }}
        >

          {sec.image && (

            <Box
              component="img"
              src={`${BASE_URL}${sec.image}`}
              loading="lazy"
              alt="Newsletter"
              sx={{
                borderRadius: 2,
                boxShadow: 2,
                maxHeight: 350,
                objectFit: "cover",
                width:
                  sec.imagePosition === "center"
                    ? "100%"
                    : { xs: "100%", md: "45%" }
              }}
            />

          )}


          {sec.text && (

            <Typography
              sx={{
                flex: 1,
                color: "#444",
                lineHeight: 1.8,
                textAlign:
                  sec.textAlign || "left"
              }}
            >
              {sec.text}
            </Typography>

          )}

        </Stack>

      </Box>

    );

  };


  /* ================= FILTER ================= */

  const filteredNewsletters = useMemo(() => {

    let arr = newsletters.filter(nl => {

      const titleMatch =
        nl.title.toLowerCase()
          .includes(search.toLowerCase());

      let dateMatch = true;

      if (startDate)
        dateMatch =
          new Date(nl.publishedAt)
          >= new Date(startDate);

      if (dateMatch && endDate)
        dateMatch =
          new Date(nl.publishedAt)
          <= new Date(endDate);

      return titleMatch && dateMatch;

    });


    arr.sort((a, b) => {

      const aDate =
        new Date(a.publishedAt);

      const bDate =
        new Date(b.publishedAt);

      return sortOrder === "newest"
        ? bDate - aDate
        : aDate - bDate;

    });

    return arr;

  }, [
    newsletters,
    search,
    startDate,
    endDate,
    sortOrder
  ]);


  const paginatedNewsletters =
    filteredNewsletters.slice(
      0,
      visibleCount
    );


  /* ================= NEW LABEL ================= */

  const isNew = (nl) => {

    if (!nl.publishedAt)
      return false;

    const diffDays =
      (new Date() -
        new Date(nl.publishedAt))
      / 86400000;

    return diffDays <= 7;

  };


  /* ================= CARD ================= */

  const NewsletterCard = ({ nl }) => (

    <Card
      sx={{
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: isNew(nl)
          ? `2px solid ${ACCENT}`
          : "none",
        transition: ".3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 5
        }
      }}
    >

      {nl.coverImage && (

        <CardMedia
          component="img"
          image={`${BASE_URL}${nl.coverImage}`}
          alt={nl.title}
          sx={{
            height: 200,
            objectFit: "cover"
          }}
        />

      )}


      <CardContent sx={{ flex: 1 }}>

        <Typography
          fontWeight={700}
          mb={0.5}
        >

          {nl.title}

          {isNew(nl) && (

            <Typography
              component="span"
              color={ACCENT}
              ml={1}
            >
              New
            </Typography>

          )}

        </Typography>


        {nl.author && (

          <Typography
            fontSize={12}
            color="text.secondary"
            mb={1}
          >
            By: {nl.author.name || nl.author}
          </Typography>

        )}


        <Typography fontSize={14} color="#555">

          {nl.sections?.[0]?.text?.slice(0,120)}

        </Typography>


        <Typography
          fontSize={12}
          mt={1}
          color="text.secondary"
        >
          {nl.publishedAt &&
            new Date(
              nl.publishedAt
            ).toLocaleDateString()}
        </Typography>


        <Stack direction="row" spacing={1} mt={2}>

          <StyledButton
            fullWidth
            onClick={()=>{
              setSelected(nl);
              setOpen(true);
            }}
          >
            Read More
          </StyledButton>


          <IconButton
            sx={{color:ACCENT}}
            onClick={()=>shareNewsletter(nl)}
          >
            <ShareIcon/>
          </IconButton>

        </Stack>

      </CardContent>

    </Card>

  );


  /* ================= UI ================= */

  return (

    <Box sx={{bgcolor:"#fff7ed",minHeight:"100vh"}}>


      <Box
        sx={{
          py:3,
          mb:3,
          color:"#fff",
          textAlign:"center",
          background:
          `linear-gradient(135deg,${ACCENT},#ffb84d)`
        }}
      >

        <Typography
          fontWeight={700}
          fontSize={{xs:22,sm:26,md:30}}
        >
          Newsletter & Events
        </Typography>

      </Box>



      <Container maxWidth="lg" sx={{mb:3}}>

        <Stack
          spacing={2}
          direction={{xs:"column",sm:"row"}}
        >

          <TextField
            placeholder="Search..."
            value={search}
            onChange={e=>{
              setSearch(e.target.value);
              setVisibleCount(6);
            }}
            fullWidth
          />


          <TextField
            type="date"
            value={startDate}
            onChange={e=>setStartDate(e.target.value)}
          />


          <TextField
            type="date"
            value={endDate}
            onChange={e=>setEndDate(e.target.value)}
          />


          <TextField
            select
            value={sortOrder}
            onChange={e=>setSortOrder(e.target.value)}
          >

            <MenuItem value="newest">
              Newest
            </MenuItem>

            <MenuItem value="oldest">
              Oldest
            </MenuItem>

          </TextField>

        </Stack>

      </Container>



      <Container maxWidth="lg">


        {loading ? (

          <Box textAlign="center">
            <CircularProgress/>
          </Box>

        ) : (

          <Box
            sx={{
              gap:3,
              display:"grid",
              gridTemplateColumns:{
                xs:"1fr",
                sm:"1fr 1fr",
                md:"1fr 1fr 1fr"
              }
            }}
          >

            {paginatedNewsletters.map(nl=>(
              <NewsletterCard
                key={nl._id}
                nl={nl}
              />
            ))}

          </Box>

        )}


      </Container>



      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >

        <Box
          sx={{
            p:3,
            bgcolor:"#fff",
            borderRadius:3,
            width:{xs:"95%",md:800},
            maxHeight:"90vh",
            overflowY:"auto",
            position:"absolute",
            top:"50%",
            left:"50%",
            transform:"translate(-50%,-50%)"
          }}
        >

          <Typography fontWeight={700} mb={2}>
            {selected?.title}
          </Typography>

          {selected?.sections?.map(
            (sec,i)=>renderSection(sec,i)
          )}


          <Divider sx={{my:2}}/>


          <Stack direction="row" justifyContent="flex-end">

            <StyledButton
              onClick={()=>setOpen(false)}
            >
              <CloseIcon sx={{mr:1}}/>
              Close
            </StyledButton>

          </Stack>

        </Box>

      </Modal>

    </Box>

  );

}


export default memo(NewsEvents);