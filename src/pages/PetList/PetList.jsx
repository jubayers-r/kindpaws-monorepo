import CardComponent from "@/components/ui/SharedComponents/CardComponent/CardComponent";
import { PetData } from "@/data/PetData";
import React from "react";

const PetList = () => {
  return (
    <div >
      <h1 className="text-5xl font-semibold text-center sm:mb-20 mb-10">Pet Listing</h1>
      <div className="grid grid-cols-5 gap-5">
        {PetData.map((pet) => (
          <CardComponent pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default PetList;
