import { useEffect, useMemo, useState } from "react";
import CardComponent from "@/components/shared/CardComponent/CardComponent";
import SkeletonCardComponent from "@/components/shared/CardComponent/SkeletonCardComponent";
import { useLoaderData } from "react-router";
import { useInView } from "react-intersection-observer";

const ITEMS_PER_PAGE = 6;

const Adopt = () => {
  const allPets = useLoaderData(); // assuming all 20 are loaded
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc"); // 🔽 default descending
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const { ref, inView } = useInView();

  const categories = useMemo(() => {
    const all = allPets.map((pet) => pet.category);
    return ["All", ...new Set(all)];
  }, [allPets]);

  const filteredPets = useMemo(() => {
    return [...(allPets || [])]
      .filter((pet) => selectedCategory === "All" || pet.category === selectedCategory)
      .sort((a, b) => {
        const dateA = new Date(a.dateAdded || a.createdAt);
        const dateB = new Date(b.dateAdded || b.createdAt);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [allPets, selectedCategory, sortOrder]);

  // Infinite + Repeating Pet List
  const totalPets = filteredPets.length;
  const visiblePets =
    totalPets === 0
      ? []
      : Array.from(
          { length: visibleCount },
          (_, i) => filteredPets[i % totalPets]
        );

  // 👀 Load more when in view
  useEffect(() => {
    if (inView && totalPets > 0) {
      setTimeout(() => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      }, 10); // Optional delay
    }
  }, [inView, totalPets]);

  return (
    <>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 dark:text-white">
        Adopt a New Family Member
      </h1>

      {/* 🔍 Filter + Sort Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 max-w-3xl mx-auto">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setVisibleCount(ITEMS_PER_PAGE); // reset on filter
          }}
          className="select select-bordered w-full bg-white rounded-xl px-4 py-3"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setVisibleCount(ITEMS_PER_PAGE); // reset on sort
          }}
          className="select select-bordered w-full bg-white rounded-xl px-4 py-3"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>


      {/* 🐾 Pet Cards */}
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
        {visiblePets.length > 0 ? (
          visiblePets.map((pet) => (
            <CardComponent key={pet._id} data={pet} type="pet" />
          ))
        ) : (
          <SkeletonCardComponent />
        )}
      </div>

      {/* 🌀 Loader trigger */}
      {filteredPets.length > 0 && (
        <div ref={ref} className="my-10 text-center">
          <SkeletonCardComponent />
        </div>
      )}
    </>
  );
};

export default Adopt;
