import { useEffect, useMemo, useState } from "react";
import CardComponent from "@/components/shared/CardComponent/CardComponent";
import SkeletonCardComponent from "@/components/shared/CardComponent/SkeletonCardComponent";
import { useLoaderData, useSearchParams } from "react-router";
import { useInView } from "react-intersection-observer";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 6;

const CONTROL_CLASS =
  "flex w-full items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-base shadow-sm hover:bg-gray-50 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none data-[state=open]:bg-gray-50 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:data-[state=open]:bg-neutral-800";
const CONTENT_CLASS =
  "min-w-[var(--radix-dropdown-menu-trigger-width)] rounded-xl border-gray-200 p-1 shadow-lg dark:border-neutral-700 dark:bg-neutral-900 dark:text-white";
const ITEM_CLASS =
  "cursor-pointer rounded-lg px-3 py-2.5 focus:bg-accent dark:focus:bg-neutral-800";

const FilterDropdown = ({ label, value, options, onChange }) => {
  const selected = options.find((option) => option.value === value);

  // modal={false} keeps Radix from locking page scroll (no scrollbar jump)
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger aria-label={label} className={CONTROL_CLASS}>
        <span className="truncate">{selected?.label ?? value}</span>
        <ChevronDown className="size-4 shrink-0 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={6} className={CONTENT_CLASS}>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => onChange(option.value)}
            className={cn(
              ITEM_CLASS,
              option.value === value && "font-semibold text-primary"
            )}
          >
            {option.label}
            {option.value === value && <Check className="ml-auto size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const normalizeCategory = (value) =>
  (value || "").trim().toLowerCase().replace(/s$/, "");

// Mirrors the grid classes: 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2
const getColumnCount = (width) => {
  if (width >= 1536) return 5;
  if (width >= 1280) return 4;
  if (width >= 768) return 3;
  if (width >= 640) return 2;
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

const Adopt = () => {
  const allPets = useLoaderData(); // assuming all 20 are loaded
  const [searchParams] = useSearchParams();
  const [sortOrder, setSortOrder] = useState("desc"); // 🔽 default descending
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const { ref, inView } = useInView();

  const categories = useMemo(() => {
    const all = allPets.map((pet) => pet.category);
    return ["All", ...new Set(all)];
  }, [allPets]);

  // ?category= from "Find Your Best Match" (e.g. "Dogs" -> "Dog")
  const requestedCategory = useMemo(() => {
    const param = searchParams.get("category");
    if (!param) return null;
    const normalized = normalizeCategory(param);
    return (
      categories.find((cat) => normalizeCategory(cat) === normalized) || null
    );
  }, [searchParams, categories]);

  const [selectedCategory, setSelectedCategory] = useState(
    () => requestedCategory || "All"
  );

  const columns = useGridColumns();

  useEffect(() => {
    setSelectedCategory(requestedCategory || "All");
    setVisibleCount(ITEMS_PER_PAGE);
  }, [requestedCategory]);

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

  // Loading placeholders: only fill the rest of the row with the last card
  // plus one full row after it — never beyond that.
  const skeletonCount = useMemo(() => {
    if (totalPets === 0) return 0;
    const remainingInRow = (columns - (visibleCount % columns)) % columns;
    return remainingInRow + columns;
  }, [columns, visibleCount, totalPets]);

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
        <FilterDropdown
          label="Filter by category"
          value={selectedCategory}
          options={categories.map((cat) => ({ value: cat, label: cat }))}
          onChange={(value) => {
            setSelectedCategory(value);
            setVisibleCount(ITEMS_PER_PAGE); // reset on filter
          }}
        />

        <FilterDropdown
          label="Sort order"
          value={sortOrder}
          options={[
            { value: "desc", label: "Newest First" },
            { value: "asc", label: "Oldest First" },
          ]}
          onChange={(value) => {
            setSortOrder(value);
            setVisibleCount(ITEMS_PER_PAGE); // reset on sort
          }}
        />
      </div>


      {/* 🐾 Pet Cards */}
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
        {visiblePets.length > 0 ? (
          <>
            {visiblePets.map((pet) => (
              <CardComponent key={pet._id} data={pet} type="pet" />
            ))}
            {Array.from({ length: skeletonCount }, (_, i) => (
              <SkeletonCardComponent key={`skeleton-${i}`} />
            ))}
          </>
        ) : (
          <SkeletonCardComponent />
        )}
      </div>

      {/* 🌀 Loader trigger */}
      {filteredPets.length > 0 && <div ref={ref} aria-hidden="true" />}
    </>
  );
};

export default Adopt;
