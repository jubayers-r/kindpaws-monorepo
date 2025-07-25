import CardComponent from "@/components/shared/CardComponent/CardComponent";
import SkeletonCardComponent from "@/components/shared/CardComponent/SkeletonCardComponent";
import { useLoaderData } from "react-router";

const Adopt = () => {
  const petData = useLoaderData();
  return (
    <>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center sm:mb-20 mb-10 ">
        Adopt a New Family Member
      </h1>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
        {petData ? (
          petData.map((pet) => <CardComponent data={pet} type={"pet"} />)
        ) : (
          <SkeletonCardComponent />
        )}
      </div>
    </>
  );
};

export default Adopt;
