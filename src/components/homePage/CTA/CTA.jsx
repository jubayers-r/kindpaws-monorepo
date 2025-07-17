// src/components/CallToAction.jsx
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import { Link } from "react-router";

export default function CTA() {
  return (
    <section className=" rounded-2xl shadow-md bg-white ">
      <div className="grid sm:grid-cols-3 items-center relative overflow-hidden rounded-2xl">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="col-span-2 relative pointer-events-none sm:block hidden"
        >
          <img src="/src/assets/cta/bg-img.png" alt="dog" className="" />
          <img
            src="/src/assets/cta/paw-bg-pattern.png"
            alt="bg-paw"
            className="absolute top-20 "
          />
          <motion.img
            src="/src/assets/cta/bone-img.png"
            alt="bone"
            className="absolute w-15 md:w-20  xl:top-30 xl:right-80 lg:top-30 lg:right-60 md:right-45 right-40 top-20 "
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

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className=" lg:-translate-x-50 sm:-translate-x-20 place-items-center text-center sm:place-items-start sm:text-left py-10 sm:py-0"
        >
          <div className="space-y-5  max-w-lg">
            <p className="font-light lg:text-5xl text-3xl text-primary">
              Give a Paw🐾
            </p>
            <h2 className="text-2xl/tight sm:text-3xl/tight lg:text-5xl/tight font-semibold text-secondary mb-4 xl:uppercase">
              Some pet to life in need
            </h2>
            <p className="text-muted-foreground mb-6 text-lg sm:hidden 2xl:block">
              Every adoption saves a life and brings joy to another. Join our
              mission to unite pets with their forever homes and make a real
              impact — one paw at a time.
            </p>
          </div>
          <Link to="/adopt">
            <Button className="px-5 py-5 rounded-full lg:text-xl  " size="xl">
              Find Your New Best Friend
              <MoveUpRight />
            </Button>
          </Link>
        </motion.div>

        {/* absolute part */}
        <motion.img
          src="/src/assets/cta/paw-img.png"
          alt="bg-paw"
          className="pointer-events-none bottom-5 right-5 lg:flex hidden   absolute"
          animate={{
            filter: [
              "brightness(100%)",
              "brightness(150%)",
              "brightness(100%)",
            ],
            opacity: [0.4, 1.2, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute -top-20 -right-15 lg:w-60 w-50 lg:h-60 h-50 rounded-full bg-secondary  md:flex items-center justify-center hidden  ">
          <div className="relative">
            <p className="text-4xl font-medium text-white text-center absolute top-0 -left-17">
              Adopt <br /> <span className="text-primary font-bold">Now</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
