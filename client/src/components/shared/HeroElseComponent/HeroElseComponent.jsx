import React from "react";
import { useLocation } from "react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import titlebarBg from "/src/assets/heroElse/titlebar-bg.jpg"

const HeroElseComponent = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <div className="-mt-35 -z-10 w-full relative sm:mb-20 mb-10">
      <img
        src={titlebarBg}
        alt=""
        className="object-cover h-[300px] w-full"
      />

      <div className="absolute top-2/3 w-[95%] 2xl:w-9/11 mx-auto left-0 right-0 ">
        <Breadcrumb>
          <BreadcrumbList className="flex items-center gap-1 text-white ">
            <BreadcrumbItem>
              <BreadcrumbLink className="flex items-center gap-1 hover:border-b hover:border-white">
                KINDPAWS
              </BreadcrumbLink>
            </BreadcrumbItem>

            {pathSegments.map((segment, index) => (
              <div key={index} className="flex items-center gap-1">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                  >
                    {segment.toUpperCase().replaceAll("-", " ")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default HeroElseComponent;
