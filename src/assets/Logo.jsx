import paw from "/paws-logo.png";

const Logo = () => {
  return (
    <div className="flex gap-2 items-center font-[Cherry_Bomb_One]">
      <img src={paw} alt="" className="w-10 pointer-events-none" />
      <h3 className="text-2xl">KindPaws</h3>
    </div>
  );
};

export default Logo;
