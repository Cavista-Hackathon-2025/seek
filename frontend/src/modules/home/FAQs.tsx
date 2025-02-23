
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  return (
    <section  style={{ backgroundImage: "url('/faqsbg3.svg')" }} className="z-[999] relative bg-contain bg-no-repeat mt-[200px] min-h-[1000px]">
      <div  id="faqs" className="  h-full z-[9999]  " >
        <h2 className="lg:text-[90px]/[120px] w-fit font-bold -tracking-[7px] servup text-[#ffffff] pt-[100px] pl-[130px]">Frequently Asked Questions</h2>
        <div className="font-satoshi px-[30px] lg:py-8 py-4  lg:text-[24px]/[22px] font-medium text-secondary-1000 text-[18px]  w-full max-w-[718px] mx-auto">
          <Accordion
            type="single"
            collapsible
            className=" w-full font-satoshi gap-4 flex flex-col"
          >
            {faq.map(item => <FAQsQ key={item.question} {...item} />)}
          </Accordion>
        </div>
        </div>
    </section>
  );
};

export default FAQs;

type FAqQ = {
  question: string;
  answer: string;
}
import plus from "../../../public/plus.svg"
import { PlusIcon } from "lucide-react";
const FAQsQ = ({ question, answer }: FAqQ) => {
  return (
    <div>
      <AccordionItem value={question} className="bg-[#E8E4FB]  px-7 rounded-tr-2xl rounded-bl-2xl">
        <AccordionTrigger icon={PlusIcon} className="py-[21px]">{question}</AccordionTrigger>
        <AccordionContent>
          {answer}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}

const faq = [
  {
    question: "Who can use Konsume?",
    answer: "Konsume is designed for anyone looking to improve their nutrition, manage their diet, or discover personalized meal plans. Whether you're an individual, a fitness enthusiast, or someone with dietary restrictions, Konsume is for you.",
  },
  {
    question: "How do I get started with Konsume?",
    answer: "To get started with Konsume, simply sign up, provide basic information about your dietary preferences, and Konsume will generate personalized meal recommendations for you.",
  },
  {
    question: "Is Konsume free to use?",
    answer: "Yes, Konsume offers a free tier with basic features. Additional premium features may be available through a subscription plan.",
  },
  {
    question: "Can I track my progress on Konsume?",
    answer: "Absolutely! Konsume includes a progress tracking feature that allows you to monitor your nutritional goals, streaks, and overall progress over time.",
  },
  {
    question: "How do restaurant integrations work?",
    answer: "Konsume integrates with partnered restaurants to suggest meals that match your dietary preferences. You can also place orders directly through the app if supported in your location.",
  },
  {
    question: "How does Konsume recommend meals?",
    answer: "Konsume uses advanced AI algorithms to analyze your dietary preferences, restrictions, and goals to provide you with personalized meal recommendations.",
  },
  {
    question: "Can I use Konsume as a restaurant owner?",
    answer: "Yes, Konsume offers features for restaurant owners to showcase their meals, integrate with the app, and reach a broader audience looking for tailored meal options.",
  },
];

