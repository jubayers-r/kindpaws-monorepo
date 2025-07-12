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

const Hero = () => {
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
    <section className=" absolute -z-1 h-[65vh] md:h-[50vh] lg:h-[90vh] w-full overflow-hidden">
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
                <img src={item.image} className="object-cover w-full brightness-85" alt="" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;


// const tabImages = import.meta.glob(
//   "/src/assets/carousel/tab/*.{jpg,jpeg,png,svg,webp}",
//   {
//     eager: true,
//     import: "default",
//   },
// );


// const ctaData = [
//   {
//     title: "Delicious Breakfast Ideas",
//     description: "Start your day with our easy and healthy breakfast recipes.",
//   },
//   {
//     title: "Quick Lunch Recipes",
//     description: "Tasty meals ready in under 30 minutes.",
//   },
//   {
//     title: "Dinner You’ll Love",
//     description: "Hearty dinners for the whole family to enjoy.",
//   },
// ];

// const Hero = () => {
//   return (
//     <div className="relative w-full h-screen">
//       <Carousel
//         showThumbs={false}
//         showStatus={false}
//         infiniteLoop
//         autoPlay
//         showArrows={false}
//         interval={3000}
//         verticalSwipe="natural"
//         swipeable
//         emulateTouch
//         className="h-full"
//       >
//         {imageList.map((src, idx) => (
//           <div key={idx} className="relative h-full">
//             <img src={src} alt={`Slide ${idx + 1}`} className="object-cover h-screen w-full brightness-75" />
//             <div className="absolute bottom-10 w-full text-center z-20 px-4">
//               <div className="bg-black/50 p-6 rounded-xl inline-block text-white">
//                 <h2 className="text-3xl font-bold mb-2">{ctaData[idx % ctaData.length].title}</h2>
//                 <p className="mb-4">{ctaData[idx % ctaData.length].description}</p>
//                 <Link to="/recipes">
//                   <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-[#00ed64] transition">
//                     See All Recipes
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// };

// export default Hero;

