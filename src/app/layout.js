import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";


const inter=Inter({
  variable:"--font-inter",
  subsets:['latin']
})

const barlowCondensed=Barlow_Condensed({
  variable:"--font-barlow-condensed",
  subsets:["latin"],
    weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "CueRank",
  description: "Your next shot. Your next Rank. ",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col ">{children}</body>
    </html>
  );
}
