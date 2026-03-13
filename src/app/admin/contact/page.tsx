"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";

interface ContactInquiry {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
}

export default function AdminContactPage() {
    const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchInquiries() {
        try {
            const res = await fetch("/api/admin/contact");
            if (res.ok) {
                const data = await res.json();
                setInquiries(data);
            }
        } catch (error) {
            console.error("Failed to fetch inquiries:", error);
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(id: string, status: string) {
        try {
            const res = await fetch("/api/admin/contact", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            if (res.ok) {
                fetchInquiries();
            }
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    }

    useEffect(() => {
        fetchInquiries();
    }, []);

    return (
        <div className="flex bg-white min-h-screen font-sans selection:bg-red-100 italic-none">
            <AdminSidebar />

            <main className="flex-1 ml-64 p-12 text-zinc-900">
                <header className="mb-16">
                    <h1 className="text-2xl font-normal tracking-tight text-zinc-900 mb-2">
                        System <span className="text-red-600">Inquiries</span>
                    </h1>
                    <p className="text-zinc-500 text-xs font-normal">
                        View and manage messages from the contact form.
                    </p>
                </header>

                <div className="bg-white border border-zinc-100 rounded-none overflow-hidden shadow-xl shadow-red-600/5">
                    <div className="grid grid-cols-1 divide-y divide-zinc-100">
                        {loading ? (
                            <div className="p-12 text-center text-zinc-400 italic text-sm">Loading messages...</div>
                        ) : inquiries.length === 0 ? (
                            <div className="p-12 text-center text-zinc-400 font-bold uppercase tracking-widest text-xs">No messages found.</div>
                        ) : (
                            inquiries.map((inquiry) => (
                                <div key={inquiry.id} className="p-8 hover:bg-zinc-50 transition-colors group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-bold text-zinc-900 tracking-tight leading-none">{inquiry.subject}</h3>
                                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                                                <span className="text-red-600 underline underline-offset-4 decoration-red-100">{inquiry.name}</span>
                                                <span className="text-zinc-300">•</span>
                                                <span>{inquiry.email}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-3">
                                            <select
                                                value={inquiry.status}
                                                onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                                                className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-none border-2 appearance-none transition-all cursor-pointer focus:outline-none
                                                    ${inquiry.status === "UNREAD" ? "bg-red-600 text-white border-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20" :
                                                        inquiry.status === "READ" ? "bg-white text-zinc-800 border-zinc-200 hover:border-zinc-400" :
                                                            "bg-zinc-900 text-white border-zinc-900 hover:bg-black"}
                                                `}
                                            >
                                                <option value="UNREAD">New Message</option>
                                                <option value="READ">Mark as Read</option>
                                                <option value="ARCHIVED">Archive Message</option>
                                            </select>
                                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                                                Received: {new Date(inquiry.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-zinc-600 text-[13px] font-medium leading-relaxed max-w-4xl bg-zinc-50 p-6 border-l-2 border-red-600 whitespace-pre-wrap">
                                        {inquiry.message}
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
