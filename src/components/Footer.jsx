import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import Button from "./Button";
import CueLogo from "../../public/Cue-logo 1.png";

const discover = [
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
  { label: "FAQ", href: "#" },
];

const details = [
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Refund Policy", href: "#" },
];

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="m10 9 5 3-5 3z" />
  </svg>
);

const WhatsAppSvg = () => (
  <svg width="22" height="22" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="whatsapp_mask" fill="white">
      <path d="M9.12857 17.7429C14.0143 17.7429 18 13.7571 18 8.87143C18 3.98571 14.0143 0 9.12857 0C4.24286 0 0.257143 3.98571 0.257143 8.87143C0.257143 10.5429 0.642857 12.0857 1.41429 13.3714L0 18L4.75714 16.5857C6.04286 17.3571 7.58571 17.7429 9.12857 17.7429Z" />
    </mask>
    <path
      d="M5.52857 4.5L6.06187 4.17409L5.87909 3.875H5.52857V4.5ZM6.94286 6.81429L7.4362 7.198L7.70143 6.857L7.47616 6.48838L6.94286 6.81429ZM6.04286 7.97143L5.54951 7.58772L5.31487 7.8894L5.47649 8.23573L6.04286 7.97143ZM10.2857 11.9571L10.0536 12.5374L10.4362 12.6905L10.7277 12.3991L10.2857 11.9571ZM11.3143 10.9286L11.5818 10.3637L11.1838 10.1752L10.8723 10.4866L11.3143 10.9286ZM13.7571 12.0857H14.3821V11.6902L14.0247 11.5209L13.7571 12.0857ZM10.9286 14.0143L11.093 13.4113L11.0842 13.4089L11.0752 13.4067L10.9286 14.0143ZM3.85714 6.68571L4.47586 6.59733L4.47341 6.58015L4.47001 6.56314L3.85714 6.68571ZM5.52857 4.5L4.99527 4.82591L6.40956 7.14019L6.94286 6.81429L7.47616 6.48838L6.06187 4.17409L5.52857 4.5ZM6.94286 6.81429L6.44951 6.43057L5.54951 7.58772L6.04286 7.97143L6.5362 8.35514L7.4362 7.198L6.94286 6.81429ZM6.04286 7.97143L5.47649 8.23573C6.4464 10.3141 7.98355 11.7094 10.0536 12.5374L10.2857 11.9571L10.5178 11.3768C8.73073 10.662 7.43931 9.4859 6.60922 7.70712L6.04286 7.97143ZM10.2857 11.9571L10.7277 12.3991L11.7562 11.3705L11.3143 10.9286L10.8723 10.4866L9.84377 11.5152L10.2857 11.9571ZM11.3143 10.9286L11.0467 11.4934L13.4896 12.6505L13.7571 12.0857L14.0247 11.5209L11.5818 10.3637L11.3143 10.9286ZM13.7571 12.0857H13.1321C13.1321 12.7243 12.8751 13.0894 12.5493 13.2869C12.1969 13.5005 11.674 13.5698 11.093 13.4113L10.9286 14.0143L10.7641 14.6173C11.5974 14.8445 12.4889 14.7852 13.1972 14.3559C13.932 13.9106 14.3821 13.1186 14.3821 12.0857H13.7571ZM10.9286 14.0143L11.0752 13.4067C7.56069 12.5584 4.94914 9.91027 4.47586 6.59733L3.85714 6.68571L3.23842 6.7741C3.79372 10.6612 6.83931 13.6702 10.7819 14.6218L10.9286 14.0143ZM3.85714 6.68571L4.47001 6.56314C4.37101 6.06815 4.47993 5.71667 4.65253 5.49865C4.82485 5.28098 5.11635 5.125 5.52857 5.125V4.5V3.875C4.78365 3.875 4.11086 4.16901 3.67247 4.72277C3.23435 5.27619 3.08613 6.01756 3.24428 6.80829L3.85714 6.68571ZM4.75714 16.5857L5.40026 15.5138L4.9284 15.2307L4.40093 15.3875L4.75714 16.5857ZM0 18L-1.19544 17.6347L-1.87593 19.8618L0.356213 19.1982L0 18ZM1.41429 13.3714L2.60973 13.7367L2.77218 13.205L2.48615 12.7283L1.41429 13.3714ZM18 8.87143H16.75C16.75 13.0668 13.3239 16.4929 9.12857 16.4929V17.7429V18.9929C14.7046 18.9929 19.25 14.4475 19.25 8.87143H18ZM9.12857 17.7429V16.4929C7.78558 16.4929 6.47003 16.1557 5.40026 15.5138L4.75714 16.5857L4.11402 17.6576C5.61569 18.5586 7.38585 18.9929 9.12857 18.9929V17.7429ZM4.75714 16.5857L4.40093 15.3875L-0.356213 16.8018L0 18L0.356213 19.1982L5.11336 17.7839L4.75714 16.5857ZM0 18L1.19544 18.3653L2.60973 13.7367L1.41429 13.3714L0.218846 13.0062L-1.19544 17.6347L0 18ZM1.41429 13.3714L2.48615 12.7283C1.84863 11.6658 1.50714 10.3526 1.50714 8.87143H0.257143H-0.992857C-0.992857 10.7331 -0.562913 12.5057 0.34242 14.0145L1.41429 13.3714ZM0.257143 8.87143H1.50714C1.50714 4.67607 4.93321 1.25 9.12857 1.25V0V-1.25C3.5525 -1.25 -0.992857 3.29536 -0.992857 8.87143H0.257143ZM9.12857 0V1.25C13.3239 1.25 16.75 4.67607 16.75 8.87143H18H19.25C19.25 3.29536 14.7046 -1.25 9.12857 -1.25V0Z"
      fill="currentColor"
      mask="url(#whatsapp_mask)"
    />
  </svg>
);

