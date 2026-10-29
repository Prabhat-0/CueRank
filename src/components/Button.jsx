import Link from "next/link";
import React from "react";

const Button = ({
  padding = "py-3 px-7.5 md:py-3.5 ",
  text,
  textStyle = "text-inter font-semibold text-sm leading-0",
  bg = "bg-white/5",
  border = "border",
  blur = "backdrop-blur-md",
  href = "#",
  width = "w-fit",
  fill = "bg-[#4ADE80]/25",
  showBall = true,
  onClick, // NEW
}) => {
  const className = `group relative isolate overflow-hidden ${padding} ${textStyle} ${bg} ${border} ${blur} ${width} h-full flex cursor-pointer items-center justify-center rounded-full whitespace-nowrap
    transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]
    hover:scale-95 hover:shadow-[0_0_28px_rgba(74,222,128,0.28)] active:scale-90`;

  const content = (
    <>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 rounded-full ${fill}
          transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]
          group-hover:scale-x-100 group-hover:delay-[650ms]`}
      />

      <span
        className={`transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
          showBall
            ? "group-hover:-translate-x-2 group-hover:delay-[650ms] group-hover:animate-[cue-text_1.3s_forwards]"
            : ""
        }`}
      >
        {text}
      </span>

      {showBall && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 my-auto -left-10 h-[3px] w-8 rounded-full opacity-0
              bg-[linear-gradient(90deg,#5b3a1e_0%,#c89b5a_70%,#f1e4c8_92%,#6fb7ff_100%)]
              group-hover:animate-[cue-stick_1.3s_forwards]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 my-auto left-[calc(50%-0.5rem)] size-4 rounded-full opacity-0
              bg-[radial-gradient(circle_at_30%_30%,#ffffff,#d6d6d6)] shadow-[2px_2px_6px_rgba(0,0,0,0.45)]
              group-hover:animate-[cue-ball_1.3s_forwards]"
          >
            <span className="absolute left-0.75 top-0.75 size-1 rounded-full bg-[#E23258]" />
          </span>
        </>
      )}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
};

export default Button;