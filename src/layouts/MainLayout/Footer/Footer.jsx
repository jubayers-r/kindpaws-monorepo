import QuickLinks from "./QuickLinks";
import FooterInput from "./FooterInput";

const Footer = () => {
  const openingHour = (days, time) => (
    <>
      <div className="flex justify-between my-3 ">
        <p>{days}</p>
        <p>{time}</p>
      </div>
      <hr />
    </>
  );

  return (
    <div className="bg-secondary text-white gap-5  ">
      <div className="mx-auto 2xl:w-9/11 w-[95%] grid grid-cols-3 py-20 gap-10">
        {/* left */}
        <FooterInput />
        {/* center (quicklinks) */}
        <QuickLinks />

        {/* Right (Opening hours) */}

        <div>
          <h3 className="font-[Paytone_One] text-xl">Opening Hour</h3>
          {openingHour("Sun - Thurs", "09:00AM - 06:00PM")}
          {openingHour("Friday", "Emergency Only")}
          {openingHour("Saturday", "11:00AM - 05:00PM")}
        </div>
      </div>
    </div>
  );
};

export default Footer;
