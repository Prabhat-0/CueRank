"use client"
import Image from "next/image";
import HeroImage from "../../public/Hero-Img.png";
import Paragraph from "@/components/Paragraph";
import Button from "@/components/Button";
import BG from "../../public/BG.png"
import Container from "@/components/Container";
import { Crown, Person, Star, Streak, Target, Trophy, Win } from "@/svg";
import Header from "@/components/Header";
import { useState } from "react";
import Arjun from "../../public/Arjun.png";
import Daniel from "../../public/Daniel.png";
import Rohan from "../../public/Rohan.png";

const WinnerCardDetails = [
    {
        primaryColor: "#FAC738",
        header: "Gold · National Champion",
        image: Arjun,
        name: "Arjun Mehta",
        headingBg: "#C9A84C1A",
        corouselBg: "#FFFFFF06",
        buttonBg: "#C9A84C26",
        stats: { clubs: 48, tournaments: 48, targets: 48, winRate: "78%", streak: 7 },
    },
    {
        primaryColor: "#8A9DA8",
        header: "Silver · Runner-Up",
        image: Daniel,
        name: "Daniel Cartel",
        headingBg: "#8A9DA81A",
        corouselBg: "#FFFFFF04",
        buttonBg: "#FFFFFF04",
        stats: { clubs: 48, tournaments: 48, targets: 48, winRate: "78%", streak: 7 },
    },
    {
        primaryColor: "#A0522D",
        header: "Bronze · 3rd Place",
        image: Rohan,
        name: "Rohan Sharma",
        headingBg: "#A0522D1A",
        corouselBg: "#FFFFFF04",
        buttonBg: "#A0522D1A",
        stats: { clubs: 48, tournaments: 48, targets: 48, winRate: "78%", streak: 7 },
    },
];

const HeroPara =
    "Find your tournament. Play across clubs. Build your\nranking. One player profile, every table.";

const stats = [
    { value: "60+", label: "Registered Clubs" },
    { value: "1500+", label: "Active Tournaments" },
    { value: "₹20,000", label: "Prize Pool Distributed" },
];


