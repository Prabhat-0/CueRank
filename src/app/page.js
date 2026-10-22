"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import HeroImage from "../../public/Hero-Img.png";
import BG from "../../public/BG.png";
import Arjun from "../../public/Arjun.png";
import Daniel from "../../public/Daniel.png";
import Rohan from "../../public/Rohan.png";
import WinnerPhoto from "../../public/Winner Photo.png"
import RunnerUpPhoto from "../../public/RunnerUp Photo.png"
import Paragraph from "@/components/Paragraph";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Container from "@/components/Container";
import { Crown, DownArrow, Person, Search, Star, Streak, Target, Trophy, WhatsApp, Win } from "@/svg";
import SportImg from "../../public/sport.png";
import ClubImage from '../../public/Club Image.png'
import Logo from "../../public/Logo.png"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const WHATSAPP_MESSAGE =
    "Hi, I'd like to know more about registering as a player or club.";

const whatsappHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : null;

const HeroPara =
    "Find your tournament. Play across clubs. Build your\nranking. One player profile, every table.";

const stats = [
    { value: "60+", label: "Registered Clubs" },
    { value: "1500+", label: "Active Tournaments" },
    { value: "₹20,000", label: "Prize Pool Distributed" },
];

const WinnerCardDetails = [
    {
        primaryColor: "#FAC738",
        header: "Gold · National Champion",
        image: Arjun,
        name: "Arjun Mehta",
        headingBg: "#C9A84C1A",
        corouselBg: "linear-gradient(180deg, #2A1F00 0%, #1A2A1A 50%, #0D1A10 100%)",
        buttonBg: "#C9A84C1A",
        stats: { clubs: 48, tournaments: 48, targets: 48, winRate: "78%", streak: 7 },
    },
    {
        primaryColor: "#8A9DA8",
        header: "Silver · Runner-Up",
        image: Daniel,
        name: "Daniel Cartel",
        headingBg: "#8A9DA81A",
        corouselBg: "linear-gradient(180deg, #1A1F22 0%, #101618 100%)",
        buttonBg: "#FFFFFF04",
        stats: { clubs: 48, tournaments: 48, targets: 48, winRate: "78%", streak: 7 },
    },
    {
        primaryColor: "#A0522D",
        header: "Bronze · 3rd Place",
        image: Rohan,
        name: "Rohan Sharma",
        headingBg: "#A0522D1A",
        corouselBg: "linear-gradient(180deg, #221508 0%, #1A1510 100%)",
        buttonBg: "#A0522D1A",
        stats: { clubs: 48, tournaments: 48, targets: 48, winRate: "78%", streak: 7 },
    },
];
const tournaments = [
    {
        id: 1,
        image: SportImg,
        title: "Chennai Championship",
        meta: "Chennai · Royal Cue · Oct 24, 2026",
        entryFee: "$20",
        prize: "$800",
        spots: "24/32",
        lastEntry: "3d 12h 50m",
    },
    {
        id: 2,
        image: SportImg,
        title: "Mumbai Open",
        meta: "Mumbai · Cue Masters · Nov 02, 2026",
        entryFee: "$30",
        prize: "$1,200",
        spots: "10/32",
        lastEntry: "6d 4h 20m",
    },
    {
        id: 3,
        image: SportImg,
        title: "Delhi Grand Slam",
        meta: "Delhi · Black Ball Club · Nov 15, 2026",
        entryFee: "$25",
        prize: "$1,000",
        spots: "2/16",
        lastEntry: "1d 8h 05m",
    },
];

const filterList = ["All", "Location", "Club", "Age Group", "Gender", "Entry Fee"];

