import { ArrowRight, PawPrint, MapPin } from "lucide-react";
import { motion, useAnimation } from "motion/react";
import ShinyImage from "@/components/ui/SharedComponents/CardComponent/ShinyImages";
import { Link } from "react-router";

const CardComponent = ({ pet }) => {
  const { image, name, location, shortDescription, gender, category } = pet;

  // Animation controls
  const shineControls = useAnimation();
  const extraControls = useAnimation();

  // text formatting function
  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  // Card hover handlers for shiny effect
  const handleCardMouseEnter = () => {
    shineControls.start({
      x: "350%",
      transition: { duration: 0.5, ease: "easeIn" },
    });
  };

  const handleCardMouseLeave = () => {
    shineControls.start({
      x: "-250%",
      transition: { duration: 0.5, ease: "easeIn" },
    });
  };

  // Image hover handlers for extra brightness effect
  const handleImageMouseEnter = () => {
    extraControls.start({
      filter: "brightness(1.1)",
      transition: { duration: 0.3 },
    });
  };

  const handleImageMouseLeave = () => {
    extraControls.start({
      filter: "brightness(1)",
      transition: { duration: 0.3 },
    });
  };

  return (
    <Link to="" className="block" aria-label={`See details about ${name}`}>
      <motion.div
        tabIndex={0}
        role="link"
        onMouseEnter={handleCardMouseEnter}
        onMouseLeave={handleCardMouseLeave}
        onFocus={handleCardMouseEnter}
        onBlur={handleCardMouseLeave}
        whileHover={{
          scale: 1.03,
          translateY: -2,
        }}
        whileTap={{
          scale: 0.97,
          translateY: 0,
          boxShadow: "0 8px 15px oklch(72.87% 0.16116 65.931)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 30 }}
        className="bg-white rounded-3xl p-4 shadow-md w-full max-w-sm space-y-4 cursor-pointer
          focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-opacity-50
          outline-none"
      >
        {/* Image with squiggly border */}
        <div className="w-full overflow-hidden rounded-[2rem]">
          <motion.div
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-1 bg-white rounded-[2rem] border-2 border-dashed border-gray-300"
          >
            <ShinyImage
              src={image}
              alt={`Photo of ${name}`}
              shineControls={shineControls}
              extraControls={extraControls}
            />
          </motion.div>
        </div>

        {/* Name + Gender + Location + Description */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-secondary hover:text-primary hover:underline cursor-pointer">
            {name}
          </h3>
        </div>
        <div className="text-sm text-muted-foreground flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-1">
            <PawPrint className="h-4 w-4 text-gray-400" />
            <span>
              {capitalize(gender)} {category.toLowerCase()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{location}</span>
          </div>
        </div>
        <p className="text-sm text-gray-700">{shortDescription}</p>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex justify-end"
        >
          {/* Just a styled div now */}
          <div
            className="text-primary text-sm hover:underline px-2 flex items-center gap-1 cursor-pointer select-none"
            aria-hidden="true"
          >
            See details
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default CardComponent;