export default function Home() {
    const [gender, setGender] = useState("male");
    const [age, setAge] = useState("Overall");
    return (
        <div className="w-full h-auto ">
            <Image src={BG} alt='BG' priority className="w-full h-auto -z-20 fixed top-0 left-0" />
            <section
                id="Hero"
                aria-label="Hero section"
                className="relative isolate w-full overflow-hidden"
            >
                {/* Background image */}
                <Image
                    src={HeroImage}
                    alt="Hero-Image"
                    fill
                    priority
                    sizes="100vw"
                    className="-z-10 w-full h-auto"
                />

                {/* Content drives the section height */}
                <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-4 px-5 pt-32 pb-16 sm:gap-8 sm:px-8 sm:pt-40 sm:pb-20 lg:pt-52 lg:pb-28 xl:gap-[51px] xl:px-0 xl:pt-64.5 xl:pb-35">
                    <p className="font-inter text-sm font-medium leading-none tracking-[0.05em] text-[#DBC28B] sm:text-base xl:text-lg">
                        THE TABLE IS WAITING
                    </p>

                    <h1 className="font-barlow text-4xl font-semibold leading-[0.98] tracking-[-0.007em] text-[#F4F6F1] sm:text-5xl md:text-7xl xl:text-[90px] xl:[text-box:trim-both_cap_alphabetic]">
                        <span className="block">Your next shot.</span>
                        <span className="block">Your next rank.</span>
                    </h1>

                    <Paragraph
                        text={HeroPara}
                        textSize=" text-sm md:text-base leading-[1.65] sm:text-lg xl:text-[22px] xl:whitespace-pre-line xl:[text-box:trim-both_cap_alphabetic]"
                    />

                    <div className="flex w-full gap-3 sm:w-auto flex-row sm:gap-4 whitespace-nowrap">
                        <Button
                            text="Register as a player"
                            padding="px-6 md:px-8 xl:px-10 py-3 md:py-3.5"
                            textStyle="font-inter font-semibold text-[12px] md:text-base text-[#11291E]"
                            bg="bg-buttons"
                            width="w-full sm:w-fit"
                        />
                        <Button
                            text="Register your club"
                            padding="px-6 md:px-8 xl:px-10 py-3 md:py-3.5"
                            textStyle="font-inter font-semibold text-[12px] md:text-base text-inactive"
                            border="border-none"
                            bg="bg-transparent"
                            blur="backdrop-blur-[10px]"
                            width="w-full sm:w-fit"
                        />
                    </div>
                </div>
            </section>
            <section
                id="stats"
                aria-label="Platform stats"
                className="flex w-full items-center justify-center px-4 py-10 xl:py-15"
            >
                <div className="w-full max-w-[1200px] bg-[#10171566] px-4 py-2 backdrop-blur-[10px] sm:px-8 rounded-full md:py-7.5 xl:px-37.5">
                    <div className="grid w-full grid-cols-3">
                        {stats.map((s, i) => (
                            <div
                                key={s.label}
                                className={`flex flex-col items-center justify-center gap-2 text-center sm:gap-5 ${i > 0 ? "border-l border-inactive" : ""
                                    }`}
                            >
                                <p className="font-barlow text-xl font-semibold text-[#F4F6F1] sm:text-2xl xl:text-3xl">
                                    {s.value}
                                </p>
                                <p className="font-inter text-[10px] font-medium text-inactive sm:text-xs xl:text-sm">
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Container id="WinnerTop3" >
                <div className="w-full h-auto max-h-14.5 flex flex-col gap-7.5">
                    <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0  flex w-full flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                        <Header
                            icon={<Crown />}
                            spanText1="national "
                            spanText2="top 3"
                            para="The best. On top. National rankings, real talent."
                        />

                        <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0 flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 xl:w-auto">
                            {/* Gender */}
                            <div
                                role="group"
                                aria-label="Gender"
                                className="flex w-full shrink-0 items-center gap-1 rounded-full bg-[#25393366] p-1.5 sm:w-fit"
                            >
                                {["male", "female"].map((g) => (
                                    <button
                                        key={g}
                                        type="button"
                                        aria-pressed={gender === g}
                                        onClick={() => setGender(g)}
                                        className={`flex-1 cursor-pointer rounded-full px-4 py-2 font-inter text-xs font-semibold capitalize leading-none transition-colors duration-300 sm:flex-none sm:px-5 sm:py-2.5 sm:text-sm ${gender === g
                                                ? "bg-buttons text-black"
                                                : "text-inactive hover:text-white/80"
                                            }`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>

                            {/* Age: scrolls sideways when it doesn't fit */}
                            <div
                                role="group"
                                aria-label="Age"
                                className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-full bg-[#25393366] p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                            >
                                {["Overall", "Under 16", "Under 21", "Open", "40+"].map((a) => (
                                    <button
                                        key={a}
                                        type="button"
                                        aria-pressed={age === a}
                                        onClick={() => setAge(a)}
                                        className={`shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 py-2 font-inter text-xs font-semibold leading-none transition-colors duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${age === a
                                                ? "bg-buttons text-black"
                                                : "text-inactive hover:text-white/80"
                                            }`}
                                    >
                                        {a}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div id="winnerCorousel" className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0">
                        {WinnerCardDetails.map((card, index) => (
                            <div
                                key={card.name}
                                className="overflow-hidden rounded-xl border"
                                style={{ borderColor: card.primaryColor }}
                            >
                                {/* Card heading */}
                                <div
                                    className="flex items-center gap-3.5 whitespace-nowrap px-5 py-2.5"
                                    style={{ backgroundColor: card.headingBg }}
                                >
                                    <div
                                        className="flex size-8 items-center justify-center rounded-md font-barlow text-lg font-bold text-black"
                                        style={{ backgroundColor: card.primaryColor }}
                                    >
                                        {index + 1}
                                    </div>
                                    <div className="flex size-5 items-center justify-center">
                                        <Crown stroke={card.primaryColor} />
                                    </div>
                                    <h2
                                        className="font-inter text-[11px] font-semibold tracking-[1.5px] whitespace-nowrap"
                                        style={{ color: card.primaryColor }}
                                    >
                                        {card.header}
                                    </h2>
                                </div>

                                {/* Player */}
                                <div
                                    className="flex flex-col items-center justify-center gap-5 p-5"
                                    style={{ backgroundColor: card.corouselBg }}
                                >
                                    <div
                                        className="size-25 overflow-hidden rounded-full border"
                                        style={{ borderColor: card.primaryColor }}
                                    >
                                        <Image
                                            src={card.image}
                                            alt={card.name}
                                            width={100}
                                            height={100}
                                            className="size-full object-cover"
                                        />
                                    </div>

                                    <h4 className="font-inter text-2xl font-bold text-[#F4F6F1]">{card.name}</h4>

                                    <button
                                        type="button"
                                        className="flex w-fit items-center gap-1.5 rounded-full border px-4.5 py-1.5"
                                        style={{
                                            backgroundColor: card.buttonBg,
                                            borderColor: card.primaryColor,
                                            color: card.primaryColor,
                                        }}
                                    >
                                        <Star stroke={card.primaryColor} /> Open 16
                                    </button>
                                </div>

                                {/* Stats row 1 */}
                                <div className="grid grid-cols-3 border-t border-inactive py-5">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap font-inter text-[11px] text-inactive">
                                            <Person /> Clubs played
                                        </span>
                                        <p className="font-barlow text-[26px] font-bold text-[#F4F6F1]">{card.stats.clubs}</p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center border-l border-inactive">
                                        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap font-inter text-[11px] text-inactive">
                                            <Trophy /> Clubs played
                                        </span>
                                        <p className="font-barlow text-[26px] font-bold text-[#F4F6F1]">{card.stats.tournaments}</p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center border-l border-inactive">
                                        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap font-inter text-[11px] text-inactive">
                                            <Target /> Clubs played
                                        </span>
                                        <p className="font-barlow text-[26px] font-bold text-[#F4F6F1]">{card.stats.targets}</p>
                                    </div>
                                </div>

                                {/* Stats row 2 */}
                                <div className="grid grid-cols-2 border-t border-inactive py-5">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap font-inter text-[11px] text-inactive">
                                            <Win /> Win %
                                        </span>
                                        <p className="font-barlow text-[26px] font-bold text-[#4ADE80]">{card.stats.winRate}</p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center border-l border-inactive">
                                        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap font-inter text-[11px] text-inactive">
                                            <Streak /> Win Streak
                                        </span>
                                        <p className="font-barlow text-[26px] font-bold text-[#F97316]">{card.stats.streak}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/** bottom of  winner section */}
                    <div className="flex w-full items-center gap-2 md:gap-5 px-4 sm:px-6  xl:px-40">
                        {/* Left line */}
                       <div className="h-px flex-1 bg-inactive hidden md:block " />

                        {/* Center content */}
                        <div className="flex shrink-0 items-center gap-3">
                            <div className="w-fit h-full p-1 grid place-items-center">
                                <Crown />
                            </div>
                            <h5 className="whitespace-nowrap font-inter text-[11px] font-medium tracking-[3px] text-inactive">
                                Great Players. Bigger Dreams.
                            </h5>
                            <div className="w-8 sm:w-fit h-full p-2 grid place-items-center">
                                <Crown />
                            </div>

                        </div>

                        {/* Right line */}
                        <div className="h-px flex-1 bg-inactive hidden md:block " />
                    </div>
                </div>
            </Container>
        </ div>
    );
}