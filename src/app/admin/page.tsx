"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";

interface Developer {
    id: string;
    email: string;
    createdAt: string;
}

interface Client {
    id: string;
    name: string;
}

export default function AdminDashboard() {
    const [developers, setDevelopers] = useState<Developer[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDev, setSelectedDev] = useState<Developer | null>(null);
    const [selectedClientId, setSelectedClientId] = useState("");
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [demoLink, setDemoLink] = useState("");
    const [assigning, setAssigning] = useState(false);

    async function fetchData() {
        try {
            const [devsRes, clientsRes] = await Promise.all([
                fetch("/api/admin/developers"),
                fetch("/api/admin/clients")
            ]);

            if (devsRes.ok) {
                const devsData = await devsRes.json();
                setDevelopers(devsData);
            }
            if (clientsRes.ok) {
                const clientsData = await clientsRes.json();
                setClients(clientsData);
            }
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    }

    async function assignTask(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedDev) return;
        setAssigning(true);

        try {
            const res = await fetch("/api/admin/tasks/assign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: taskTitle,
                    description: taskDesc,
                    demoLink: demoLink,
                    developerId: selectedDev.id,
                    clientId: selectedClientId,
                }),
            });

            if (res.ok) {
                alert("Task assigned successfully.");
                setSelectedDev(null);
                setTaskTitle("");
                setTaskDesc("");
                setDemoLink("");
            }
        } catch (error) {
            console.error("Failed to assign task:", error);
        } finally {
            setAssigning(false);
        }
    }

    async function logout() {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex bg-white dark:bg-white min-h-screen font-sans selection:bg-red-100">
            <AdminSidebar />

            <main className="flex-1 ml-64 p-12">
                <header className="flex justify-between items-start mb-16">
                    <div>
                        <h1 className="text-2xl font-normal tracking-tight text-zinc-900 mb-2">
                            Admin <span className="text-red-600">Dashboard</span>
                        </h1>
                        <p className="text-zinc-500 text-xs font-normal">
                            Manage your platform and projects in one place.
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className="px-6 py-2 bg-white border border-red-600 text-red-600 font-semibold text-[11px] uppercase tracking-widest rounded-none hover:bg-zinc-50 transition-all"
                    >
                        Logout
                    </button>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12">
                    <div className="p-6 rounded-none border border-zinc-100 bg-zinc-50/50">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">Total Developers</span>
                        <span className="text-2xl font-normal text-zinc-900">{developers.length}</span>
                    </div>
                    {/* Simplified Stats */}
                    {['Platform Health', 'System Uptime', 'Active Tasks'].map((label, i) => (
                        <div key={label} className="p-6 rounded-none border border-zinc-100 bg-zinc-50/50">
                            <span className="text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">{label}</span>
                            <span className="text-2xl font-normal text-zinc-900">{i === 0 ? 'Good' : i === 1 ? '99.9%' : '12'}</span>
                        </div>
                    ))}
                </div>

                <section className="bg-white border border-zinc-100 rounded-none overflow-hidden shadow-sm">
                    <div className="px-8 py-5 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/30">
                        <h3 className="text-[13px] font-semibold text-zinc-800 uppercase tracking-wide">Developers</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/10 dark:bg-zinc-900/5">
                                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Email Address</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">ID</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[12px]">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center text-zinc-400 font-normal italic">Loading developers...</td>
                                    </tr>
                                ) : developers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center text-zinc-400 font-normal italic uppercase tracking-widest text-[10px] font-bold">No developers joined yet.</td>
                                    </tr>
                                ) : (
                                    developers.map((dev) => (
                                        <tr key={dev.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20 transition-colors group">
                                            <td className="px-8 py-5">
                                                <span className="text-zinc-700 dark:text-zinc-300 font-medium">{dev.email}</span>
                                            </td>
                                            <td className="px-8 py-5 font-mono text-[10px] text-zinc-400 tracking-tighter uppercase">{dev.id}</td>
                                            <td className="px-8 py-5">
                                                <span className="inline-flex items-center gap-1.5 text-zinc-600 font-bold uppercase tracking-widest text-[10px]">
                                                    <span className="w-1.5 h-1.5 bg-red-600" />
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button
                                                    onClick={() => setSelectedDev(dev)}
                                                    className="text-[11px] font-bold text-red-600 uppercase tracking-widest hover:underline underline-offset-4"
                                                >
                                                    Assign Task
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Modal - Emerald Style */}
                {selectedDev && (
                    <div className="fixed inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                        <form
                            onSubmit={assignTask}
                            className="bg-white border border-zinc-200 p-10 rounded-none shadow-2xl w-full max-w-lg space-y-6 animate-in fade-in zoom-in-95 duration-300"
                        >
                            <div>
                                <h3 className="text-xl font-normal text-zinc-900 mb-1">Assign <span className="text-red-600">Task</span></h3>
                                <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest">{selectedDev.email}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5 text-left">
                                    <label className="text-red-600 text-[10px] font-bold uppercase tracking-widest px-1">Choose Client</label>
                                    <select
                                        required
                                        value={selectedClientId}
                                        onChange={(e) => setSelectedClientId(e.target.value)}
                                        className="w-full bg-white border border-zinc-400 rounded-none px-5 py-4 text-zinc-900 text-sm focus:outline-none focus:border-red-600 transition-all font-medium appearance-none cursor-pointer"
                                    >
                                        <option value="">Select a client...</option>
                                        {clients.map((client) => (
                                            <option key={client.id} value={client.id}>
                                                {client.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1.5 text-left">
                                    <label className="text-red-600 text-[10px] font-bold uppercase tracking-widest px-1">Task Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={taskTitle}
                                        onChange={(e) => setTaskTitle(e.target.value)}
                                        placeholder="What needs to be done?"
                                        className="w-full bg-white border border-zinc-400 rounded-none px-5 py-4 text-zinc-900 text-sm focus:outline-none focus:border-red-600 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5 text-left">
                                    <label className="text-red-600 text-[10px] font-bold uppercase tracking-widest px-1">Details</label>
                                    <textarea
                                        rows={4}
                                        value={taskDesc}
                                        onChange={(e) => setTaskDesc(e.target.value)}
                                        placeholder="Add more information here..."
                                        className="w-full bg-white border border-zinc-400 rounded-none px-5 py-4 text-zinc-900 text-sm focus:outline-none focus:border-red-600 transition-all font-medium resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedDev(null)}
                                    className="flex-1 py-3.5 border border-zinc-100 text-zinc-500 text-[11px] font-bold uppercase tracking-widest rounded-none hover:bg-zinc-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={assigning}
                                    className="flex-1 py-3.5 bg-red-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-none hover:bg-red-700 transition-all shadow-lg shadow-red-600/10"
                                >
                                    {assigning ? "Sending..." : "Assign"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}
