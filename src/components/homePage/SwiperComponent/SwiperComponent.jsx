// VerticalSwiper.jsx
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const Images = import.meta.glob("/src/assets/hero/*.{jpg,jpeg,png,svg,webp}", {
  eager: true,
  import: "default",
});

const imageList = Object.values(Images);

export const SwiperComponent = () => {
  const swiperItems = [
    {
      title: "Echoes from Lost Civilizations",
      subtitle:
        "Artifacts are the silent witnesses of human history — from ancient tools to ceremonial relics, they preserve forgotten ways of life.",
      image: imageList[0],
    },
    {
      title: "Legacy in Motion and Emotion",
      subtitle:
        "Fashion, early tools, and refined craftsmanship reflect a civilization deeply rooted in art and cosmic order.",
      image: imageList[1],
    },
    {
      title: "Fragments of the Everyday",
      subtitle:
        "Common items like pottery, coins, and jewelry give us insight into daily life across eras and empires.",
      image: imageList[2],
    },
  ];
  return (
    <div className=" -mt-35 -z-10 h-[50vw] w-full">
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
        className="h-full "
      >
        {swiperItems.map((item) => (
          <SwiperSlide key={item.title} className="overflow-hidden">
            <div className="">
              {/* <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-cinzel max-w-lg">
                  {item.title}
                </h1>
                <p className="px-6 mb-6 md:mb-0 border-l-4 text-sm md:text-md border-l-primary md:w-7/12">
                  {item.subtitle}
                </p>
              </div> */}

              <div className="w-full">
                <img
                  src={item.image}
                  className="object-cover w-full brightness-85"
                  alt=""
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
