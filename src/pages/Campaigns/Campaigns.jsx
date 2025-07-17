import CardComponent from "@/components/shared/CardComponent/CardComponent";
import { CampaignData } from "@/data/CampaignData";
import React from "react";

const Campaigns = () => {
  return (
    <>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center sm:mb-20 mb-10 ">
        Save a Paw, Change a Life
      </h1>
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
        {CampaignData.map((campaign) => (
          <CardComponent data={campaign} />
        ))}
      </div>
    </>
  );
};

export default Campaigns;
