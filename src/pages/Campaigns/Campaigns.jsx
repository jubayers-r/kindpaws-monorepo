import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import { useInView } from "react-intersection-observer";
import CardComponent from "@/components/shared/CardComponent/CardComponent";
import SkeletonCardComponent from "@/components/shared/CardComponent/SkeletonCardComponent";

const ITEMS_PER_PAGE = 6;

const Campaigns = () => {
  const allCampaigns = useLoaderData(); // assuming all 20 loaded initially

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { ref, inView } = useInView();

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
          selectedCategory === "All" ||
          campaign.category === selectedCategory;
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

  useEffect(() => {
    if (inView && totalCampaigns > 0) {
      setTimeout(() => {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      }, 10);
    }
  }, [inView, totalCampaigns]);

  return (
    <>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center sm:mb-20 mb-10">
        Save a Paw, Change a Life
      </h1>

      {/* 🔍 Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <input
          type="text"
          placeholder="Search campaigns by title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(ITEMS_PER_PAGE);
          }}
          className="input input-bordered w-screen  bg-white rounded-2xl px-2 py-3 text-center"
        />
        {/* <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setVisibleCount(ITEMS_PER_PAGE);
          }}
          className="select select-bordered w-full sm:max-w-xs bg-white rounded-2xl px-2 py-3"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select> */}
      </div>

      {/* 📦 Campaign Grid */}
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {visibleCampaigns.length > 0 ? (
          visibleCampaigns.map((campaign) => (
            <CardComponent
              key={campaign._id}
              data={campaign}
              type="campaign"
            />
          ))
        ) : (
          <SkeletonCardComponent />
        )}
      </div>

      {/* ⬇️ Infinite Scroll Trigger */}
      {filteredCampaigns.length > 0 && (
        <div ref={ref} className="my-10 text-center">
          <SkeletonCardComponent />
        </div>
      )}
    </>
  );
};

export default Campaigns;
