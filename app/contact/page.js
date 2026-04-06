// import React from "react";

// export default function ContactPage() {
//   return (
//     <section className="bg-gray-50 min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-red-500 font-bold uppercase tracking-wide mb-2">
//             Get in Touch
//           </h2>
//           <p className="text-3xl sm:text-4xl font-extrabold text-gray-900">
//             Contact DJ NATI Cars
//           </p>
//           <p className="text-gray-500 mt-2">
//             Have questions or want to sell your car? Reach out to us and we’ll
//             get back to you promptly.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           {/* Contact Info */}
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
//               <p className="text-gray-500">Addis Ababa, Ethiopia</p>
//             </div>

//             <div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
//               <p className="text-gray-500">+251 931 429 999</p>
//             </div>

//             <div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
//               <p className="text-gray-500">info@djnaticars.com</p>
//             </div>

//             <div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 Working Hours
//               </h3>
//               <p className="text-gray-500">Mon - Sat: 3:00 AM - 6:00 PM</p>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="bg-white shadow-md rounded-xl p-6">
//             <form className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Your Name"
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-red-500 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="you@example.com"
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-red-500 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">
//                   Message
//                 </label>
//                 <textarea
//                   placeholder="Your message"
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 focus:ring-1 focus:ring-red-500 outline-none"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-all"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Optional Map */}
//         <div className="mt-16">
//           <h3 className="text-xl font-bold text-gray-900 mb-4">Our Location</h3>
//           <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
//             Google Map Placeholder
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Simple validation
  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = "Name is required";
    if (!formData.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Invalid email";
    if (!formData.message) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    // Here you can call API to send data
    console.log("Form submitted:", formData);
    setSuccess(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-gray-50 min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-red-500 font-bold uppercase tracking-wide mb-2">
            Get in Touch
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Contact DJ NATI Cars
          </p>
          <p className="text-gray-500 mt-2">
            Have questions or want to sell your car? Reach out to us and we’ll
            get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-500">Addis Ababa, Ethiopia</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-500">+251 900 000 000</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-500">info@djnaticars.com</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Working Hours
              </h3>
              <p className="text-gray-500">Mon - Sat: 8:00 AM - 6:00 PM</p>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/251900000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-xl p-6">
            {success && (
              <div className="mb-4 text-green-600 font-semibold">
                Thank you! Your message has been sent.
              </div>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-red-500 outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-red-500 outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Your message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 focus:ring-1 focus:ring-red-500 outline-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Our Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.7962730180375!2d38.76137267478003!3d8.990885591068952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8500172f0487%3A0xeb84db9156f7faf0!2sDj%20Nati%20Car%20market!5e0!3m2!1sen!2set!4v1775513265042!5m2!1sen!2set"
            width="100%"
            height="400"
            className="rounded-lg border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="https://maps.app.goo.gl/d8j39vfELuxFLncR8"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