const socials = [
  { label: "Instagram", href: "#", icon: <InstagramIcon /> },
  { label: "YouTube", href: "#", icon: <YoutubeIcon /> },
  { label: "WhatsApp", href: "#", icon: <WhatsAppSvg /> },
];

const Footer = () => {
  return (
    <Container id="footer" parentContainerStyle="bg-[#04100B]" childContainerStyle="gap-7.5">
      {/* Top: brand, links, CTAs */}
      <div className="grid w-full grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.8fr_0.7fr_0.7fr_1fr] lg:gap-x-8">
        {/* Brand */}
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
          <Image src={CueLogo} alt="CueRank logo" width={172} height={64} className="h-auto w-[140px] sm:w-[172px]" />
          <p className="font-inter text-xs text-inactive sm:text-base">
            Connecting cue sports clubs, players and competition.
          </p>
          <a href="tel:+919876543210" className="flex items-center gap-3 font-inter text-sm text-active sm:text-base">
            <span className="text-inactive"><PhoneIcon /></span>
            +91 98765 43210
          </a>
          <a href="mailto:cuerank@gmail.com" className="flex items-center gap-3 font-inter text-sm text-active sm:text-base">
            <span className="text-inactive"><MailIcon /></span>
            cuerank@gmail.com
          </a>
        </div>

        {/* Discover */}
        <nav aria-label="Discover" className="flex flex-col gap-4">
          <h3 className="font-inter text-xs font-semibold uppercase tracking-[0.12em] text-gold sm:text-base">
            Discover
          </h3>
          {discover.map((l) => (
            <Link key={l.label} href={l.href} className="font-inter text-lg font-medium leading-none text-active transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* The details */}
        <nav aria-label="The details" className="flex flex-col gap-4">
          <h3 className="font-inter text-xs font-semibold uppercase tracking-[0.12em] text-gold sm:text-base">
            The Details
          </h3>
          {details.map((l) => (
            <Link key={l.label} href={l.href} className="font-inter text-lg font-medium leading-none text-active transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="col-span-2 flex flex-col gap-5 sm:flex-row lg:col-span-1 lg:flex-col">
          <Button
            href="#"
            text="Register your club"
            padding="px-7.5 py-3.5 max-h-[48px]"
            textStyle="font-inter font-medium text-lg text-black"
            bg="bg-buttons"
            border="border border-[#55E489]"
            width="w-full"
          />
          <Button
            href="#"
            text="Register as a player"
            padding="px-7.5 py-3.5 max-h-[48px]"
            textStyle="font-inter font-medium text-lg text-active"
            bg="bg-white/5 backdrop-blur-md"
            border="border-none"
            width="w-full"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/10" />

      {/* Bottom: copyright + socials */}
      <div className="flex w-full flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <p className="font-inter text-sm text-inactive">© CueRank</p>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="mr-1 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-inactive sm:text-xs">
            Follow the game
          </span>
          {socials.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="grid size-11 place-items-center rounded-full border border-white/20 text-active transition-colors hover:border-gold hover:text-gold sm:size-14"
            >
              {s.icon}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Footer;