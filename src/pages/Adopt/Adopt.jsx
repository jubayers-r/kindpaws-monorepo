import { useEffect, useMemo, useState } from "react";
import CardComponent from "@/components/shared/CardComponent/CardComponent";
import SkeletonCardComponent from "@/components/shared/CardComponent/SkeletonCardComponent";
import { useLoaderData } from "react-router";
import { useInView } from "react-intersection-observer";

const ITEMS_PER_PAGE = 6;

const Adopt = () => {
  const allPets = useLoaderData(); // assuming all 20 are loaded
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const { ref, inView } = useInView();

  const categories = useMemo(() => {
    const all = allPets.map((pet) => pet.category);
    return ["All", ...new Set(all)];
  }, [allPets]);

  const filteredPets = useMemo(() => {
    return [...(allPets || [])]
      .filter((pet) => {
        const matchesName = pet.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || pet.category === selectedCategory;
        return matchesName && matchesCategory;
      })
      .sort(
        (a, b) =>
          new Date(b.dateAdded || b.createdAt) -
          new Date(a.dateAdded || a.createdAt)
      );
  }, [allPets, searchTerm, selectedCategory]);

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
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center sm:mb-20 mb-10">
        Adopt a New Family Member
      </h1>

      {/* 🔍 Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <input
          type="text"
          placeholder="Search pets by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(ITEMS_PER_PAGE); // reset on search
          }}
          className="input input-bordered w-full sm:max-w-sm bg-white rounded-2xl px-2 py-3"
        />
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setVisibleCount(ITEMS_PER_PAGE); // reset on filter
          }}
          className="select select-bordered w-full sm:max-w-xs bg-white rounded-2xl px-2 py-3"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
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
