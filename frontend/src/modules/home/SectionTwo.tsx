import Image from "next/image";
import vector5 from "../../../public/vector5.svg";
import vector6 from "../../../public/vector6.svg";
import scribble from "../../../public/scribble2.svg";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef } from "react";
import { features } from "./features";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import nextbtn from "../../../public/right.svg";
import prevbtn from "../../../public/left.svg"
import "swiper/css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/effect-fade';

const SectionTwo = () => {

  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Reset progress bars on slide change
    const handleSlideChange = () => {
      progressBarRefs.current.forEach((bar) => {
        if (bar) {
          bar.style.transition = "none"; // Disable animation
          bar.style.width = "0%"; // Reset width
          requestAnimationFrame(() => {
            bar.style.transition = "width 5s linear"; // Re-enable animation
            bar.style.width = "100%"; // Animate width to full
          });
        }
      });
    };

    // Trigger the animation for the current active slide
    const interval = setInterval(() => {
      const activeSlide = document.querySelector<HTMLElement>(".swiper-slide-active");
      const activeIndex = activeSlide ? parseInt(activeSlide.dataset.swiperSlideIndex || "0") : 0;

      progressBarRefs.current.forEach((bar, index) => {
        if (bar) {
          if (index === activeIndex) {
            bar.style.transition = "width 5s linear"; // Enable transition for increasing width
            bar.style.width = "100%";
          } else {
            bar.style.transition = "width 1s linear"; // Disable transition for reducing width
            bar.style.width = "0%";
          }
        }
      });
      
      textRefs.current.forEach((text, index) => {
        if (text) {
          text.style.color = index === activeIndex ? "#1C0D5F" : "#A7A7A7";
        }
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const swiperRef = useRef<SwiperType | null>(null);
  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  }

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div id="magic" className=" flex flex-col items-center z-[999] mt-[100px] relative">
      <div className=" flex flex-col gap-[8px] items-center justify-center pt-[141px] mb-[56px]">
        <h2 className="lg:text-[90px]/[100px] font-bold -tracking-[7px] servup text-[#0A1D4B]">Konsume For You!</h2>
      </div>
      <Image src={vector5} alt="" className="absolute left-0 bottom-0  transition-all" />
      <Image src={vector6} alt="" className="absolute right-0 top-0 animate-pulse bottom-0 my-auto" />
      <Image src={scribble} alt="" className="absolute top-0 bottom-0 my-auto left-0" />

      <div className="swiper-container space-y-9">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop
          modules={[Pagination, Navigation, Autoplay, EffectFade]}
          slidesPerView={1}
          spaceBetween={20}
          centeredSlides={true}
          onSlideChange={() => {
            progressBarRefs.current.forEach((bar) => {
              if (bar) bar.style.width = "0"
            });
            textRefs.current.forEach((text) => {
              if (text) text.style.color = "#1C0D5F"
            });
          }}
          effect="fade"
        >
          {features.map((feature, index) => (
            <SwiperSlide className="max-w-[1000px] h-[500px] mx-auto" key={index} data-swiper-slide-index={index}>
              {feature.div}
            </SwiperSlide>
          ))}
        </Swiper>

        <ul className="pagination-container">
          <Image src={prevbtn} alt="next" onClick={handlePrev} className="cursor-pointer" />

          {features.map((feature, index) => (
            <li className="pagination-item relative max-w-[135px]" key={index}>
              <div className="w-full flex h-1 bg-[#A7A7A7]">
                <div
                  ref={(el) => {
                    progressBarRefs.current[index] = el; // Assign the element or null
                  }}
                  className="progress-bar absolute z-[9999]"
                ></div>
              </div>
              <p ref={(el) => {
                textRefs.current[index] = el; // Assign the element or null
              }} className="text-base/[20px] font-medium text-start">{feature.value}</p>
            </li>
          ))}
          <Image src={nextbtn} alt="next" onClick={handleNext} className="cursor-pointer"
          />
        </ul>
      </div>
    </div>
  );
};

export default SectionTwo;
