"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../public/Cue-logo 1.png";
import Button from "./Button";
import { Person } from "@/svg";

const navItems = [
  { item: "Home", path: "/" },
  { item: "Tournaments", path: "#" },
  { item: "Rankings", path: "#" },
  { item: "Clubs", path: "#" },
  { item: "Players", path: "#" },
];

const profileMenu = [
  { label: "Profile", path: "/profile" },
  { label: "My tournaments", path: "/my-tournaments" },
  { label: "Settings", path: "/settings" },
];

const languages = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिं" },
];

const NavBar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const [profileOpen, setProfileOpen] = useState(false); // profile dropdown
  const [lang, setLang] = useState("en");
  const profileRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setProfileOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    // TODO: put your real logout logic here
    console.log("logout");
  };

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-6 sm:px-4 xl:top-10">
      <div className="relative mx-auto w-full max-w-[1200px]">
        <nav className="flex h-[clamp(56px,4.5vw,77px)] w-full items-center justify-between gap-2 rounded-full border border-[#1B2824B2] bg-[#10171566] py-2 pl-4 pr-2 backdrop-blur-2xl sm:gap-3 sm:pl-6 lg:gap-6 lg:pl-10">
          {/* Logo */}
          <Link
            href="/"
            className="w-[70px] shrink-0 min-[380px]:w-[80px] sm:w-[100px] md:w-[131px]"
          >
            <Image
              src={Logo}
              alt="Cue logo"
              priority
              className="h-auto w-full object-contain"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 lg:flex xl:gap-10">
            {navItems.map((n) => (
              <li key={n.item}>
                <Link
                  href={n.path}
                  className={`font-inter text-base font-medium transition-colors hover:text-white ${
                    pathname === n.path ? "text-white" : "text-inactive"
                  }`}
                >
                  {n.item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-1.5 text-inactive sm:gap-3 xl:gap-4">
            {/* Language toggle: always visible */}
            <div
              role="group"
              aria-label="Language"
              className="flex shrink-0 items-center gap-1 whitespace-nowrap font-inter text-xs font-medium sm:text-sm"
            >
              {languages.map((l, i) => (
                <span key={l.code} className="flex items-center gap-1">
                  {i > 0 && <span className="text-inactive">/</span>}
                  <button
                    type="button"
                    onClick={() => setLang(l.code)}
                    aria-pressed={lang === l.code}
                    className={`cursor-pointer transition-colors ${
                      lang === l.code
                        ? "text-white"
                        : "text-inactive hover:text-white/80"
                    }`}
                  >
                    {l.label}
                  </button>
                </span>
              ))}
            </div>

            {/* Log in / Register: sm and up (inside mobile panel below sm) */}
            <div className="hidden items-center gap-2 sm:flex xl:gap-4">
              <Button
                href="/login"
                text="Log in"
                padding="px-4 py-2.5 xl:px-5"
                textStyle="font-inter text-white font-semibold text-sm"
                border="border-none"
                bg="bg-white/5"
              />
              <Button
                href="/register"
                text="Register"
                padding="px-4 py-2.5 xl:px-5"
                textStyle="font-inter text-black font-semibold text-sm"
                border="border border-[#55E489]"
                bg="bg-buttons"
              />
            </div>

            {/* Profile dropdown */}
            <div ref={profileRef} className="relative">
              <button
                type="button"
                aria-label="Open profile menu"
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((o) => !o)}
                className={`grid size-9 cursor-pointer place-items-center rounded-full border transition-colors sm:size-10 ${
                  profileOpen
                    ? "border-[#55E489] bg-white/10"
                    : "border-[#1B2824B2] bg-white/5 hover:bg-white/10"
                }`}
              >
                <Person />
              </button>

              <div
                role="menu"
                className={`absolute right-0 top-full mt-3 w-56 origin-top-right rounded-2xl border border-[#1B2824B2] bg-[#101715F2] p-2 shadow-xl backdrop-blur-2xl transition-all duration-200 ${
                  profileOpen
                    ? "visible scale-100 opacity-100"
                    : "invisible pointer-events-none scale-95 opacity-0"
                }`}
              >
                {profileMenu.map((m) => (
                  <Link
                    key={m.label}
                    href={m.path}
                    role="menuitem"
                    className="block rounded-xl px-4 py-2.5 font-inter text-sm font-medium text-inactive transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {m.label}
                  </Link>
                ))}
                <div className="my-1 h-px bg-[#1B2824B2]" />
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="block w-full cursor-pointer rounded-xl px-4 py-2.5 text-left font-inter text-sm font-medium text-[#F87171] transition-colors hover:bg-white/5"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Hamburger (below lg) */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="grid size-9 cursor-pointer place-items-center rounded-full bg-white/5 hover:bg-white/10 sm:size-10 lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded bg-white transition-all duration-300 ${
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-white transition-opacity duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded bg-white transition-all duration-300 ${
                    menuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile menu panel */}
        <div
          className={`absolute inset-x-0 top-full mt-2 origin-top rounded-3xl border border-[#1B2824B2] bg-[#101715F2] p-4 backdrop-blur-2xl transition-all duration-300 lg:hidden ${
            menuOpen
              ? "visible scale-100 opacity-100"
              : "invisible pointer-events-none scale-95 opacity-0"
          }`}
        >
          <ul className="flex flex-col">
            {navItems.map((n) => (
              <li key={n.item}>
                <Link
                  href={n.path}
                  className={`block rounded-xl px-4 py-3 font-inter text-base font-medium transition-colors hover:bg-white/5 hover:text-white ${
                    pathname === n.path ? "text-white" : "text-inactive"
                  }`}
                >
                  {n.item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Log in / Register, only needed below sm */}
          <div className="mt-3 flex items-center justify-end gap-2 border-t border-[#1B2824B2] pt-4 sm:hidden">
            <Button
              href="/login"
              text="Log in"
              padding="px-4 py-2.5"
              textStyle="font-inter text-white font-semibold text-sm"
              border="border-none"
              bg="bg-white/5"
            />
            <Button
              href="/register"
              text="Register"
              padding="px-4 py-2.5"
              textStyle="font-inter text-black font-semibold text-sm"
              border="border border-[#55E489]"
              bg="bg-buttons"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;