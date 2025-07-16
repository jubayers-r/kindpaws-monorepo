import { motion } from "motion/react";

const ShinyImage = ({ src, alt, shineControls, extraControls }) => {
  return (
    <motion.div
      className="relative group w-full max-w-md overflow-hidden rounded-2xl"
      animate={extraControls}
      initial={{ filter: "brightness(1)" }}
    >
      {/* Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-52 object-cover rounded-[1.8rem]"
      />

      {/* Shiny Overlay */}
      <motion.div
        initial={{ x: "-250%" }}
        animate={shineControls}
        className="pointer-events-none absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        style={{
          transform: "rotate(25deg)",
        }}
      />
    </motion.div>
  );
};

export default ShinyImage;
