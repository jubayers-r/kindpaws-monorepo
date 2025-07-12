import React from "react";
import { motion } from "motion/react";

const Categories = () => {
  // pet category info array
  const petCategories = [
    {
      img: "/src/assets/categories/reptiles.png",
      category: "Reptile",
      color: "bg-[#e2f1d2]",
    },
    {
      img: "/src/assets/categories/fish.png",
      category: "Fish",
      color: "bg-[#f7efe2]",
    },
    {
      img: "/src/assets/categories/cat.png",
      category: "Cats",
      color: "bg-[#f2dcdc]",
    },
    {
      img: "/src/assets/categories/dog.png",
      category: "Dogs",
      color: "bg-[#f3e9e0]",
    },
    {
      img: "/src/assets/categories/parrot.png",
      category: "Birds",
      color: "bg-[#eeeeee]",
    },
    {
      img: "/src/assets/categories/frog.png",
      category: "Frog",
      color: "bg-[#f7efe2]",
    },
  ];

   //   motion/react variables
  const circleVariants = {
    initial: {
      scale: 1.1,
    },
    hover: {
      scale: 1.15,
    },
  };

  const textVariants = {
    rest: {
      x: 0,
    },
    hover: {
      x: 300,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  //   resuable category circle variable
  const circle = (index, shrink, color, img, category) => (
    <motion.div
      key={index}
      className="flex flex-col justify-center text-center items-center"
      whileHover="hover"
      initial="initial"
    >
      <div
        className={`relative h-[120px] w-[120px] sm:h-[200px] sm:w-[200px] rounded-full flex items-center justify-center font-bold ${color} ${shrink}`}
      >
        {/* CATEGORY TEXT BEHIND IMAGE */}
        <motion.p
          variants={textVariants}
          className="absolute text-white -translate-y-5 text-[50px] sm:text-[80px] font-black tracking-wide pointer-events-none select-none font-[Outfit]"
        >
          {category}
        </motion.p>

        {/* IMAGE ABOVE TEXT */}
        <motion.img
          src={img}
          alt={category}
          variants={circleVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="scale-[1.1] z-10 object-contain -translate-y-3 sm:-translate-y-5"
        />
      </div>
        <p className="mt-3 font-bold">{category}<sup>(10)</sup></p>
    </motion.div>
  );



  return (
    <div className="text-black overflow-hidden ">
        <h3 className="font-bold sm:text-5xl text-3xl text-center sm:my-20 my-10">Choose Your Type</h3>
      <div className="xl:grid xl:grid-cols-6 xl:gap-5 hidden my-20 sm:my-30 ">
        {petCategories.map((item, i) => (
          <>{circle(i, "", item.color, item.img, item.category)}</>
        ))}
      </div>

      {/* mobile view */}
      <motion.div
        className="flex xl:hidden gap-5 cursor-grab active:cursor-grabbing my-20 sm:my-30 "
        drag="x"
        dragConstraints={{ left: -400, right: 0 }}
        whileTap={{ cursor: "grabbing" }}
      >
        {petCategories.map((item, i) => (
          <>{circle(i, "", item.color, item.img, item.category)}</>
        ))}
      </motion.div>
    </div>
  );
};

export default Categories;
