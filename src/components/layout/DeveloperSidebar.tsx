"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DeveloperSidebar() {
    const pathname = usePathname();

    const links = [
        {
            name: "My Dashboard", href: "/developer", icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        {
            name: "Task Center", href: "/developer/tasks", icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            )
        },
        {
            name: "Assigned Clients", href: "/developer/clients", icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            name: "Documents", href: "/developer/documents", icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            name: "Profile Settings", href: "/developer/settings", icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
    ];

    return (
        <aside className="w-64 h-screen bg-white border-r border-red-700 flex flex-col fixed left-0 top-0 z-50 font-sans">
            <div className="p-8 pb-4">
                <img src="https://ik.imagekit.io/dypkhqxip/Screenshot_2026-03-13_at_21.00.59-removebg-preview.png" alt="Logo" className="h-12 w-auto brightness-0" />
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-none text-[12px] font-medium tracking-tight transition-all duration-300
              ${isActive
                                    ? "bg-red-50 text-red-600 border border-red-100"
                                    : "text-zinc-500 hover:text-red-600 border border-transparent"}`}
                        >
                            <span className={isActive ? "text-red-600" : "text-zinc-400"}>
                                {link.icon}
                            </span>
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-zinc-100">
                <div className="px-4 py-3 bg-red-50 rounded-none border border-red-100 flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 flex items-center justify-center font-bold text-white text-xs">D</div>
                    <div className="overflow-hidden">
                        <p className="text-zinc-800 text-xs font-semibold truncate">Developer</p>
                        <p className="text-red-600/60 text-[9px] uppercase tracking-widest font-bold">Developer Mode</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
