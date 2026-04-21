"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

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
    console.log("Form submitted:", formData);
    setSuccess(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      value: "Addis Ababa, Ethiopia",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+251 923708473",
    },
    {
      icon: Mail,
      title: "Email",
      value: "djnaticars@gmail.com",
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "Mon - Sat: 9:00 AM - 6:00 PM",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-white via-red-50 to-white min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-4 py-1 text-sm font-medium text-red-600 mb-5">
            Get In Touch
          </span>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            Contact DJ NATI Cars
          </h1>

          <p className="text-slate-600 text-lg leading-relaxed">
            Have questions, need help choosing the right vehicle, or want to
            sell your car? Our team is ready to assist you with trusted service
            and quick support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-5">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:border-red-300 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/251923708473"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-7 rounded-2xl transition-all shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-2xl rounded-[2rem] border border-slate-200 p-8 sm:p-10">
            {success && (
              <div className="mb-6 rounded-2xl bg-green-50 border border-green-200 text-green-700 px-4 py-3 font-semibold">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-slate-700 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Tell us how we can help you"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 h-36 focus:ring-2 focus:ring-red-200 focus:border-red-500 outline-none transition-all resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-2">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-red-200"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Visit Our Location
            </h2>
            <p className="text-slate-600">
              Stop by DJ NATI Cars and explore available vehicles in person.
            </p>
          </div>

          <div className="rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl bg-white p-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.7962730180375!2d38.76137267478003!3d8.990885591068952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8500172f0487%3A0xeb84db9156f7faf0!2sDj%20Nati%20Car%20market!5e0!3m2!1sen!2set!4v1775513265042!5m2!1sen!2set"
              width="100%"
              height="450"
              className="rounded-[1.5rem] border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
