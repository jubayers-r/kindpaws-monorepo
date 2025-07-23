import CardComponent from "@/components/shared/CardComponent/CardComponent";
import React from "react";
import { useLoaderData } from "react-router";

const Campaigns = () => {
  const campaignData = useLoaderData();

  return (
    <>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center sm:mb-20 mb-10 ">
        Save a Paw, Change a Life
      </h1>
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {campaignData.map((campaign) => (
          <CardComponent data={campaign} />
        ))}
      </div>
    </>
  );
};

export default Campaigns;
