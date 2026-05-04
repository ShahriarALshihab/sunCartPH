import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Playfair_Display, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "SunCart – Summer Essentials Store",
  description:
    "Bangladesh's premier summer essentials store. Shop sunglasses, summer outfits, skincare, and beach accessories.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="suncart"
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1c1917",
              color: "#fef3c7",
              border: "1px solid #f79009",
              borderRadius: "12px",
            },
            success: { iconTheme: { primary: "#f79009", secondary: "#1c1917" } },
            error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}