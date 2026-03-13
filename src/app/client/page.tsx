"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ProjectReportsList from "@/components/ProjectReportsList";

export default function ClientDashboard() {
    const router = useRouter();
    const [client, setClient] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClientData() {
            try {
                const res = await fetch("/api/client/data");
                if (res.ok) {
                    setClient(await res.json());
                } else {
                    router.push("/client/login");
                }
            } catch (error) {
                console.error("Failed to fetch client data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchClientData();
    }, [router]);

    async function logout() {
        await fetch("/api/client/logout", { method: "POST" });
        window.location.href = "/client/login";
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-white text-zinc-400 text-xs uppercase tracking-widest font-bold animate-pulse">Loading...</div>;
    }

    if (!client) return null;

    return (
        <div className="min-h-screen bg-white flex flex-col selection:bg-red-100 font-sans">
            {/* Navbar */}
            <nav className="w-full bg-red-600 border-b border-red-700 px-4 sm:px-8 py-4 shadow-sm">
                <div className="max-w-6xl mx-auto flex flex-row justify-between items-center gap-2">
                    <div
                        onClick={() => router.push('/')}
                        className="cursor-pointer flex items-center gap-2"
                    >
                        <img src="https://ik.imagekit.io/dypkhqxip/Screenshot_2026-03-13_at_21.00.59-removebg-preview.png" alt="Logo" className="h-8 w-auto brightness-0 invert" />
                    </div>
                    <div className="flex gap-3 sm:gap-6 items-center">
                        <button
                            className="text-[10px] font-bold uppercase tracking-wider text-white border-b-2 border-white whitespace-nowrap"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => router.push('/client/tasks')}
                            className="text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors whitespace-nowrap"
                        >
                            Tasks
                        </button>
                        <button
                            onClick={() => router.push('/client/documents')}
                            className="text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors whitespace-nowrap"
                        >
                            Documents
                        </button>
                    </div>
                </div>
            </nav>

            <main className="flex-grow p-4 sm:p-8 lg:p-12">
                <div className="max-w-5xl mx-auto">
                    <header className="mb-8 sm:mb-12 flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-0">
                        <div>
                            <span className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2 block italic">Project Overview</span>
                            <h1 className="text-2xl sm:text-3xl font-normal tracking-tight text-zinc-900 mb-2">
                                {client.name}
                            </h1>
                            <p className="text-zinc-500 text-sm max-w-sm font-medium">
                                ID: {client.id} • {client.contactName}
                            </p>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full sm:w-auto px-6 py-2 border border-red-600 text-red-600 text-[10px] uppercase tracking-widest font-bold rounded-none hover:bg-zinc-50 transition-all text-center"
                        >
                            Sign Out
                        </button>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                        <div className="p-5 sm:p-6 rounded-none border border-zinc-100 bg-white shadow-sm">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3 sm:mb-4">Total Budget</h3>
                            <div className="text-xl sm:text-2xl font-light text-zinc-900">
                                {client.totalBudget ? `₹${client.totalBudget}` : "—"}
                            </div>
                        </div>
                        <div className="p-5 sm:p-6 rounded-none border border-zinc-100 bg-white shadow-sm">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3 sm:mb-4">Amount Paid</h3>
                            <div className="text-xl sm:text-2xl font-normal text-red-600">
                                {client.amountPaid ? `₹${client.amountPaid}` : "—"}
                            </div>
                        </div>
                        <div className="p-5 sm:p-6 rounded-none border border-zinc-100 bg-white shadow-sm">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3 sm:mb-4">Start Date</h3>
                            <div className="text-md sm:text-lg font-light text-zinc-700">
                                {client.startDate ? new Date(client.startDate).toLocaleDateString() : "Pending"}
                            </div>
                        </div>
                        <div className="p-5 sm:p-6 rounded-none border border-zinc-100 bg-white shadow-sm">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3 sm:mb-4">Completion Date</h3>
                            <div className="text-md sm:text-lg font-light text-zinc-700">
                                {client.endDate ? new Date(client.endDate).toLocaleDateString() : "TBD"}
                            </div>
                        </div>
                    </div>

                    {/* Profile & Developer Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        <div className="p-6 sm:p-8 rounded-none border border-zinc-100 bg-white shadow-sm">
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-red-600 mb-6">Profile Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">Contact Email</span>
                                    <div className="text-sm text-zinc-800 dark:text-zinc-200 break-all">{client.email || "—"}</div>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">Mobile Number</span>
                                    <div className="text-sm text-zinc-800 dark:text-zinc-200">{client.mobile || "—"}</div>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">Registered Since</span>
                                    <div className="text-sm text-zinc-800 dark:text-zinc-200">{new Date(client.createdAt).toLocaleDateString()}</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 rounded-none border border-zinc-100 bg-red-50/20">
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-red-600 mb-6">Assigned Team</h3>
                            {client.developers && client.developers.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">Technical Team</div>
                                            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                                {client.developers.map((dev: any) => (
                                                    <span key={dev.id} className="px-2 py-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded text-xs text-zinc-600 dark:text-zinc-400">
                                                        {dev.id}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-none border border-red-100 mt-4">
                                        <p className="text-[11px] text-red-600 font-medium leading-relaxed">
                                            The team is working on your project. Contact us if you have any questions.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-zinc-400 text-sm italic">
                                    No technical team assigned yet.
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </main>

            <footer className="w-full bg-red-600 border-t border-red-700 px-4 sm:px-8 py-10">
                <div className="max-w-6xl mx-auto text-[10px] text-white font-bold tracking-wider uppercase text-center sm:text-left">
                    © {new Date().getFullYear()} Redlix Studio • Secure Connection
                </div>
            </footer>
        </div>
    );
}
