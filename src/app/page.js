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
import HighestBreakBg from "../../public/highestBreakBG.png"
import RegisterImg from "../../public/RegisterImg.png"
import JoinTournamentImg from '../../public/JoinTournamentImg.png'
import PayAndCofirmImg from "../../public/PayAndConfirmImg.png";
import PlayTrackImg from "../../public/PlayTrackImg.png";
import SnookerImg from '../../public/snooker.png'

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

const balls = [{ colors: "bg-[#FDD426]", scores: "2" },
{ colors: "bg-[#028748]", scores: "3" },
{ colors: "bg-[#905118]", scores: "4" },
{ colors: "bg-[#005CC4]", scores: "5" },
{ colors: "bg-[#F24793]", scores: "6" },
{ colors: "bg-[#000000]", scores: "7" },
// { colors: "bg-red-700", scores: "1" }
];

const leaderboard = [
    { rank: 4, name: "Mark Wilson", country: "GBR", club: "The Playhouse Club, Delhi", tournament: "Delhi Open 2025", date: "14 Jun 2025", highestBreak: 124 },
    { rank: 5, name: "Liam O’Connor", country: "IRL", club: "Eagle Snooker Club, Pune", tournament: "Pune Championship 2025", date: "28 May 2025", highestBreak: 120 },
    { rank: 6, name: "Vikram Singh", country: "IND", club: "Royal Billiards Club, Mumbai", tournament: "Mumbai Masters 2025", date: "16 May 2025", highestBreak: 118 },
    { rank: 7, name: "Chen Wei", country: "CHN", club: "The Curve Club, Jaipur", tournament: "Jaipur Classic 2025", date: "02 May 2025", highestBreak: 116 },
    { rank: 8, name: "James Thompson", country: "GBR", club: "Calcutta Club, Kolkata", tournament: "Kolkata Open 2025", date: "18 Apr 2025", highestBreak: 113 },
];
const leaderBoardScrollerItems = [{ icon: <DownArrow className="rotate-90 text-white" />, styling: "bg-[#31443A] " },
{ icon: "1", styling: "bg-[#19231F] text-inactive font-inter text-md " },
{ icon: "2", styling: "bg-[#19231F] text-inactive font-inter text-md " },
{ icon: "3", styling: "bg-[#19231F] text-inactive font-inter text-md " },
{ icon: "4", styling: "bg-[#19231F] text-inactive font-inter text-md " },
{ icon: "5", styling: "bg-[#19231F] text-inactive font-inter text-md " },
{ icon: <DownArrow className="-rotate-90 text-white" />, styling: "bg-[#31443A] " }
]
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
        entryFee: "₹20",
        prize: "₹800",
        spots: "24/32",
        lastEntry: "3d 12h 50m",
    },
    {
        id: 2,
        image: SportImg,
        title: "Mumbai Open",
        meta: "Mumbai · Cue Masters · Nov 02, 2026",
        entryFee: "₹30",
        prize: "₹1,200",
        spots: "10/32",
        lastEntry: "6d 4h 20m",
    },
    {
        id: 3,
        image: SportImg,
        title: "Delhi Grand Slam",
        meta: "Delhi · Black Ball Club · Nov 15, 2026",
        entryFee: "₹25",
        prize: "₹1,000",
        spots: "2/16",
        lastEntry: "1d 8h 05m",
    },
];
const podium = [
    {
        rank: 1,
        card: "border-[#A47E14] bg-[linear-gradient(180deg,#2A1F00_0%,#1A2A1A_50%,#0D1A10_100%)]",
        badge: "bg-[#FAC738] text-[#0D1A10]",
        avatar: "border-gold",
        info: "gap-1 md:gap-3.75",
    },
    {
        rank: 2,
        card: "h-fit border-[#8A9DA8] bg-[linear-gradient(180deg,#1A1F22_0%,#101618_100%)]",
        badge: "bg-[#8A9DA8] text-[#0D1A10]",
        avatar: "border-[#8A9DA8]",
        info: "gap-0.5 md:gap-3.75",
    },
    {
        rank: 3,
        card: "h-fit border-[#A0522D] bg-[linear-gradient(180deg,#221508_0%,#1A1510_100%)]",
        badge: "bg-[#A0522D] text-white",
        avatar: "border-[#A0522D]",
        info: "gap-0.5 md:gap-3.75",
    },
];
const steps = [
    { title: "Register", desc: "Sign up with your mobile number and complete your profile. It only takes a minute.", image: RegisterImg },
    { title: "Find & Join Tournaments", desc: "Browse upcoming tournaments, filter by location, club, age group or entry fee. Choose your match and join.", image: JoinTournamentImg },
    { title: "Pay & Confirm", desc: "Complete your payment securely online. Your entry is confirmed instantly.", image: PayAndCofirmImg },
    { title: "Play, Track & Climb", desc: "Get your fixtures, track live scores, see your stats and climb the rankings. Be part of the community.", image: PlayTrackImg },
];
const FAQs = [{ quesions: "What is CueRank?", replies: "CueRank is a platform for discovering snooker tournaments, following live matches, tracking player rankings, and connecting with clubs and players." },
{ quesions: "How do I register as a player?", replies: "CueRank is a platform for discovering snooker tournaments, following live matches, tracking player rankings, and connecting with clubs and players." },
{ quesions: "How can I join a tournament?", replies: "CueRank is a platform for discovering snooker tournaments, following live matches, tracking player rankings, and connecting with clubs and players." },
{ quesions: "How do tournament entry fees and prizes work?", replies: "CueRank is a platform for discovering snooker tournaments, following live matches, tracking player rankings, and connecting with clubs and players." },
{ quesions: "How are player rankings calculated?", replies: "CueRank is a platform for discovering snooker tournaments, following live matches, tracking player rankings, and connecting with clubs and players." },
{ quesions: "Can I register my snooker club on CueRank?", replies: "CueRank is a platform for discovering snooker tournaments, following live matches, tracking player rankings, and connecting with clubs and players." },
{ quesions: "How can I view live scores and match results?", replies: "CueRank is a platform for discovering snooker tournaments, following live matches, tracking player rankings, and connecting with clubs and players." },

];
const spotlightTableContent = [{ text: "Tables", number: 12 }, { text: "Active Tournaments", number: 3 }, { text: "Tournaments Hosted", number: 142 }, { text: "Prize Distributed", number: "₹45000" }, { text: "Total Players", number: 1240 }]
const GENDERS = ["male", "female"];
const AGES = ["Overall", "Under 16", "Under 21", "Open", "40+"];

