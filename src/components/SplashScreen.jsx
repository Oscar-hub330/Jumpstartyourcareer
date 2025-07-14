// src/components/SplashScreen.jsx
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import JumpstartLogo from "../assets/jumpstart-logo.svg";

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    const timer2 = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-white z-50 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src={JumpstartLogo}
        alt="Jumpstart Logo"
        className="w-32 h-32 animate-bounce"
      />
      <h1 className="text-2xl mt-6 font-semibold" style={{ color: "#fea434" }}>
        Welcome to Jumpstart
      </h1>
      <div className="mt-6">
        <CircularProgress style={{ color: "#fea434" }} />
      </div>
    </div>
  );
};

export default SplashScreen;
