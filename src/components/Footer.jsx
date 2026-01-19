import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";

const ACCENT = "#fea434";

const Footer = () => {
  return (
    <footer className="bg-[#FFF3EA] text-slate-900 border-t border-slate-300">
      <div className="max-w-6xl mx-auto px-6 py-8 sm:px-8 lg:px-12">
        {/* Top section: About (left) + Contact (right) */}
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-0">
          
          {/* About Section */}
          <div className="flex-1 md:flex-none md:w-1/2">
            <h3 className="font-semibold text-lg mb-2 text-slate-900">About Us</h3>
            <p className="text-sm leading-relaxed text-slate-800">
              Jumpstart Your Career empowers youth through skills development, 
              entrepreneurship, and career guidance. Stay updated through our newsletters.
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex-1 md:flex-none md:w-1/2 text-left md:text-right">
            <h3 className="font-semibold text-lg mb-2 text-slate-900">Contact</h3>
            <div className="flex flex-col items-start md:items-end gap-2 text-sm">

              {/* Phone */}
              <div className="flex items-center gap-2 justify-start md:justify-end">
                <PhoneIcon sx={{ fontSize: 18, color: ACCENT, flexShrink: 0 }} />
                <a
                  href="tel:+27639647736"
                  className="hover:text-slate-700 transition-colors hover:underline"
                >
                  +27 63 964 7736
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 justify-start md:justify-end">
                <MailIcon sx={{ fontSize: 18, color: ACCENT, flexShrink: 0 }} />
                <a
                  href="mailto:info@jumpstartyourcareer.org.za"
                  className="hover:text-slate-700 transition-colors hover:underline"
                >
                  info@jumpstartyourcareer.org.za
                </a>
              </div>

              {/* Website */}
              <div className="flex items-center gap-2 justify-start md:justify-end">
                <LanguageIcon sx={{ fontSize: 18, color: ACCENT, flexShrink: 0 }} />
                <a
                  href="https://www.jumpstartyourcareer.org.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-700 transition-colors hover:underline"
                >
                  www.jumpstartyourcareer.org.za
                </a>
              </div>

              {/* Facebook */}
              <div className="flex items-center gap-2 justify-start md:justify-end">
                <FacebookIcon sx={{ fontSize: 18, color: ACCENT, flexShrink: 0 }} />
                <a
                  href="https://www.facebook.com/JumpstartYourCareer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-700 transition-colors hover:underline"
                >
                  /JumpstartYourCareer
                </a>
              </div>

              {/* Address (multi-line) */}
              <div className="flex justify-start md:justify-end">
                <LocationOnIcon sx={{ fontSize: 18, color: ACCENT, flexShrink: 0, mt: "2px" }} />
                <div className="text-sm text-slate-800 leading-snug">
                  1 Bafana Road, Mataffin,<br />
                  Mbombela 1200
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom section: centered copyright */}
        <div className="mt-6 md:mt-8 text-center text-xs text-slate-700">
          &copy; 2026 Jumpstart Your Career. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