/* ------------------------------------------------------------------ */
/*                           Page                                                                */
/* ------------------------------------------------------------------ */
export default function Home() {
    const [gender, setGender] = useState("male");
    const [age, setAge] = useState("Overall");
    const [faqs, setFaqs] = useState(0);

    return (

        <div
            className="relative isolate h-auto w-full bg-[#0D1A14]"
            style={{
                backgroundImage: `
            radial-gradient(ellipse 45% 12% at 0% 4%, rgba(42,58,51,0.9) 0%, transparent 100%),
            radial-gradient(ellipse 35% 10% at 45% 31%, #0E1516 0%, transparent 100%),
            radial-gradient(ellipse 50% 14% at 62% 62%, #0F3D2B 0%, transparent 100%),
            radial-gradient(ellipse 45% 12% at 80% 90%, rgba(28,58,46,0.95) 0%, transparent 100%),
            linear-gradient(180deg, #0C2A1D 0%, #0D1F18 20%, #0D1A16 35%, #0C2519 55%, #0D3023 68%, #0D1F18 85%, #0C1A14 100%)
        `,
            }}
        >


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
                    className="-z-10 w-full h-auto aspect-auto"
                />

                <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start gap-4 px-5 pt-32 pb-16 sm:gap-8 sm:px-8 sm:pt-40 sm:pb-20 lg:pt-52 lg:pb-28 xl:gap-[51px] xl:px-0 xl:pt-64.5 xl:pb-35">
                    <p className="font-inter text-sm font-medium leading-none tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.5em] text-[#DBC28B] sm:text-base xl:text-lg">
                        THE TABLE IS WAITING
                    </p>

                    <h1 className="font-barlow text-4xl font-semibold leading-[0.98] tracking-[-0.007em] text-active sm:text-5xl md:text-7xl xl:text-[90px] xl:[text-box:trim-both_cap_alphabetic]">
                        <span className="block">Your next shot.</span>
                        <span className="block">Your next rank.</span>
                    </h1>

                    <Paragraph
                        text={HeroPara}
                        textSize=" text-sm md:text-base leading-[1.65] sm:text-lg xl:text-[22px]  lg:whitespace-pre-line xl:[text-box:trim-both_cap_alphabetic] w-auto  max-w-[150px] max-w-[400px] lg:max-w-[609px]"
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
                className="flex w-full items-center justify-center px-4 pt-10 xl:pt-15"
            >
                <div className="w-full max-w-[1200px] rounded-full bg-[#10171566] px-4 py-2 backdrop-blur-[10px] sm:px-8 md:py-7.5 xl:px-37.5">
                    <div className="grid w-full grid-cols-3">
                        {stats.map((s, i) => (
                            <div
                                key={s.label}
                                className={`flex flex-col items-center justify-center gap-0 text-center sm:gap-5 ${i > 0 ? "border-l border-inactive/10" : ""
                                    }`}
                            >
                                <p className="font-barlow text-lg font-semibold text-active sm:text-xl md:text-2xl xl:text-3xl">
                                    {s.value}
                                </p>
                                <p className="px-4 font-inter text-[10px] font-medium text-inactive sm:text-xs xl:text-sm">
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
                        className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5"
                    >
                        {WinnerCardDetails.map((card, index) => (
                            <div
                                key={card.name}
                                className="overflow-hidden rounded-xl border"
                                style={{ borderColor: card.primaryColor, background: card.corouselBg }}
                            >
                                {/* Card heading */}
                                <div
                                    className="flex items-center gap-2.5 whitespace-nowrap px-3 py-1.5 sm:gap-3.5 sm:px-5 sm:py-2.5"
                                    style={{ background: card.headingBg }}
                                >
                                    <div
                                        className="flex size-6 items-center justify-center rounded-md font-barlow text-sm font-bold text-black sm:size-8 sm:text-lg"
                                        style={{ backgroundColor: card.primaryColor }}
                                    >
                                        {index + 1}
                                    </div>
                                    <div className="flex size-4 items-center justify-center sm:size-5">
                                        <Crown stroke={card.primaryColor} />
                                    </div>
                                    <h2
                                        className="whitespace-nowrap font-inter text-[10px] font-semibold tracking-[1.5px] sm:text-[11px]"
                                        style={{ color: card.primaryColor }}
                                    >
                                        {card.header.toUpperCase()}
                                    </h2>
                                </div>

                                {/* ================= MOBILE ONLY (hidden from sm and up) ================= */}
                                <div className="sm:hidden">
                                    {/* Player: avatar left, name + button right */}
                                    <div className="flex flex-row items-center gap-3 px-3 py-3">
                                        <div
                                            className="size-12 shrink-0 overflow-hidden rounded-full border"
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

                                        <div className="flex min-w-0 flex-1 flex-row items-center justify-between gap-2">
                                            <h4 className="truncate font-inter text-base font-bold text-active">
                                                {card.name}
                                            </h4>

                                            <button
                                                type="button"
                                                className="flex w-fit shrink-0 items-center gap-1 rounded-full border px-3 py-1 text-xs"
                                                style={{
                                                    backgroundColor: card.buttonBg,
                                                    borderColor: card.primaryColor,
                                                    color: card.primaryColor,
                                                }}
                                            >
                                                <Star stroke={card.primaryColor} /> Open 16
                                            </button>
                                        </div>
                                    </div>

                                    {/* Win % and Streak right under the player on mobile */}
                                    <div className="grid grid-cols-2 border-t border-inactive py-2.5">
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="flex items-center justify-center gap-1 whitespace-nowrap font-inter text-[10px] text-inactive">
                                                <Win /> Win %
                                            </span>
                                            <p className="font-barlow text-lg font-bold leading-tight text-[#4ADE80]">
                                                {card.stats.winRate}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-center justify-center border-l border-inactive">
                                            <span className="flex items-center justify-center gap-1 whitespace-nowrap font-inter text-[10px] text-inactive">
                                                <Streak /> Win Streak
                                            </span>
                                            <p className="font-barlow text-lg font-bold leading-tight text-[#F97316]">
                                                {card.stats.streak}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* ================= TABLET / DESKTOP ONLY (hidden on mobile) ================= */}
                                <div className="hidden flex-col items-center justify-center gap-3 p-4 sm:flex md:gap-4">
                                    <div
                                        className="size-16 overflow-hidden rounded-full border md:size-20"
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

                                    <h4 className="font-inter text-lg font-bold text-active md:text-xl">
                                        {card.name}
                                    </h4>

                                    <button
                                        type="button"
                                        className="flex w-fit items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm"
                                        style={{
                                            backgroundColor: card.buttonBg,
                                            borderColor: card.primaryColor,
                                            color: card.primaryColor,
                                        }}
                                    >
                                        <Star stroke={card.primaryColor} /> Open 16
                                    </button>
                                </div>

                                {/* Stats row 1 (shared by mobile and desktop) */}
                                <div className="grid grid-cols-3 border-t border-inactive py-2.5 sm:py-4">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="flex items-center justify-center gap-1 whitespace-nowrap font-inter text-[10px] text-inactive sm:gap-1.5 sm:text-[11px]">
                                            <Person /> Clubs played
                                        </span>
                                        <p className="font-barlow text-lg font-bold leading-tight text-active sm:text-2xl">
                                            {card.stats.clubs}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center border-l border-inactive">
                                        <span className="flex items-center justify-center gap-1 whitespace-nowrap font-inter text-[10px] text-inactive sm:gap-1.5 sm:text-[11px]">
                                            <Trophy /> Tournaments
                                        </span>
                                        <p className="font-barlow text-lg font-bold leading-tight text-active sm:text-2xl">
                                            {card.stats.tournaments}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center border-l border-inactive">
                                        <span className="flex items-center justify-center gap-1 whitespace-nowrap font-inter text-[10px] text-inactive sm:gap-1.5 sm:text-[11px]">
                                            <Target /> Targets
                                        </span>
                                        <p className="font-barlow text-lg font-bold leading-tight text-active sm:text-2xl">
                                            {card.stats.targets}
                                        </p>
                                    </div>
                                </div>

                                {/* Stats row 2: DESKTOP ONLY (on mobile this is already shown under the player) */}
                                <div className="hidden grid-cols-2 border-t border-inactive py-4 sm:grid">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap font-inter text-[11px] text-inactive">
                                            <Win /> Win %
                                        </span>
                                        <p className="font-barlow text-2xl font-bold leading-tight text-[#4ADE80]">
                                            {card.stats.winRate}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center border-l border-inactive">
                                        <span className="flex items-center justify-center gap-1.5 whitespace-nowrap font-inter text-[11px] text-inactive">
                                            <Streak /> Win Streak
                                        </span>
                                        <p className="font-barlow text-2xl font-bold leading-tight text-[#F97316]">
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
                            className="min-w-0 flex-1 bg-transparent font-inter text-sm text-active outline-none placeholder:text-inactive placeholder:text-sm placeholder:font-inter"
                        />
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {tournaments.map((t) => (
                        <div
                            key={t.id}
                            className="flex group/card flex-col rounded-2xl overflow-hidden border border-[#31443A] "
                        >
                            <Image
                                src={t.image}
                                alt={t.title}
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover/card:scale-105"
                            />

                            <div className="flex flex-col gap-2 sm:gap-3 md:gap-5 p-5">
                                <div className="flex flex-col gap-0 sm:gap-3 md:gap-3.75">
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
                    {/* <Button
                        href="#"
                        text="View All Clubs"
                        textStyle="font-inter font-medium text-md text-white"
                        bg="bg-white/5"
                        border="border-none"
                        padding="px-10 py-3.5"
                    /> */}
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

                            <div className="flex flex-col gap-2 p-4 sm:gap-5 sm:p-5">
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
                                <div className="flex flex-col gap-1 sm:gap-2 md:gap-3.75">
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
                                    text="Visit Clubs"
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


            {/**------------------Winner Section------------------- */}
            <Container
                childContainerStyle="gap-7.5 w-full"
                parentContainerStyle="bg-white/3 backdrop-blur-sm"
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
                            <div className="flex flex-col gap-2 p-4 sm:gap-5 sm:p-5">
                                {/* Title */}
                                <div className="flex flex-col gap-1 sm:gap-5">
                                    <h2 className="font-inter text-base font-bold text-white sm:text-xl">
                                        Chennai Championship
                                    </h2>
                                    <p className="font-inter text-xs sm:text-sm text-inactive">
                                        Royal Cue, Chennai · Oct 10, 2026
                                    </p>
                                </div>

                                {/* Winner */}
                                <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-2 sm:pt-5">
                                    <div className="relative size-12 sm:size-15 shrink-0 overflow-hidden rounded-full">
                                        <Image
                                            src={WinnerPhoto}
                                            alt="Winner Rajesh Kumar"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="flex min-w-35 flex-1 flex-col gap-1 sm:gap-2">
                                        <div className="grid w-fit place-items-center rounded-sm bg-[#4ADE801A] px-2 py-1 sm:py-1.5 font-inter text-[10px] font-bold text-green">
                                            WINNER
                                        </div>
                                        <span className="truncate font-inter text-lg font-bold text-white sm:text-xl">
                                            Rajesh Kumar
                                        </span>
                                    </div>

                                    <div className="flex shrink-0 flex-col items-end gap-0 sm:gap-2 rounded-md bg-white/5 p-2.5 sm:gap-3">
                                        <span className="font-inter text-[10px] sm:text-xs text-inactive">Total Prize</span>
                                        <span className="font-inter text-base sm:text-lg font-bold text-gold">₹20k</span>
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

                                    <div className="flex min-w-30 flex-1 flex-col gap-1 sm:gap-2">
                                        <div className="grid w-fit place-items-center rounded-sm bg-[#d7cb9a1a] px-2 py-1 sm:py-1.5 font-inter text-[10px] font-bold text-inactive">
                                            Runner Up
                                        </div>
                                        {/* <span className="font-inter text-[10px] font-bold text-inactive text-[#8A9DA8]">
                                            RUNNER UP#8A9DA81A
                                        </span> */}
                                        <span className="truncate font-inter text-base font-bold text-white">
                                            Rajesh Kumar
                                        </span>
                                    </div>

                                    <div className="flex shrink-0 flex-col items-end gap-0 sm:gap-2 rounded-md sm:gap-3">
                                        <span className="font-inter text-xs text-inactive">Total Prize</span>
                                        <span className="font-inter text-md sm:text-lg font-bold text-white">₹10k</span>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="#"
                                className="flex items-center justify-end bg-white/5 p-2 font-inter text-sm sm:text-base font-bold text-green sm:p-5"
                            >
                                View Results
                            </a>
                        </div>
                    ))}
                </div>
            </Container>

            {/**---------------------Highest Break-------------------- */}
            <Container
                childContainerStyle="gap-7.5 w-full"
                parentContainerStyle="relative"
            >
                {/**--------Background image--------------*/}
                <Image src={HighestBreakBg} alt="Highest break background img" className=" absolute top-0 left-0 w-full h-full -z-10  pointer-events-none" />
                <Header
                    spanText1="highest"
                    spanText2=" breaks"
                    para="Big scores. Bigger moments. The best breaks in snooker."
                    maxWidth=" "
                />
                {/**------------------Rank Cards--------------- */}
                <div className="grid w-full gap-x-4 gap-y-8 sm:gap-x-5 grid-cols-1 md:grid-cols-3">
                    {podium.map((p, index) => (
                        <div
                            key={index}
                            className={`relative flex w-full flex-col items-start rounded-2xl border ${p.card}`}
                        >
                            {/* Rank badge on the top border */}
                            <div
                                className={`absolute left-5 top-0 z-10 flex -translate-y-1/2 items-center gap-2 rounded-full px-4 py-0.75 font-barlow text-sm font-bold sm:gap-2.5 sm:px-5 sm:text-base ${p.badge}`}
                            >
                                <Trophy stroke="currentColor" />
                                {p.rank}
                            </div>

                            <div className={`flex w-full items-center gap-5 p-3 pt-6 md:p-5 md:pt-7.5`}>
                                <div
                                    className={`relative size-12 shrink-0 overflow-hidden rounded-full border-2 sm:size-15 ${p.avatar}`}
                                >
                                    <Image
                                        src={WinnerPhoto}
                                        alt={`Rank ${p.rank} Rajesh Kumar`}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className={`flex min-w-0 flex-1 flex-col ${p.info}`}>
                                    <span className="truncate font-inter text-base font-bold text-white lg:text-xl">
                                        Rajesh Kumar
                                    </span>
                                    <p className="truncate font-inter text-xs text-inactive sm:text-sm">
                                        The cue club Jaipur
                                    </p>
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        {balls.map((b) => (
                                            <div
                                                key={b.colors}
                                                className={`flex size-6 items-center justify-center rounded-full font-barlow text-xs font-semibold tracking-wide text-active sm:size-7.5 sm:text-base sm:tracking-[2px] ${b.colors}`}
                                            >
                                                {b.scores}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full items-center justify-between border-t border-white/10 p-4 pt-2 sm:pt-5 sm:p-5">
                                <span className="font-inter text-sm font-medium text-inactive sm:text-base">
                                    Highest Break
                                </span>
                                <span className="font-barlow text-xl font-bold text-active sm:text-3xl">
                                    142
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                {/**-------------- LeaderShip board--------------- */}
                <div className="w-full overflow-hidden rounded-2xl border border-[#31443A] bg-[#19231F]">
                    {/* scrolls sideways on small screens instead of squashing the columns */}
                    <div className="snooker-scroll overflow-x-auto">
                        <div className="min-w-[860px] px-5 sm:px-8">
                            {/* Header */}
                            <div className="grid grid-cols-[40px_1.6fr_0.8fr_2fr_1.8fr_1.2fr_minmax(120px,1fr)] items-center gap-4 border-b
       border-white/5 py-6 font-inter text-xs font-medium uppercase tracking-wide whitespace-nowrap text-inactive md:py-10">
                                <span>#</span>
                                <span>Player</span>
                                <span>Country</span>
                                <span>Club</span>
                                <span>Tournament</span>
                                <span>Date</span>
                                <span className="text-right">Highest Break</span>
                            </div>

                            {/* Rows */}
                            {leaderboard.map((row) => (
                                <div
                                    key={row.rank}
                                    className="grid grid-cols-[40px_1.6fr_0.8fr_2fr_1.8fr_1.2fr_minmax(120px,1fr)] items-center gap-4 border-b border-white/5 py-2 font-inter text-sm last:border-b-0 sm:py-6 sm:text-base"
                                >
                                    <span className="text-inactive">{row.rank}</span>
                                    <span className="truncate font-semibold text-white">{row.name}</span>
                                    <span className="text-inactive">{row.country}</span>
                                    <span className="truncate text-active">{row.club}</span>
                                    <span className="truncate text-active">{row.tournament}</span>
                                    <span className="text-inactive">{row.date}</span>
                                    <span className="text-right font-barlow text-2xl font-semibold text-active sm:text-3xl">
                                        {row.highestBreak}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/**-------------------- Scroller -------------------- */}
                <div className="w-full flex items-center justify-center gap-2.5">
                    {leaderBoardScrollerItems.map((i, index) => <div key={index} className={`rounded-full cursor-pointer size-7.5 ${i.styling} grid place-items-center`}>{i.icon}</div>)}
                </div>
            </Container>

            {/** ------------------- Steps of Registering------------------- */}
            <Container childContainerStyle="gap-7.5">
                <Header spanText1="get started in " spanText2="4 simple steps" para="From registration to rankings it's easy to be part of the CueRank community. Play, compete and grow." maxWidth="" />
                <div className="mt-4 flex w-full flex-col">
                    {steps.map((s, i) => (
                        <div key={s.title} className="flex items-stretch gap-4 sm:gap-10">
                            {/* Circle column: stretches to the row height, circle centered with dashed segments above and below */}
                            <div className="flex shrink-0 flex-col items-center self-stretch">
                                <div
                                    className={`w-px flex-1 border-l border-dashed border-gold ${i === 0 ? "invisible" : ""
                                        }`}
                                />
                                <div className="z-10 grid size-12 shrink-0 place-items-center rounded-full border border-gold bg-transparent font-barlow text-md font-semibold text-gold backdrop-blur-lg sm:size-16 md:size-20 sm:text-xl">
                                    <div className="flex h-full w-full flex-col items-center justify-center">
                                        <div className="leading-[98%] tracking-[-0.03em]">0{i + 1}</div>
                                        <div className="font-inter text-[8px] font-medium uppercase sm:text-xs">
                                            steps
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`w-px flex-1 border-l border-dashed border-gold ${i === steps.length - 1 ? "invisible" : ""
                                        }`}
                                />
                            </div>

                            {/* Image + card*/}
                            <div className="flex min-w-0 flex-1 items-start gap-2 md:gap-4 py-3 sm:py-5 flex-row md:items-center md:gap-10 md:py-8">
                                <Image
                                    src={s.image}
                                    alt={s.title}
                                    className="size-18 hidden sm:block shrink-0 object-cover sm:size-30 md:size-40"
                                />

                                <div className="flex w-full max-w-[533px] flex-col justify-center gap-1 sm:gap-2 md:gap-3 rounded-xl bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_100%)] p-5 backdrop-blur-md sm:p-7.5 md:w-auto md:flex-1">
                                    <h3 className="font-barlow text-md font-semibold leading-[0.98] tracking-[-0.007em] text-active sm:text-lg md:text-[22px]">
                                        {s.title}
                                    </h3>
                                    <p className="md:overflow-visible md:text-clip md:whitespace-normal font-inter text-[10px] text-inactive sm:text-sm">
                                        {s.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>

            {/** ---------------FAQs---------------------- */}
            <Container childContainerStyle="gap-7.5">
                <Header
                    spanText1="everything you "
                    spanText2="need to know"
                    para="Quick answers to help you get started with CueRank."
                    maxWidth=""
                />

                <div className="flex w-full flex-col gap-4 sm:gap-5">
                    {FAQs.map((f, index) => {
                        const isOpen = faqs === index;

                        return (
                            <div
                                key={index}
                                onClick={() => setFaqs(isOpen ? null : index)}
                                className={` cursor-pointer w-full rounded-xl border bg-[linear-gradient(90deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.04)_100%)] p-2 px-4 sm:p-4  md:px-5 md:p-5 backdrop-blur-md transition-all duration-300 ease-in-out sm:p-7.5 ${isOpen
                                    ? "border-[#4ADE8080] shadow-[0_0_24px_rgba(74,222,128,0.12)]"
                                    : "border-[#FFFFFF1A] hover:border-[#4ADE8040] hover:bg-white/[0.02]"
                                    }`}
                            >
                                {/* Question */}
                                <button
                                    type="button"
                                    aria-expanded={isOpen}

                                    className="group flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                                >
                                    <span
                                        className={`font-barlow font-semibold leading-[98%] tracking-[-0.007em] transition-colors duration-300 text-base sm:text-lg md:text-[22px] text-active group-hover:text-white`}
                                    >
                                        {f.quesions}
                                    </span>

                                    <span className="grid size-6 shrink-0 place-items-center text-active">
                                        <DownArrow
                                            className={`transition-transform duration-300 ease-in-out ${isOpen ? "-rotate-180" : ""
                                                }`}
                                        />
                                    </span>
                                </button>

                                {/* Answer: animates height from 0 to content height */}
                                <div
                                    aria-hidden={!isOpen}
                                    className={`grid transition-[grid-template-rows,opacity] duration-300 cursor-text ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="pt-2 sm:pt-4 md:pt-5 font-inter text-sm font-medium text-inactive sm:text-base leading-[22px]">
                                            {f.replies}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>

            {/** -----Find your club---------- */}

            <Container
                parentContainerStyle="relative isolate flex w-full items-center overflow-hidden"
            >
                <Image
                    src={SnookerImg}
                    alt="Snooker Player"
                    className="absolute inset-0 -z-50 object-cover md:h-auto md:w-full shadow-black"
                    priority
                    sizes="100vw"
                />

                <div className="relative z-10 flex w-full max-w-[699px] flex-col gap-[clamp(1.25rem,3vw,2.5rem)] rounded-2xl border border-[#1B2824B2] bg-[#1017154a] p-[clamp(1.25rem,4vw,3.75rem)] backdrop-blur-md sm:rounded-[20px]">
                    <div>
                        <h1 className="font-barlow text-[clamp(1.75rem,7vw,3.75rem)] leading-[98%] tracking-[-0.007em] text-gold">
                            Find Your Club,
                        </h1>

                        <h2 className="font-barlow text-[clamp(2.25rem,9.5vw,5rem)] font-semibold leading-[98%] tracking-[-0.007em] text-active">
                            Join the Action
                        </h2>
                    </div>

                    <Paragraph
                        text="Connect with top clubs, take part in tournaments, and be part of a growing snooker community."
                        textSize="text-[clamp(0.875rem,2.4vw,1.375rem)] leading-[165%]"
                    />

                    <Button
                        text="Explore Clubs"
                        padding="px-8 py-3 sm:px-12 sm:py-3.5 md:px-15"
                        bg="bg-buttons"
                        textStyle="font-inter font-semibold text-base sm:text-lg text-black"
                    />
                </div>
            </Container>

        </div>
    );
}