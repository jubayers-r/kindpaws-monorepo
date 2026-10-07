import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import pawImg from "/src/assets/cta/paw-img.png";

const MIN_SHOW_MS = 2600; // one full paw pulse cycle (2.5s) + margin

const LoadingScreen = ({ isLoading }) => {
  const [visible, setVisible] = useState(false);
  const shownAtRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      if (shownAtRef.current === null) shownAtRef.current = Date.now();
      setVisible(true);
      return;
    }

    const shownAt = shownAtRef.current;
    if (shownAt === null) return;

    const remaining = MIN_SHOW_MS - (Date.now() - shownAt);
    if (remaining <= 0) {
      shownAtRef.current = null;
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => {
      shownAtRef.current = null;
      setVisible(false);
    }, remaining);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          role="status"
          aria-label="Loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
            }}
          >
            <motion.img
              src={pawImg}
              alt=""
              className="w-32 h-32 object-contain select-none"
              initial={{ scaleY: -1 }}
              animate={{
                scaleY: -1,
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
