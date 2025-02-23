import Image from "next/image";
import features from "../../../public/featuress.svg";
import Marquee from "@/components/ui/marquee";
import mascot from "../../../public/mascot1.png"
import { Button } from "@/components/ui/button";

const SectionThree = () => {
  return (
    <div className="font-satoshi z-20" >

      <Marquee pauseOnHover className="">
        <Image src={features} alt="" />
      </Marquee>
      <div className="md:flex hidden items-center justify-center gap-[136px] pt-[171px] pb-[104px]">
        <div className="relative max-w-[468px]">
          <div className="absolute bottom-[77px] right-6 z-[1]">
            <Image height={186} width={186} alt="mascot" src={mascot} />
          </div>
          <h1 className="text-[54.95px]/[65.94px] font-bold z-[999999] relative">
            Konsume has your meals covered!
          </h1>
        </div>

        <ul className="flex flex-col gap-[29px] text-[20px]/[120%]">
          {items.map(item => <NavItem name={item} />)}
        </ul>
      </div>

      <div className="w-fit mx-auto">
        <Button className="py-9 px-[100px] bg-[#9C8BF9] font-bold mx-auto text-[50px][46px] text-secondary-100 rounded-[100px]">Join Konsume</Button>
      </div>
    </div>
  );
};

export default SectionThree;


type NavItemProps = {
  name: string;
};
export const NavItem = ({name}: NavItemProps) => {
  return (
    <li className="hover:animate-pulse gap-[10px] items-center max-h-fit flex hover:border-2 border-[#8C77EC] border-dashed">
      <a href={`#${name.toLowerCase()}`} className="h-fit">{name}</a>
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 5.25C1.08579 5.25 0.75 5.58579 0.75 6C0.75 6.41421 1.08579 6.75 1.5 6.75L1.5 5.25ZM19.0303 6.53033C19.3232 6.23744 19.3232 5.76256 19.0303 5.46967L14.2574 0.6967C13.9645 0.403807 13.4896 0.403807 13.1967 0.6967C12.9038 0.989593 12.9038 1.46447 13.1967 1.75736L17.4393 6L13.1967 10.2426C12.9038 10.5355 12.9038 11.0104 13.1967 11.3033C13.4896 11.5962 13.9645 11.5962 14.2574 11.3033L19.0303 6.53033ZM1.5 6.75L18.5 6.75L18.5 5.25L1.5 5.25L1.5 6.75Z" fill="#6D53E7" />
      </svg>
    </li>
  );
}

const items = [
  "Magic", 
  "Features",
  "FAQs",
  "Get started"
]
