import Image from "next/image";
import { mealCards } from "./cards";
import { Scribble2 } from "./Scribble";
import { useIsPageLoaded } from "@/hooks/useIsPageLoaded";
import { useIsVisible } from "@/hooks/useIsVisible";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const SectionOne = () => {
  const { isPageLoaded } = useIsPageLoaded();
  const { containerRef, isVisible } = useIsVisible(1);
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"], // When the section comes into view
  });
  const dynamicGap = useTransform(scrollYProgress, [0.4, 1], [0, 100]); // Adjust range as needed

  return (
    <section ref={containerRef} className="font-satoshi relative text-[90px]/[120%] mt-56 font-bold z-[50] ">
      <h2 className="max-w-fit h-fit max-h-[228px] mb-[101px] text-secondary-1000 lg:px-[90px] ">
        <span className="servup h-fit flex flex-col">Serve Up Your </span>
        <span className="servup">Healthy Journey</span>
      </h2>

      <motion.div
        ref={scrollRef}
        key="servup"
        className="flex space-x-1 min-h-[150%] justify-center mt-12 mx-auto"
        
      >
        {mealCards.map((card, idx) => (
          <motion.div 
          key={card.rotate} 
          style={idx !== 3 ? { marginRight: dynamicGap } : undefined}
        >
            <FeatureCard {...card} />
          </motion.div>
        ))}
      </motion.div>
      {isPageLoaded ? (
        <Scribble2 />
      ) : (
        <div>Loading...</div> // Optional loading spinner or fallback
      )}
    </section>
  )
}

export default SectionOne
type colors = {
  bgcolor: string;
  textcolor: string;
}
type FeatureCardProps = {
  top: number
  rotate: number;
  cardimg: string;
  cardsticker: string;
  cardtitle: string;
  carddesc: string;
  colors: colors;
  captionbg?: string;
}
const FeatureCard = ({ top, rotate, cardimg, cardsticker, cardtitle, carddesc, colors, captionbg }: FeatureCardProps) => {
  return (
    <motion.figure  drag
    dragTransition={{ power: 0.1 }}   transition={{ ease: "easeOut", type: "spring", duration: 0.3, damping: 90 }} className={`z-[9999] relative p-6 overflow-hidden mt-[${top}px] min-h-[389px] bg-secondary-300 w-fit max-w-[290px] space-y-5 rounded-[21px] rotate-[${rotate}deg]`} style={{ transform: `rotate(${rotate}deg)`, backgroundColor: `${colors.bgcolor}`, color: colors.textcolor, marginTop: `${top}px` }}>
      <div className="relative">
        <Image draggable={false} src={cardimg} width={206} height={199} alt="Feature card" className=" mx-auto" />
        <Image draggable={false} src={cardsticker} width={57} height={57} alt="konsume sticker" className="absolute -top-3 right-0 rotate-6" />
      </div>
      <figcaption className="space-y-[11px] relative ">
        {captionbg && <Image draggable={false} src={captionbg} width={225} height={125} alt="Feature card" className="absolute z-0 mx-auto left-0 right-0" />}
        <h3 className="text-[21px]/[120%] font-bold relative z-40">{cardtitle}</h3>
        <p className="text-[14px]/[120%] font-medium relative z-40">{carddesc}</p>
      </figcaption>
    </motion.figure>
  );
}