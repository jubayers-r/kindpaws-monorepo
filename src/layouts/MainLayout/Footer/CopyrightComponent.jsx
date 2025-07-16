import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa6";

const CopyrightComponent = () => {
  // icons classes
  const iconClass = "w-5 h-5  ";
  const wrapperClass =
    "w-12 h-12 rounded-full bg-[#f29e4c] flex items-center justify-center  hover:bg-secondary hover:outline transition  hover:text-primary ";

  return (
    <div>
      {/* copyright start */}
      <div className="  bg-secondary text-white ">
        <div className="2xl:w-9/11 w-[95%] mx-auto flex justify-between">
          {/* social icons */}
          <p className="py-8 ">
            © Copyright 2024. All rights reserved{" "}
            <span className="text-primary">KindPaws</span>.
          </p>
          <div className="flex items-center gap-4  p-4 ">
            <a
              href="https://facebook.com/jubayers.r"
              target="_blank"
              rel="noreferrer"
              className={wrapperClass}
            >
              <FaFacebookF className={iconClass} />
            </a>
            <a
              href="https://x.com/jubayers_r"
              target="_blank"
              rel="noreferrer"
              className={wrapperClass}
            >
              <FaXTwitter className={iconClass} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className={wrapperClass}
            >
              <FaInstagram className={iconClass} />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className={wrapperClass}
            >
              <FaPinterestP className={iconClass} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightComponent;
