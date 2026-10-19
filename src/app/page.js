import Image from "next/image";

export default function Home() {
  return (
   <div className="relative bg-linear-to-r from-[#85d5a0b3] via-[rgba(90,163,105,0.5)] to-[rgb(16,141,45)] w-full h-[100dvh] flex items-center justify-center">
    <button className="w-fit px-6 py-4 font-inter font-semibold bg-buttons grid place-items-center rounded-full">
      Register
    </button>
   </div>
  );
}
