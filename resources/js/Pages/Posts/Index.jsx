import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import Sidebar from "@/Layouts/Sidebar";

export default function Index({ posts, auth, search: initialSearch }) {
    const [search, setSearch] = useState(initialSearch || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/posts", { search });
    };
    return (
        <>
            <Head title="Blog Home" />

            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 p-6 ml-64">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="mb-6 flex">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari judul atau author..."
                            className="flex-1 border rounded-l-lg px-3 py-2"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
                        >
                            Cari
                        </button>
                    </form>

                    {/* Promo Banner */}
                    <div className="mb-6 p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">
                                🎁 Promo Affiliate!
                            </h2>
                            <p className="mt-1 text-sm">
                                Dapatkan diskon 20% untuk produk pilihan melalui
                                link kami.
                            </p>
                        </div>
                        <a
                            href="https://affiliate-link.com"
                            target="_blank"
                            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            Klaim Sekarang
                        </a>
                    </div>

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
                            >
                                <img
                                    src={
                                        post.thumbnail
                                            ? `/storage/${post.thumbnail}`
                                            : "/images/no-img.png"
                                    }
                                    alt={post.title}
                                    className="rounded mb-2 w-full h-36 object-cover"
                                />
                                <h2 className="font-semibold text-lg mb-1">
                                    {post.title}
                                </h2>
                                <p className="text-gray-500 text-sm mb-1">
                                    {post.author?.name} •{" "}
                                    {new Date(
                                        post.created_at
                                    ).toLocaleDateString("id-ID")}
                                </p>

                                <Link
                                    href={`/posts/${post.slug}`}
                                    className="mt-2 inline-block text-blue-500 hover:underline"
                                >
                                    Lihat Detail
                                </Link>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
