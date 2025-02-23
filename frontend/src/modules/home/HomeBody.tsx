"use client"

import Image from "next/image";
import React, { useRef } from "react";
import pan from "../../../public/pan.svg";
import pann from "../../../public/pann.svg";
import Hero from "./Hero";
import FAQs from "./FAQs";
import Footer from "./Footer";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import { motion, useScroll, useTransform } from "framer-motion";

const HomeBody = () => {
  const scrollRef = useRef(null); // Ref for scroll animation
  const panRef = useRef(null);


  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"], // When the section comes into view
  });

  return (
    <div className="flex  flex-col font-satoshi  " ref={scrollRef}>
      <main className="flex  flex-col " >
        <Hero />
        <motion.div ref={panRef} className=" hidden -top-[40%] md:block  z-0" style={{ position: "sticky", top: 0 }}>
          <motion.div className="absolute  right-0 -top-[55vh]" style={{opacity: useTransform(scrollYProgress, [0.5, 0.8], [1, 0]), top: useTransform(scrollYProgress, [0, 0.4], [-900, 60]), right: useTransform(scrollYProgress, [0.2, 0.7], [0, 400]), rotate: useTransform(scrollYProgress, [0.2, 0.7], [0, 60]) }}>
            <Image
              src={pan}
              alt="easier"
              className=""
              width={858}
              height={869}
            />
          </motion.div>
        </motion.div>
        <SectionOne />
        <SectionTwo />
        <FAQs />
      </main>
        <Footer />
      <Image
        src={pann}
        alt="easier"
        className="absolute block my-auto top-0 bottom-0 md:hidden right-0 left-0 mx-auto z-0 "
        width={237}
        height={237}
      />
    </div>
  );
};

export default HomeBody;