const spotlightTableContent = [{ text: "Tables", number: 12 }, { text: "Active Tournaments", number: 3 }, { text: "Tournaments Hosted", number: 142 }, { text: "Prize Distributed", number: "$45000" }, { text: "Total Players", number: 1240 }]
const GENDERS = ["male", "female"];
const AGES = ["Overall", "Under 16", "Under 21", "Open", "40+"];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function Home() {
    const [gender, setGender] = useState("male");
    const [age, setAge] = useState("Overall");
    const [filterButton, setFilterButton] = useState(0);

    return (
        <div className="h-auto w-full">
            {/* Page background */}
            <Image
                src={BG}
                alt=""
                priority
                className="fixed -top-20 lg:absolute left-0 lg:top-0 -z-20 h-auto w-full"
            />

            {/* WhatsApp CTA (outside every section so blur can sample the page) */}
            {whatsappHref && (
                <Link
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="
                        fixed z-50 grid place-items-center rounded-full
                        border border-[#1B2824B2] bg-[#10171566] shadow-lg
                        backdrop-blur-lg [-webkit-backdrop-filter:blur(16px)]
                        right-4 bottom-4 size-12 [&_svg]:size-6
                        sm:right-8 sm:bottom-8 sm:size-14 sm:[&_svg]:size-7
                        xl:right-20 xl:bottom-20 xl:size-15 xl:[&_svg]:size-[30px]
                    "
                >
                    <WhatsApp size="30" />
                </Link>
            )}

            {/* ---------------------------- Hero ---------------------------- */}
            <section
                id="Hero"
                aria-label="Hero section"
                className="relative isolate w-full overflow-hidden"
            >
                <Image
                    src={HeroImage}
                    alt="Hero-Image"
                    fill
                    priority
                    sizes="100vw"
                    className="-z-10 object-cover object-center"
                />

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

                    <div className="flex w-full flex-row gap-3 whitespace-nowrap sm:w-auto sm:gap-4">
                        <Button
                            href="#"
                            text="Register as a player"
                            padding="px-6 md:px-8 xl:px-10 py-3 md:py-3.5"
                            textStyle="font-inter font-semibold text-[12px] md:text-base text-[#11291E]"
                            bg="bg-buttons"
                            width="w-full sm:w-fit"
                        />
                        <Button
                            href="#"
                            text="Register your club"
                            padding="px-6 md:px-8 xl:px-10 py-3 md:py-3.5"
                            textStyle="font-inter font-semibold text-[12px] md:text-base text-inactive"
                            border="border-none"
                            bg="bg-white/5"
                            blur="backdrop-blur-[10px]"
                            width="w-full sm:w-fit"
                        />
                    </div>
                </div>
            </section>

            {/* ---------------------------- Stats ---------------------------- */}
            <section
                id="stats"
                aria-label="Platform stats"
                className="flex w-full items-center justify-center px-4 py-10 xl:py-15"
            >
                <div className="w-full max-w-[1200px] rounded-full bg-[#10171566] px-4 py-2 backdrop-blur-[10px] sm:px-8 md:py-7.5 xl:px-37.5">
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

            {/* ------------------------ National top 3 ------------------------ */}
            <Container id="WinnerTop3">
                <div className="flex h-auto w-full flex-col gap-7.5">
                    {/* Header row */}
                    <div className="flex w-full flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                        <Header
                            icon={<Crown />}
                            spanText1="national "
                            spanText2="top 3"
                            para="The best. On top. National rankings, real talent."
                        />

                        <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 xl:w-auto">
                            {/* Gender */}
                            <div
                                role="group"
                                aria-label="Gender"
                                className="flex w-full shrink-0 items-center gap-1 rounded-full bg-[#25393366] p-1.5 sm:w-fit"
                            >
                                {GENDERS.map((g) => (
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
                                {AGES.map((a) => (
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

                    {/* Cards */}
                    <div
                        id="winnerCorousel"
                        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {WinnerCardDetails.map((card, index) => (
                            <div
                                key={card.name}
                                className="overflow-hidden rounded-xl border"
                                style={{ borderColor: card.primaryColor, background: card.corouselBg }}

                            >
                                {/* Card heading */}
                                <div
                                    className="flex items-center gap-3.5 whitespace-nowrap px-5 py-2.5"
                                    style={{ background: card.headingBg }}
                                >
                                    <div
                                        className="flex size-8 items-center justify-center rounded-md font-barlow text-lg font-bold text-black bg-[#c9a84c3f]"
                                        style={{ backgroundColor: card.primaryColor }}
                                    >
                                        {index + 1}
                                    </div>
                                    <div className="flex size-5 items-center justify-center">
                                        <Crown stroke={card.primaryColor} />
                                    </div>
                                    <h2
                                        className="whitespace-nowrap font-inter text-[11px] font-semibold tracking-[1.5px]"
                                        style={{ color: card.primaryColor }}
                                    >
                                        {card.header.toUpperCase()}
                                    </h2>
                                </div>

                                {/* Player */}
                                <div
                                    className="flex flex-col items-center justify-center gap-2 p-5 sm:gap-3 md:gap-5"

                                >
                                    <div
                                        className="size-18 overflow-hidden rounded-full border sm:size-22 md:size-25"
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

                                    <h4 className="font-inter text-lg font-bold text-[#F4F6F1] md:text-2xl">
                                        {card.name}
                                    </h4>

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
                                        <p className="font-barlow text-[26px] font-bold text-[#F4F6F1]">
                                            {card.stats.clubs}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center border-l border-inactive">
                                        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap font-inter text-[11px] text-inactive">
                                            <Trophy /> Tournaments
                                        </span>
                                        <p className="font-barlow text-[26px] font-bold text-[#F4F6F1]">
                                            {card.stats.tournaments}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center border-l border-inactive">
                                        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap font-inter text-[11px] text-inactive">
                                            <Target /> Targets
                                        </span>
                                        <p className="font-barlow text-[26px] font-bold text-[#F4F6F1]">
                                            {card.stats.targets}
                                        </p>
                                    </div>
                                </div>

                                {/* Stats row 2 */}
                                <div className="grid grid-cols-2 border-t border-inactive py-5">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap font-inter text-[11px] text-inactive">
                                            <Win /> Win %
                                        </span>
                                        <p className="font-barlow text-[26px] font-bold text-[#4ADE80]">
                                            {card.stats.winRate}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center border-l border-inactive">
                                        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap font-inter text-[11px] text-inactive">
                                            <Streak /> Win Streak
                                        </span>
                                        <p className="font-barlow text-[26px] font-bold text-[#F97316]">
                                            {card.stats.streak}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom divider */}
                    <div className="flex w-full items-center justify-center gap-2 md:gap-5 xl:px-40">
                        <div className="hidden h-px flex-1 bg-inactive sm:block" />

                        <div className="flex shrink-0 items-center gap-3">
                            <div className="grid h-full w-fit place-items-center p-1">
                                <Crown />
                            </div>
                            <h5 className="whitespace-nowrap font-inter text-[11px] font-medium tracking-[3px] text-inactive">
                                Great Players. Bigger Dreams.
                            </h5>
                            <div className="grid h-full w-8 place-items-center p-2 sm:w-fit">
                                <Crown />
                            </div>
                        </div>

                        <div className="hidden h-px flex-1 bg-inactive sm:block" />
                    </div>
                </div>
            </Container>

            {/* ------------------- Find your next challenge ------------------- */}
            <Container id="challenge" childContainerStyle="gap-7.5">
                <div className="flex w-full flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <Header
                        spanText1="FIND YOUR NEXT "
                        spanText2="challenge"
                        para="Discover and join upcoming events near you."
                    />
                    {/**------------------Search Bar----------------------- */}
                    <label className="flex w-full items-center gap-3 rounded-lg bg-[#FFFFFF0D] px-4 py-3 transition-colors focus-within:bg-[#FFFFFF14] sm:max-w-[320px]">
                        <Search className="size-4 shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by location, club, or name..."
                            aria-label="Search by location, club, or name"
                            className="min-w-0 flex-1 bg-transparent font-inter text-sm text-[#F4F6F1] outline-none placeholder:text-inactive placeholder:text-sm placeholder:font-inter"
                        />
                    </label>
                </div>
                {/** ----------- Filtering buttons ---------------- */}
                <div className="w-full h-auto flex items-center justify-between">

                    <div className="w-full h-full flex items-center gap-3 ">
                        {filterList.map((f, index) => {
                            const isActive = filterButton === index;
                            return (
                                <button
                                    key={f}
                                    type="button"
                                    onClick={() => setFilterButton(index)}
                                    className={`cursor-pointer font-inter text-sm flex items-center gap-2.5 py-2.5 px-5 rounded-md ${isActive
                                        ? "bg-buttons text-black"
                                        : "bg-[#FFFFFF0D] text-inactive border border-[#1E3028]"
                                        }`}
                                >
                                    <span>{f}</span>
                                    <DownArrow
                                        className={`transition-transform duration-500 ease-in-out ${isActive ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    <label htmlFor="sortingButtons" className="text-inactive font-inter text-sm flex whitespace-nowrap items-center gap-2">Sort by:
                        <button
                            type="button"
                            id="sortingButtons"
                            className="cursor-pointer flex items-center gap-2.5 py-2.5 px-5 rounded-md bg-[#FFFFFF0D] text-white border border-[#1E3028] font-inter text-sm font-semibold">
                            <span>Low to high entry fee</span>
                            <DownArrow
                                className="transition-transform duration-500 ease-in-out " />
                        </button></label>


                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tournaments.map((t) => (
                        <div
                            key={t.id}
                            className="flex flex-col rounded-2xl overflow-hidden border border-[#31443A]"
                        >
                            <Image
                                src={t.image}
                                alt={t.title}
                                className="w-full h-48 object-cover"
                            />

                            <div className="flex flex-col gap-5 p-5">
                                <div className="flex flex-col gap-3.75">
                                    <h2 className="text-white font-inter font-bold text-xl">{t.title}</h2>
                                    <p className="font-inter text-sm text-inactive">{t.meta}</p>
                                </div>

                                <div className="grid grid-cols-3 divide-x divide-white/10 py-3.75 w-full border border-white/10 rounded-lg">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="font-inter text-xs text-inactive">Entry Fee</span>
                                        <span className="font-inter font-bold text-base text-white">
                                            {t.entryFee}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="font-inter text-xs text-inactive">Prize</span>
                                        <span className="font-inter font-bold text-base text-[#4ADE80]">
                                            {t.prize}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="font-inter text-xs text-inactive">Spots Left</span>
                                        <span className="font-inter font-bold text-base text-white">
                                            {t.spots}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-inter text-xs text-inactive">Last Entry</span>
                                        <span className="font-inter font-bold text-base text-gold">
                                            {t.lastEntry}
                                        </span>
                                    </div>
                                    <Button text="Join Now" bg="bg-buttons" border="border border-[#55E489]" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full h-auto flex items-center justify-center">
                    <Button href="#" text="View All Challenges" textStyle="font-inter font-medium text-md text-white" bg="bg-white/5" border="border-none" padding="px-10 py-3.5" />
                </div>
            </Container>
            {/**----------------- Club Spotlight -------------*/}
            <Container
                id="clubs"
                childContainerStyle="gap-7.5 w-full"
                parentContainerStyle="bg-linear-to-b from-white/5 to-white/0  backdrop-blur-sm"
            >
                {/* Header row: stacks on mobile, side by side on xl */}
                <div className="flex w-full flex-col gap-4 sm:gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <Header
                        spanText1="club "
                        spanText2="spotlight"
                        para="Featured clubs. Find your next place to play."
                    />
                    <Button
                        href="#"
                        text="View All Clubs"
                        textStyle="font-inter font-medium text-md text-white"
                        bg="bg-white/5"
                        border="border-none"
                        padding="px-10 py-3.5"
                    />
                </div>

                {/* Grid: fills the container and adapts at every width */}
                <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4 sm:gap-6">
                    {[0, 1, 2].map((item) => (
                        <div
                            key={item}
                            className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#31443A]"
                        >
                            {/* Image */}
                            <Image
                                src={ClubImage}
                                alt="Club image"
                                className="h-40 w-full object-cover sm:h-48"
                            />

                            <div className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-5">
                                {/* Heading with logo */}
                                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4 sm:pb-5">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="size-10 shrink-0 overflow-hidden rounded-full">
                                            <Image
                                                src={Logo}
                                                alt="Club logo"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex min-w-0 flex-col">
                                            <h2 className="truncate font-inter text-lg font-bold text-white sm:text-xl">
                                                The Cue Longue
                                            </h2>
                                            <p className="truncate font-inter text-sm text-inactive">
                                                Mumbai, India
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid shrink-0 place-items-center rounded-sm bg-gold px-[7px] py-[6px] font-inter text-xs font-semibold text-black">
                                        4.9/5
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex flex-col gap-3.75">
                                    {spotlightTableContent.map((row, index) => (
                                        <div
                                            key={row.text}
                                            className="flex items-center justify-between gap-3"
                                        >
                                            <span className="font-inter text-xs text-inactive">
                                                {row.text}
                                            </span>
                                            <span
                                                className={`font-inter text-base font-bold ${index === 3 ? "text-[#4ADE80]" : "text-white"
                                                    }`}
                                            >
                                                {row.number}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    text="Join Now"
                                    bg="bg-buttons w-full h-auto"
                                    padding="py-5.5"
                                    border="border border-[#55E489]"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex h-auto w-full items-center justify-center">
                    <Button
                        href="#"
                        text="View All Clubs"
                        textStyle="font-inter font-medium text-md text-white"
                        bg="bg-white/5"
                        border="border-none"
                        padding="px-10 py-3.5"
                    />
                </div>
            </Container>

            <Container
                childContainerStyle="gap-7.5 w-full"
                parentContainerStyle="bg-linear-to-b from-white/5 to-white/0 backdrop-blur-sm"
            >
                <Header
                    spanText1="recent "
                    spanText2="winners"
                    para="Relive the best moments, celebrate the champions, and see who conquered the table."
                    maxWidth=" "
                />

                <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-4 sm:gap-6 lg:gap-7.5">
                    {[0, 1, 2].map((item) => (
                        <div
                            key={item}
                            className="flex min-w-0 flex-col overflow-hidden rounded-2xl bg-[#19231F]"
                        >
                            <div className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-5">
                                {/* Title */}
                                <div className="flex flex-col gap-3 sm:gap-5">
                                    <h2 className="font-inter text-lg font-bold text-white sm:text-xl">
                                        Chennai Championship
                                    </h2>
                                    <p className="font-inter text-sm text-inactive">
                                        Royal Cue, Chennai · Oct 10, 2026
                                    </p>
                                </div>

                                {/* Winner */}
                                <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-4 sm:pt-5">
                                    <div className="relative size-15 shrink-0 overflow-hidden rounded-full">
                                        <Image
                                            src={WinnerPhoto}
                                            alt="Winner Rajesh Kumar"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="flex min-w-35 flex-1 flex-col gap-2">
                                        <div className="grid w-fit place-items-center rounded-sm bg-[#4ADE801A] px-2 py-1.5 font-inter text-[10px] font-bold text-green">
                                            WINNER
                                        </div>
                                        <span className="truncate font-inter text-lg font-bold text-white sm:text-xl">
                                            Rajesh Kumar
                                        </span>
                                    </div>

                                    <div className="flex shrink-0 flex-col items-end gap-2 rounded-md bg-white/5 p-2.5 sm:gap-3">
                                        <span className="font-inter text-xs text-inactive">Total Prize</span>
                                        <span className="font-inter text-lg font-bold text-gold">₹20k</span>
                                    </div>
                                </div>

                                {/* Runner up */}
                                <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-4 sm:pt-5">
                                    <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
                                        <Image
                                            src={RunnerUpPhoto}
                                            alt="Runner up Rajesh Kumar"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="flex min-w-30 flex-1 flex-col gap-2">
                                        <span className="font-inter text-[10px] font-bold text-inactive">
                                            RUNNER UP
                                        </span>
                                        <span className="truncate font-inter text-base font-bold text-white">
                                            Rajesh Kumar
                                        </span>
                                    </div>

                                    <div className="flex shrink-0 flex-col items-end gap-2 sm:gap-3">
                                        <span className="font-inter text-xs text-inactive">Total Prize</span>
                                        <span className="font-inter text-lg font-bold text-white">₹10k</span>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="#"
                                className="flex items-center justify-end bg-white/5 p-4 font-inter text-base font-bold text-green sm:p-5"
                            >
                                View Results
                            </a>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}