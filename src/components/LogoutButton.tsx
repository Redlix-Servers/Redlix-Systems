"use client";

export default function LogoutButton() {
    async function logout() {
        await fetch("/api/developer/logout", { method: "POST" });
        window.location.href = "/developer/login";
    }

    return (
        <button
            onClick={logout}
            className="px-6 py-2 bg-white border border-red-600 text-red-600 font-bold text-[11px] uppercase tracking-widest rounded-none hover:bg-zinc-50 transition-all font-sans"
        >
            Logout
        </button>
    );
}
