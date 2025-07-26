import { useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

const Images = import.meta.glob("/src/assets/hero/*.{jpg,jpeg,png,svg,webp}", {
  eager: true,
  import: "default",
});
const imageList = Object.values(Images);

export const SwiperComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperItems = [
    {
      title: "Give Them a Second Chance",
      subtitle:
        "Every rescue pet has a story — your support helps rewrite it with love, care, and a forever home.",
      image: imageList[0],
    },
    {
      title: "Compassion in Every Donation",
      subtitle:
        "Even a small contribution can bring food, shelter, and medical aid to a pet in desperate need.",
      image: imageList[1],
    },
    {
      title: "Adopt, Don't Shop",
      subtitle:
        "Your decision to adopt saves lives and opens your home to unconditional love and loyalty.",
      image: imageList[2],
    },
  ];
  return (
    <div className="-mt-35 -z-10 h-[50vw] w-full">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="h-full"
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex); // .realIndex because you're looping
        }}
      >
        {swiperItems.map((item, index) => (
          <SwiperSlide key={item.title} className="overflow-hidden">
            <div className="relative w-full h-full">
              {/* content - image background */}
              <img
                src={item.image}
                className="object-cover w-full h-full brightness-85 my-10 sm:my-0"
                alt={item.title}
              />

              {/* animated text overlay */}
              {index === activeIndex && (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute inset-0  items-center justify-start px-4 sm:px-8 xl:px-16 lg:flex hidden"
                >
                  <div className="text-white w-full max-w-lg bg-black/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 xl:p-8 space-y-6">
                    {/* Title + Subtitle */}
                    <div className="space-y-4">
                      <h1 className="text-2xl sm:text-4xl xl:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-md">
                        {item.title}
                      </h1>
                      <p className="text-sm sm:text-base xl:text-lg font-medium text-gray-200 border-l-4 border-primary pl-4 leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 pt-2">
                      <button className="px-6 py-2 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold transition duration-300 text-sm sm:text-base">
                        Know More
                      </button>
                
                      <button className="px-6 py-2 rounded-full border border-white hover:bg-white hover:text-black text-white font-semibold transition duration-300 text-sm sm:text-base">
                        Contact Us
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
