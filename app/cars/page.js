import AvailableCars from "@/components/AvailableCars";
import Footer from "@/components/Footer";
import Inventory from "@/components/Inventory";
import Navbar from "@/components/Navbar";
import React from "react";

function page() {
  return (
    <>
      <div className="pt-24">
        <AvailableCars />
      </div>
    </>
  );
}

export default page;
