import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa6";

const CopyrightComponent = () => {
  const iconClass = "w-5 h-5";
  const wrapperClass =
    "w-10 h-10 rounded-full bg-[#f29e4c] flex items-center justify-center hover:bg-secondary hover:outline hover:text-primary transition";

  return (
    <div className="bg-secondary text-white">
      <div className="w-[95%] mx-auto 2xl:w-9/11 flex flex-col md:flex-row justify-between items-center py-6 gap-4">
        {/* Text */}
        <p className="text-center md:text-left">
          © 2024 <span className="text-primary">KindPaws</span>. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a href="https://facebook.com/jubayers.r" target="_blank" rel="noreferrer" className={wrapperClass}>
            <FaFacebookF className={iconClass} />
          </a>
          <a href="https://x.com/jubayers_r" target="_blank" rel="noreferrer" className={wrapperClass}>
            <FaXTwitter className={iconClass} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className={wrapperClass}>
            <FaInstagram className={iconClass} />
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer" className={wrapperClass}>
            <FaPinterestP className={iconClass} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CopyrightComponent;
