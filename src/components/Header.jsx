import React from "react";

const Header = ({
  spanText1 = "national ",
  spanText2 = "top 3",
  para = "this is test para",
  icon,
  maxWidth='xl:w-[519px] '
}) => {
  return (
    <div className={`flex flex-col items-start gap-2 w-auto ${maxWidth}  h-auto max-h-[58px]`}>
      <div className="flex items-center gap-4.5">
        {icon && (
          <span className="grid size-7.5 shrink-0 place-items-center">
            {icon}
          </span>
        )}
        <h2 className="font-barlow text-2xl sm:text-3xl md:text-4xl font-bold tracking-[1px] sm:tracking-[2px] whitespace-nowrap [text-box:trim-both_cap_alphabetic]">
          <span className="text-[#F4F6F1]">{spanText1.toUpperCase()}</span>
          <span className="text-gold">{spanText2.toUpperCase()}</span>
        </h2>
      </div>

      <p className="font-inter text-sm sm:text-md md:text-lg tracking-normal text-inactive">
        {para}
      </p>
    </div>
  );
};

export default Header;