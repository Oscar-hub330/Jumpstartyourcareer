import React from "react";
import { Container, Typography, Link, Box } from "@mui/material";
import {
  Facebook,
  Phone,
  Email,
  Language,
  LocationOn,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="backdrop-blur-lg bg-white/70 border-2 border-[#fea434] rounded-t-2xl text-black py-8 mt-20">
      <Container
        maxWidth="lg"
        className="flex flex-col md:flex-row justify-between items-start text-center md:text-left gap-6 md:gap-0"
      >
        {/* Left Section */}
        <Box>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Jumpstart Your Career. All rights reserved.
          </Typography>
        </Box>

        {/* Right Section */}
        <Box className="flex flex-col space-y-2 text-sm">
          <Box className="flex items-center gap-2">
            <Phone fontSize="small" sx={{ color: "#fea434" }} />
            <Typography variant="body2">065 808 9062</Typography>
          </Box>
          <Box className="flex items-center gap-2">
            <Email fontSize="small" sx={{ color: "#fea434" }} />
            <Typography variant="body2">info@jumpstartyourcareer.org.za</Typography>
          </Box>
          <Box className="flex items-center gap-2">
            <Facebook fontSize="small" sx={{ color: "#fea434" }} />
            <Link
              href="https://www.facebook.com/jumpstartyourcareer"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
            >
              JumpStart your career
            </Link>
          </Box>
          <Box className="flex items-center gap-2">
            <Language fontSize="small" sx={{ color: "#fea434" }} />
            <Link
              href="http://www.jumpstartyourcareer.org.za/"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
            >
              www.jumpstartyourcareer.org.za
            </Link>
          </Box>
          <Box className="flex items-center gap-2">
            <LocationOn fontSize="small" sx={{ color: "#fea434" }} />
            <Typography variant="body2">
              1 Bafana Road, Mataffin, Mbombela 1200
            </Typography>
          </Box>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
