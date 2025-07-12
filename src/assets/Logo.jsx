import paw from "/paws-logo.png";

const Logo = () => {
  return (
    <div className="flex gap-2 items-center font-[Cherry_Bomb_One]">
      <img src={paw} alt="" className="sm:w-10 w-5 pointer-events-none" />
      <h3 className="sm:text-2xl text-white ">KindPaws</h3>
    </div>
  );
};

export default Logo;
