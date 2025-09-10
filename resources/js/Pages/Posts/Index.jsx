import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import Sidebar from "@/Layouts/Sidebar";

export default function Index({ posts, search: initialSearch }) {
    const [search, setSearch] = useState(initialSearch || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/posts", { search }, { preserveState: true });
    };

    return (
        <>
            <Head title="Blog Home" />

            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />

                <main className="flex-1 p-6 ml-64">
                    {/* Search */}
                    <form onSubmit={handleSearch} className="mb-6 flex">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari judul atau author..."
                            className="flex-1  border rounded-l-lg px-3 py-2 "
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
                        >
                            Cari
                        </button>
                    </form>

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.data.map((post) => (
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
                                    className="rounded mb-2 w-full h-40 object-cover"
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

                    {/* Pagination */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {posts.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                className={`px-3 py-1 rounded border ${
                                    link.active
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-blue-500 hover:bg-blue-100"
                                }`}
                                onClick={() =>
                                    link.url &&
                                    router.get(
                                        link.url,
                                        {},
                                        { preserveState: true, replace: true }
                                    )
                                }
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
