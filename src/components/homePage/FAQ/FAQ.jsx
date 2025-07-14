import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItemComponent } from "@/components/ui/tinyParts/AccordionItemComponent";
import { FaqItems } from "@/data/FaqItems";

const FAQ = () => {
  return (
    <div className="grid lg:grid-cols-2">
      {/* image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative pointer-events-none pt-20"
      >
        <div>
          <img src="/src/assets/FAQ/about-img-04.png" alt="dog" className="" />
        </div>
        <img
          src="/src/assets/FAQ/paw-bg-pattern-white.png"
          alt="bg-paw"
          className="absolute -top-0 -z-1"
        />
        <motion.img
          src="/src/assets/cta/bone-img.png"
          alt="bone"
          className="absolute w-15 sm:w-20 top-10 sm:top-50 sm:right-10 right-5"
          animate={{
            rotate: [-15, 20, -15], // rotate left and right then reset
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2.5, // how long one full cycle takes
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* accordians */}
      <div>
        <div className="bg-white rounded-full w-fit px-5 py-1 mb-2">
          <img src="" alt="" />
          <p className="text-secondary text-sm font-[Roboto]">Any FAQ</p>
        </div>
        <h1 className="text-3xl sm:text-4xl/tight md:text-5xl/tight font-black text-secondary mb-10">
          Why Choose Our Pet Adoption Community?
        </h1>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-5"
          defaultValue="item-1"
        >
          {FaqItems.map((faq) => (
            <AccordionItemComponent
              itemNo={faq.itemNo}
              title={faq.title}
              content={faq.content}
            />
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
