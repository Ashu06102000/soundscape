import React from "react";
import { authUrl } from "./auth";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import musicAnimation from "../assets/musicAnimation.json";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-r from-gray-100 to-gray-300">
      <motion.div className="flex-1 flex flex-col justify-center items-center p-10 lg:p-20 text-center">
        <motion.a
          href={authUrl}
          className="bg-orange-500 text-white font-bold text-lg py-3 px-6 rounded-md transition-all"
          whileTap={{ scale: 0.9 }}
        >
          Login to SoundScape
        </motion.a>
      </motion.div>

      <div className="flex-1 bg-black h-screen lg:h-auto flex justify-center items-center relative overflow-hidden">
        <motion.h1
          className="font-rubik text-5xl lg:text-6xl text-white z-10"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          SoundScape
        </motion.h1>

        <motion.div
          className="absolute w-full h-full top-0 left-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Lottie animationData={musicAnimation} loop={true} />
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
