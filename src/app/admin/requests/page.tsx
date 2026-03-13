"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";

interface ProjectRequest {
    id: string;
    clientName: string;
    clientEmail: string;
    projectTitle: string;
    description: string;
    budget: string | null;
    status: string;
    createdAt: string;
}

export default function AdminRequestsPage() {
    const [requests, setRequests] = useState<ProjectRequest[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchRequests() {
        try {
            const res = await fetch("/api/admin/requests");
            if (res.ok) {
                const data = await res.json();
                setRequests(data);
            }
        } catch (error) {
            console.error("Failed to fetch requests:", error);
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(id: string, status: string) {
        try {
            const res = await fetch("/api/admin/requests", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            if (res.ok) {
                fetchRequests();
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="flex bg-white min-h-screen font-sans selection:bg-red-100">
            <AdminSidebar />

            <main className="flex-1 ml-64 p-12 text-zinc-900">
                <header className="mb-16">
                    <h1 className="text-2xl font-normal tracking-tight text-zinc-900 mb-2">
                        Project <span className="text-red-600">Requests</span>
                    </h1>
                    <p className="text-zinc-500 text-xs font-normal">
                        Review and manage incoming project inquiries.
                    </p>
                </header>

                <div className="bg-white border border-zinc-100 rounded-none overflow-hidden shadow-xl shadow-red-600/5">
                    <div className="grid grid-cols-1 divide-y divide-zinc-100">
                        {loading ? (
                            <div className="p-12 text-center text-zinc-400 italic text-sm">Loading requests...</div>
                        ) : requests.length === 0 ? (
                            <div className="p-12 text-center text-zinc-400 font-bold uppercase tracking-widest text-xs">No project requests found.</div>
                        ) : (
                            requests.map((request) => (
                                <div key={request.id} className="p-8 hover:bg-zinc-50 transition-colors group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-bold text-zinc-900 tracking-tight leading-none">{request.projectTitle}</h3>
                                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                                                <span className="text-red-600 underline underline-offset-4 decoration-red-100">{request.clientName}</span>
                                                <span className="text-zinc-300">•</span>
                                                <span>{request.clientEmail}</span>
                                                {request.budget && (
                                                    <>
                                                        <span className="text-zinc-300">•</span>
                                                        <span className="text-zinc-900 bg-zinc-100 px-2 py-0.5 font-bold">Budget: {request.budget}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-3">
                                            <select
                                                value={request.status}
                                                onChange={(e) => updateStatus(request.id, e.target.value)}
                                                className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-none border-2 transition-all cursor-pointer focus:outline-none
                                                    ${request.status === "PENDING" ? "bg-white text-zinc-500 border-zinc-100 hover:border-zinc-300" :
                                                        request.status === "APPROVED" ? "bg-red-600 text-white border-red-600 hover:bg-red-700" :
                                                            "bg-zinc-900 text-white border-zinc-900 hover:bg-black"}
                                                `}
                                            >
                                                <option value="PENDING">Pending Review</option>
                                                <option value="APPROVED">Approve Project</option>
                                                <option value="REJECTED">Reject Project</option>
                                            </select>
                                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                                                Received: {new Date(request.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-zinc-600 text-[13px] font-medium leading-relaxed max-w-4xl bg-zinc-50 p-6 border-l-2 border-red-600">
                                        {request.description}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
