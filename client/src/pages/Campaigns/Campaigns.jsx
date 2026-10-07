import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import { useInView } from "react-intersection-observer";
import CardComponent from "@/components/shared/CardComponent/CardComponent";
import SkeletonCardComponent from "@/components/shared/CardComponent/SkeletonCardComponent";

const ITEMS_PER_PAGE = 6;

// Mirrors the grid classes: 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2
const getColumnCount = (width) => {
  if (width >= 1536) return 4;
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
};

const useGridColumns = () => {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const update = () => setColumns(getColumnCount(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return columns;
};

const Campaigns = () => {
  const allCampaigns = useLoaderData(); // assuming all 20 loaded initially

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { ref, inView } = useInView();
  const columns = useGridColumns();

  const categories = useMemo(() => {
    const all = allCampaigns.map((c) => c.category);
    return ["All", ...new Set(all)];
  }, [allCampaigns]);

  const filteredCampaigns = useMemo(() => {
    return [...(allCampaigns || [])]
      .filter((campaign) => {
        const matchesName = campaign.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || campaign.category === selectedCategory;
        return matchesName && matchesCategory;
      })
      .sort(
        (a, b) =>
          new Date(b.dateAdded || b.createdAt) -
          new Date(a.dateAdded || a.createdAt)
      );
  }, [allCampaigns, searchTerm, selectedCategory]);

  const totalCampaigns = filteredCampaigns.length;
  const visibleCampaigns =
    totalCampaigns === 0
      ? []
      : Array.from(
          { length: visibleCount },
          (_, i) => filteredCampaigns[i % totalCampaigns]
        );

  // Loading placeholders: only fill the rest of the row with the last card
  // plus one full row after it — never beyond that.
  const skeletonCount = useMemo(() => {
    if (totalCampaigns === 0) return 0;
    const remainingInRow = (columns - (visibleCount % columns)) % columns;
    return remainingInRow + columns;
  }, [columns, visibleCount, totalCampaigns]);

  useEffect(() => {
    if (inView && totalCampaigns > 0) {
      setTimeout(() => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      }, 10);
    }
  }, [inView, totalCampaigns]);

  return (
    <>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 dark:text-primary-foreground">
        Save a Paw, Change a Life
      </h1>

      {/* 🔍 Filter Controls */}
      <div className="w-full max-w-3xl mx-auto mb-10 px-4">
        <input
          type="text"
          placeholder="Search campaigns by title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(ITEMS_PER_PAGE);
          }}
          className="input input-bordered w-full bg-white rounded-xl px-4 py-3"
        />
      </div>

      {/* 📦 Campaign Grid */}
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {visibleCampaigns.length > 0 ? (
          <>
            {visibleCampaigns.map((campaign) => (
              <CardComponent
                key={campaign._id}
                data={campaign}
                type="campaign"
              />
            ))}
            {Array.from({ length: skeletonCount }, (_, i) => (
              <SkeletonCardComponent key={`skeleton-${i}`} />
            ))}
          </>
        ) : (
          <SkeletonCardComponent />
        )}
      </div>

      {/* ⬇️ Infinite Scroll Trigger */}
      {filteredCampaigns.length > 0 && <div ref={ref} aria-hidden="true" />}
    </>
  );
};

export default Campaigns;
