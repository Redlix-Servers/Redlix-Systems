"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

const portals = [
  {
    id: "01",
    name: "Developer",
    description: "Tools and projects for developers.",
    href: "/developer/login",
    tag: "Dev"
  },
  {
    id: "02",
    name: "Client",
    description: "Track your project and see updates.",
    href: "/client/login",
    tag: "Work"
  },
  {
    id: "03",
    name: "Admin",
    description: "Manage the platform and users.",
    href: "/admin/login",
    tag: "Sys"
  }
];

export default function Home() {
  return (
    /* h-screen + overflow-hidden locks the page to the viewport */
    <div className="h-screen w-screen bg-white dark:bg-white flex flex-col overflow-hidden transition-colors duration-500">

      {/* Navbar: Redlix Slim Rail */}
      <nav className="z-50 w-full border-b border-red-700 bg-red-600/90 backdrop-blur-xl dark:border-red-700 dark:bg-red-600/90 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="p-2 transition-transform hover:scale-105">
                <img src="https://ik.imagekit.io/dypkhqxip/Screenshot_2026-03-13_at_21.00.59-removebg-preview.png" alt="Logo" className="h-14 w-auto brightness-0 invert" />
              </a>
            </div>
            <div className="flex gap-4 items-center">
              <a href="/request" className="bg-white px-5 py-2.5 text-xs font-semibold tracking-wider text-red-600 hover:bg-zinc-100 transition-all">
                New Request
              </a>
              <a href="/contact" className="bg-white px-5 py-2.5 text-xs font-semibold tracking-widest text-red-600 transition-all hover:bg-zinc-100 active:bg-zinc-200">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content: Internal Scroll only if needed */}
      <main className="flex-1 overflow-hidden flex flex-col justify-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">

          {/* Hero Section */}
          <div className="mb-16 max-w-4xl">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="h-1.5 w-1.5 bg-red-600" />
              <span className="text-[10px] font-semibold tracking-wider text-zinc-400">Management portal</span>
            </div>
            <h1 className="text-2xl font-light tracking-tight text-zinc-900 dark:text-zinc-900 sm:text-4xl lg:text-5xl leading-tight">
              Simplify your <span className="text-red-600 dark:text-red-600">workflow</span>.
            </h1>
            <p className="mt-3 text-xs font-medium leading-relaxed text-zinc-500 max-w-md">
              A simple and powerful tool for managing your projects.
            </p>
          </div>

          {/* Portal Selection: Side-by-side Solid Black Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-zinc-900">
            {portals.map((portal) => (
              <div
                key={portal.id}
                className="group relative flex flex-col p-8 transition-all duration-500 bg-black hover:bg-zinc-950 border-b md:border-b-0 md:border-r border-zinc-900 last:border-r-0 last:border-b-0"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="text-3xl font-extralight tracking-tighter text-red-600">
                    {portal.id}
                  </span>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-red-500">
                    {portal.tag}
                  </p>
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-light tracking-tight text-white mb-2">
                    {portal.name}
                  </h2>
                  <p className="text-xs font-medium leading-relaxed text-zinc-400 mb-8">
                    {portal.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <a
                    href={portal.href}
                    className="group/btn flex items-center justify-between rounded-none bg-white py-3 px-6 text-xs font-semibold text-black transition-all hover:bg-zinc-100 w-full"
                  >
                    Enter Workspace
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" strokeWidth={2.5} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Signature Redlix Studio Footer: Updated to high-performance sharp aesthetic */}
      <footer className="w-full bg-red-600 dark:bg-red-600 py-12 lg:py-20 text-white border-t border-red-500/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-10">
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="h-2 w-2 bg-white animate-pulse" />
                <span className="text-xs font-semibold tracking-wider text-white">CSAPP Precision</span>
              </div>
              <p className="text-sm font-medium text-white/70 text-center sm:text-left max-w-md">
                Elegant and simple tools for modern teams and high-performance projects.
              </p>
            </div>

            <div className="flex gap-10 text-xs font-semibold tracking-wide text-white/60">
              <a href="/privacy" className="hover:text-white transition-all hover:translate-y-[-1px]">Privacy</a>
              <a href="/terms" className="hover:text-white transition-all hover:translate-y-[-1px]">Terms</a>
              <span className="cursor-default text-white/40">© {new Date().getFullYear()} Redlix</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}