import Footer from "@/app/(user)/components/Footer";
import "../globals.css";
import Navbar from "@/app/(user)/components/Navbar";

export const metadata = {
  title: "DJ Nati Cars",
  description: "new and used car sell in Ethiopia",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />

        {/* NO TOP PADDING HERE */}
        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
