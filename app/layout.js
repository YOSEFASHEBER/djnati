import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: {
    default: "DJ NATI Cars | Buy Cars in Ethiopia",
    template: "%s | DJ NATI Cars",
  },
  description:
    "Browse verified cars in Addis Ababa with transparent pricing and trusted sellers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
