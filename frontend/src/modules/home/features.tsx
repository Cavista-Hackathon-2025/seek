import { motion } from "framer-motion";
import Image from "next/image";
import languages from "../../../public/languages.svg"


export const features = [
  {
    div: (
      <div className="feature px-[27px] bg-cover bg-no-repeat bg-center" style={{ backgroundColor: "lightblue", backgroundImage: "url('/features11.svg')", color: "black" }}>
        <h2 className="text-[#1C0D5F] text-[40px]/[120%] font-bold">Personalized Meal <br /> Timetables</h2>
      </div>
    ),
    value: "Personalized Meal Timetables",
  },
  {
    div: (
      <div className="feature px-[27px] bg-cover bg-no-repeat bg-center" style={{ backgroundColor: "lightgreen", backgroundImage: "url('/features2.svg')", color: "black" }}>
        <h2 className="text-[#1C0D5F] text-[40px]/[120%] font-bold">Extensive Meal <br /> Library</h2>
      </div>
    ),
    value: "Extensive Meal Library",
  },
  {
    div: (
      <div className="flex flex-col justify-between h-[500px] text-start items-start rounded-[36px] pt-[66px] pb-[37px] bg-cover bg-no-repeat bg-center" style={{ backgroundColor: "lightcoral", backgroundImage: "url('/features3.svg')", color: "black" }}>
        <h2 className="text-[#1C0D5F] text-[40px]/[120%] font-bold px-[27px] jusse">Nutrition-Based <br /> Blogs</h2>
        <div className="flex gap-4 items-center self-end">
          <motion.div drag
            dragTransition={{ power: 0.1 }} transition={{ ease: "easeOut", type: "spring", duration: 0.3, damping: 90 }}>
            <img src="/mealcard1.svg" alt="image" width={285} height={235} />
          </motion.div>
          <motion.div drag
            dragTransition={{ power: 0.1 }} transition={{ ease: "easeOut", type: "spring", duration: 0.3, damping: 90 }}>
            <img src="/mealcard2.svg" alt="image" width={285} height={235} />
          </motion.div>
          <motion.div drag
            dragTransition={{ power: 0.1 }} transition={{ ease: "easeOut", type: "spring", duration: 0.3, damping: 90 }}>
            <img src="/mealcard3.svg" alt="image" width={285} height={235} />
          </motion.div>
          <motion.div drag
            dragTransition={{ power: 0.1 }} transition={{ ease: "easeOut", type: "spring", duration: 0.3, damping: 90 }}>
            <img src="/mealcard4.svg" alt="image" width={285} height={235} />
          </motion.div>
        </div>
      </div>
    ),
    value: "Nutrition-Based Blogs",
  },
  {
    div: (
      <div className="flex  justify-between h-[500px] relative text-start items-start rounded-[36px] pt-[66px] pb-[37px] px-[27px] bg-cover bg-no-repeat bg-center" style={{ backgroundColor: "lightgreen", backgroundImage: "url('/features44.svg')", color: "black" }}>
        <h2 className="text-[#1C0D5F] text-[40px]/[120%] font-bold">Multiple Language <br /> Support</h2>
        <p className="flex flex-col text-[30px]/[120%] text-[#A7A7A7] absolute w-[400px] left-0 right-0 mx-auto my-auto h-fit top-0 bottom-0 font-bold self-center">
         Supports over 100 <br />
            <span className="flex items-center gap-2">

              languages
              <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8.75C1.30964 8.75 0.75 9.30964 0.75 10C0.75 10.6904 1.30964 11.25 2 11.25L2 8.75ZM30.8839 10.8839C31.372 10.3957 31.372 9.60427 30.8839 9.11611L22.9289 1.16116C22.4408 0.673008 21.6493 0.673008 21.1612 1.16116C20.673 1.64932 20.673 2.44078 21.1612 2.92893L28.2322 10L21.1612 17.0711C20.673 17.5592 20.673 18.3507 21.1612 18.8388C21.6493 19.327 22.4408 19.327 22.9289 18.8388L30.8839 10.8839ZM2 11.25L30 11.25L30 8.75L2 8.75L2 11.25Z" fill="#6D53E7" />
              </svg>
            </span></p>
        <motion.div initial={{
          y: 300
        }}
          whileInView="animate"
          animate={{
            y: -700,
            transition: { duration: 5, repeat: Infinity }
          }}
          className="mr-[34px]">
          <Image src={languages} alt="languages" className="h-[1100px] animate-in " />
        </motion.div>
      </div>
    ),
    value: "Multiple Language Support",
  },
  {
    div: (
      <div className="flex items-center justify-end text-start rounded-[30px] h-[500px] px-[27px] bg-cover bg-no-repeat bg-center" style={{ backgroundColor: "lightgray", backgroundImage: "url('/features55.svg')", color: "black" }}>
        <h2 className="text-[#1C0D5F] text-[40px]/[120%] font-bold">Personalized AI Chatbot <br /> and Meal Scanner</h2>
      </div>
    ),
    value: "Leisure Complexes",
  },
];
