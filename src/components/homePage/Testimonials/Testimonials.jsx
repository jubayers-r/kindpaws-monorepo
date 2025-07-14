import React from "react";
import TestimonialCard from "./TestimonialCard";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useRef } from "react";
import { TestimonialItems } from "@/data/TestimonialItems";

const Testimonials = () => {
  const timer = useRef(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 1, spacing: 20 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 24 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 32 },
      },
    },
    slides: { perView: 1, spacing: 16 }, // base mobile

    created() {
      timer.current = setInterval(() => {
        instanceRef.current?.next();
      }, 4000);
    },
    destroyed() {
      clearInterval(timer.current);
    },
  });

  return (
    <section className="relative py-20 ">
      {/* Full-width background image that escapes container */}
      <div className="absolute top-0 left-1/2 w-screen -translate-x-1/2 h-full -z-10">
        <img
          src="/src/assets/testimonial/testimonial-bg.jpg"
          alt="Testimonial background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Centered content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div ref={sliderRef} className="keen-slider">
          {TestimonialItems.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
