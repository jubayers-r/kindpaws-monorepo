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
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { ref, inView } = useInView();
  const columns = useGridColumns();

  // no category picker on this page yet — every campaign matches
  const selectedCategory = "All";

  const isSearching = searchTerm.trim().length > 0;

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

  // Cycle the list only for the infinite-scroll feel while browsing.
  // Search results stay unique — no repeats.
  const visibleCampaigns = useMemo(() => {
    if (totalCampaigns === 0) return [];
    if (isSearching) return filteredCampaigns.slice(0, visibleCount);
    return Array.from(
      { length: visibleCount },
      (_, i) => filteredCampaigns[i % totalCampaigns]
    );
  }, [filteredCampaigns, totalCampaigns, visibleCount, isSearching]);

  const hasMoreToLoad = !isSearching || visibleCount < totalCampaigns;

  // Loading placeholders: only fill the rest of the row with the last card
  // plus one full row after it — never beyond that.
  const skeletonCount = useMemo(() => {
    if (totalCampaigns === 0 || !hasMoreToLoad) return 0;
    const remainingInRow = (columns - (visibleCount % columns)) % columns;
    return remainingInRow + columns;
  }, [columns, visibleCount, totalCampaigns, hasMoreToLoad]);

  useEffect(() => {
    if (inView && totalCampaigns > 0 && hasMoreToLoad) {
      setTimeout(() => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      }, 10);
    }
  }, [inView, totalCampaigns, hasMoreToLoad]);

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
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm transition-[color,box-shadow] placeholder:text-gray-400 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
        />
      </div>

      {/* 📦 Campaign Grid */}
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {visibleCampaigns.length > 0 ? (
          <>
            {visibleCampaigns.map((campaign, i) => (
              <CardComponent
                key={`${campaign._id}-${i}`}
                data={campaign}
                type="campaign"
              />
            ))}
            {Array.from({ length: skeletonCount }, (_, i) => (
              <SkeletonCardComponent key={`skeleton-${i}`} />
            ))}
          </>
        ) : isSearching ? (
          <p className="col-span-full py-10 text-center text-gray-600 dark:text-gray-300">
            No campaigns match “{searchTerm.trim()}”.
          </p>
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
