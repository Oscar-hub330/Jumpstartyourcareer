import React, { useEffect, useMemo, useState, memo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  CircularProgress,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Stack,
  Pagination
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";


/* ================= API CONFIG ================= */

const ACCENT = "#fea434";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : window.location.origin);

const API_URL = `${BASE_URL}/api/blogs`;


/* ================= COMPONENT ================= */

function Blog() {

  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const blogsPerPage = 6;


  /* ================= FETCH ================= */

  useEffect(() => {

    const fetchBlogs = async () => {

      try {

        const res = await axios.get(API_URL);

        const list =
          Array.isArray(res.data)
            ? res.data
            : res.data?.data ||
              res.data?.blogs ||
              [];

        setBlogs(list);

      } catch (err) {

        console.error(err);

        setError("Failed to fetch blogs.");

        setBlogs([]);

      } finally {

        setLoading(false);

      }
    };

    fetchBlogs();

  }, []);



  /* ================= FILTER ================= */

  const filteredBlogs = useMemo(() => {

    return blogs.filter(b =>

      `${b.title} ${b.content} ${b.author}`
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [blogs, search]);



  /* ================= PAGINATION ================= */

  const pageCount =
    Math.ceil(
      filteredBlogs.length /
      blogsPerPage
    );


  const currentBlogs = useMemo(() => {

    const start =
      (page - 1) *
      blogsPerPage;

    return filteredBlogs.slice(
      start,
      start + blogsPerPage
    );

  }, [
    page,
    filteredBlogs
  ]);


  const handlePageChange = (e, value) => {

    setPage(value);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  /* ================= SHARE ================= */

  const sharePost = (post) => {

    const url =
      `${window.location.origin}/blog/${post._id}`;

    if (navigator.share)

      navigator.share({
        title: post.title,
        text: "Check out this blog post",
        url
      });

    else {

      navigator.clipboard.writeText(url);

      alert("Link copied");

    }

  };


  /* ================= LOADING ================= */

  if (loading)

    return (

      <Box
        display="flex"
        justifyContent="center"
        mt={10}
      >

        <CircularProgress
          sx={{color:ACCENT}}
        />

      </Box>

    );


  if (error)

    return (

      <Typography
        align="center"
        color="error"
        mt={10}
      >

        {error}

      </Typography>

    );



  /* ================= UI ================= */

  return (

    <Box
      sx={{
        py:6,
        minHeight:"100vh",
        background:"#fff",
        px:{xs:2,md:6}
      }}
    >


      {/* HEADER */}

      <Typography
        variant="h4"
        align="center"
        sx={{
          mb:1,
          fontWeight:700,
          color:ACCENT
        }}
      >

        Our Blog

      </Typography>


      <Typography
        align="center"
        sx={{
          mb:4,
          color:"#666",
          fontSize:"0.95rem"
        }}
      >

        Stories, updates and insights.

      </Typography>



      {/* SEARCH */}

      <Box
        mx="auto"
        mb={4}
        maxWidth={500}
      >

        <TextField
          fullWidth
          size="small"
          value={search}
          placeholder="Search blogs..."
          onChange={e=>{
            setSearch(e.target.value);
            setPage(1);
          }}

          InputProps={{

            startAdornment:(

              <InputAdornment position="start">

                <SearchIcon/>

              </InputAdornment>

            )

          }}

        />

      </Box>



      {/* GRID */}

      <Grid
        container
        spacing={3}
      >

        {currentBlogs.length === 0 ? (

          <Typography
            sx={{
              mt:4,
              width:"100%",
              textAlign:"center"
            }}
          >

            No blog posts found.

          </Typography>

        ) : (

          currentBlogs.map(post => (

            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={post._id}
            >

              <Card
                sx={{
                  height:"100%",
                  borderRadius:3,
                  display:"flex",
                  flexDirection:"column",
                  border:"1px solid #f1f1f1",
                  transition:".25s",
                  boxShadow:"0 2px 6px rgba(0,0,0,0.06)",

                  "&:hover":{
                    transform:"translateY(-4px)"
                  }

                }}
              >


                {/* IMAGE */}

                {post.image && (

                  <Box
                    component="img"
                    alt={post.title}

                    src={`${BASE_URL}/uploads/${post.image}`}

                    sx={{
                      width:"100%",
                      height:150,
                      objectFit:"cover"
                    }}

                  />

                )}



                {/* CONTENT */}

                <CardContent
                  sx={{
                    p:2,
                    flexGrow:1,
                    display:"flex",
                    flexDirection:"column"
                  }}
                >


                  <Typography
                    fontWeight={600}
                    variant="subtitle1"
                    sx={{
                      color:ACCENT,
                      lineHeight:1.3,
                      overflow:"hidden",
                      textOverflow:"ellipsis",
                      whiteSpace:"nowrap"
                    }}
                  >

                    {post.title}

                  </Typography>



                  <Typography
                    variant="body2"
                    sx={{
                      flexGrow:1,
                      fontSize:"0.85rem",
                      color:"#333",
                      overflow:"hidden",
                      display:"-webkit-box",
                      WebkitLineClamp:3,
                      WebkitBoxOrient:"vertical"
                    }}
                  >

                    {post.content}

                  </Typography>



                  <Stack
                    direction="row"
                    spacing={1}
                    mt={1}
                  >

                    <Button
                      size="small"
                      sx={{
                        color:ACCENT,
                        textTransform:"none"
                      }}
                      onClick={()=>
                        navigate(`/blog/${post._id}`)
                      }
                    >

                      Read

                    </Button>



                    <Button
                      size="small"
                      startIcon={<ShareIcon/>}
                      sx={{textTransform:"none"}}
                      onClick={()=>
                        sharePost(post)
                      }
                    >

                      Share

                    </Button>

                  </Stack>



                  <Box
                    mt={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >

                    <Box
                      gap={1}
                      display="flex"
                      alignItems="center"
                    >

                      <Avatar
                        sx={{
                          width:26,
                          height:26,
                          fontSize:12,
                          bgcolor:ACCENT
                        }}
                      >

                        {(post.author || "A")[0]}

                      </Avatar>


                      <Typography fontSize="0.75rem">

                        {post.author || "Unknown"}

                      </Typography>

                    </Box>



                    <Typography
                      fontSize="0.7rem"
                      color="#888"
                    >

                      {moment(post.createdAt).format("LL")}

                    </Typography>

                  </Box>



                  {Array.isArray(post.tags) && (

                    <Stack
                      mt={1}
                      gap={0.5}
                      direction="row"
                      flexWrap="wrap"
                    >

                      {post.tags.map((tag,i)=>(

                        <Chip
                          key={i}
                          size="small"
                          label={`#${tag}`}
                          sx={{fontSize:10}}
                        />

                      ))}

                    </Stack>

                  )}

                </CardContent>

              </Card>

            </Grid>

          ))

        )}

      </Grid>



      {/* PAGINATION */}

      {pageCount > 1 && (

        <Box
          mt={6}
          display="flex"
          justifyContent="center"
        >

          <Pagination
            page={page}
            count={pageCount}
            onChange={handlePageChange}
          />

        </Box>

      )}

    </Box>

  );

}

export default memo(Blog);