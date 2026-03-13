"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";

interface Report {
    id: string;
    status: string;
    summary: string;
    documentUrl?: string;
    issueType: string;
    issueDescription?: string;
    createdAt: string;
    client: { name: string };
    developer: { email: string };
}

export default function AdminReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReports() {
            try {
                const res = await fetch("/api/admin/reports");
                if (res.ok) {
                    setReports(await res.json());
                }
            } catch (error) {
                console.error("Failed to fetch reports", error);
            } finally {
                setLoading(false);
            }
        }
        fetchReports();
    }, []);

    return (
        <div className="flex bg-white min-h-screen font-sans selection:bg-red-100 italic-none">
            <AdminSidebar />

            <main className="flex-1 ml-64 p-12 text-zinc-900">
                <header className="mb-16">
                    <h1 className="text-2xl font-normal tracking-tight text-zinc-900 mb-2">
                        Project <span className="text-red-600">Reports</span>
                    </h1>
                    <p className="text-zinc-500 text-xs font-normal">
                        Stay updated with progress logs from all active developers.
                    </p>
                </header>

                <div className="bg-white border border-zinc-100 border-t-2 border-t-red-600 rounded-none overflow-hidden shadow-xl shadow-red-600/5">
                    {loading ? (
                        <div className="p-12 text-center text-zinc-400 italic text-sm">Searching records...</div>
                    ) : reports.length === 0 ? (
                        <div className="p-12 text-center text-zinc-400 font-bold uppercase tracking-widest text-xs">No reports submitted yet.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-zinc-900 border-b border-zinc-900">
                                    <tr>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-white">Date Sent</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-white">Client / Dev</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-white">Current Status</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-white">Work Summary</th>
                                        <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-white">Logged Issues</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                    {reports.map((report) => (
                                        <tr key={report.id} className="hover:bg-red-50/30 transition-all duration-200 group border-b border-zinc-50 last:border-0">
                                            <td className="px-6 py-5 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                                                {new Date(report.createdAt).toLocaleDateString()}
                                                <div className="text-[9px] text-zinc-400 font-bold">{new Date(report.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="text-[13px] font-bold text-red-600 tracking-tight">{report.client.name}</div>
                                                <div className="text-[10px] text-zinc-400 font-bold mt-0.5">{report.developer.email}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`px-2 py-1 rounded-none text-[9px] font-bold uppercase tracking-[0.1em] border
                                                    ${report.status === "ON_TRACK" ? "bg-white text-emerald-600 border-emerald-100" :
                                                        report.status === "DELAYED" ? "bg-white text-amber-600 border-amber-100" :
                                                            report.status === "BLOCKED" ? "bg-red-600 text-white border-red-600" :
                                                                "bg-white text-blue-600 border-blue-100"}`}>
                                                    {report.status.replace("_", " ")}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="text-[11px] text-zinc-600 font-medium max-w-xs line-clamp-2 leading-relaxed" title={report.summary}>
                                                    {report.summary}
                                                </p>
                                                {report.documentUrl && (
                                                    <a href={report.documentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-[9px] text-red-600 font-bold uppercase tracking-widest hover:underline underline-offset-4">
                                                        Attachment
                                                    </a>
                                                )}
                                            </td>
                                            <td className="px-6 py-5">
                                                {report.issueType !== "NONE" ? (
                                                    <div className="flex items-center gap-1.5 text-red-500">
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                        </svg>
                                                        <span className="text-[10px] font-bold">{report.issueType}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-zinc-300 dark:text-zinc-700 text-[10px]">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
