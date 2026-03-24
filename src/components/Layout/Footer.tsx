"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const footerSections = [
  {
    title: "Shop",
    links: [
      { title: "Electronics", href: "/electronics" },
      { title: "Fashion", href: "/fashion" },
      { title: "Home & Garden", href: "/home" },
      { title: "Sports", href: "/sports" },
      { title: "Deals", href: "/deals" },
    ],
  },
  {
    title: "Support",
    links: [
      { title: "Contact", href: "/contact" },
      { title: "Help Center", href: "/help" },
      { title: "Track Order", href: "/track" },
      { title: "Returns", href: "/returns" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Careers", href: "/careers" },
      { title: "Press", href: "/press" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Youtube, href: "#" },
];

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white border-t border-white/10">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-16">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* BRAND */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Shop
            </h2>

            <p className="text-gray-300 max-w-md">
              Premium products, fast delivery, and a modern shopping experience designed for you.
            </p>

            {/* CONTACT */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Cairo, Egypt
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +20 123 456 789
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> support@shop.com
              </div>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition backdrop-blur"
                >
                  <s.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* LINKS */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-4 text-gray-200">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* NEWSLETTER */}
        <div className="mt-16 border-t border-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <h3 className="text-lg font-semibold">Stay updated</h3>
            <p className="text-gray-400 text-sm">
              Get the latest offers and updates
            </p>
          </div>

          <div className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-sm placeholder:text-gray-400 focus:outline-none"
            />
            <Button className="bg-indigo-500 hover:bg-indigo-600">
              Subscribe
            </Button>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">

          <p>© 2026 Shop. All rights reserved.</p>

          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/cookies" className="hover:text-white">Cookies</Link>
          </div>

        </div>
      </div>
    </footer>
  );
}
