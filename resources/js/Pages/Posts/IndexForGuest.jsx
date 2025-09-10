import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { useEffect } from "react";
import FooterLayout from "@/Layouts/FooterLayout";
export default function IndexForGuest({
    posts,
    auth,
    search: initialSearch,
    isHomepage,
    categories,
    selectedCategory,
}) {
    const [search, setSearch] = useState(initialSearch || "");
    const [email, setEmail] = useState("");
    const [debounced, setDebounced] = useState(search);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/posts/blog-home", { search });
    };
    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            const token = document.querySelector(
                'meta[name="csrf-token"]'
            ).content;
            const res = await fetch("/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            alert(data.message); // bisa ganti toast nanti
            setEmail("");
        } catch (err) {
            console.error(err);
            alert("Gagal subscribe, cek console");
        }
    };
    function toTitleCase(str) {
        return str
            .split(" ")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
    }

    return (
        <>
            <Head title="Blog Home" />
            <NavigationLayout />
            <div className="px-10 mt-10 min-h-screen flex gap-6 mb-20">
                {/* Sidebar kiri 20% */}

                <aside className="w-1/5 p-4 flex flex-col gap-6">
                    {/* Header kategori */}

                    {/* Logo & Deskripsi */}
                    <div className="text-center">
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            className="mx-auto w-16 h-16 mb-2"
                        />
                        <p className="text-sm text-gray-600">
                            Kami menyediakan informasi dan tips terkini seputar
                            bisnis dan teknologi.
                        </p>
                    </div>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari judul atau author..."
                            className="w-full border rounded-full  px-3 py-2 flex-1 border-gray-300 "
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Cari
                        </button>
                    </form>

                    <form
                        onSubmit={handleSubscribe}
                        className="flex flex-col gap-2"
                    >
                        <h3 className="font-semibold text-gray-700">
                            Subscribe
                        </h3>

                        {/* Input email */}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Anda"
                            className="border rounded-full px-4 py-2 border-gray-300 w-full"
                            required
                        />

                        {/* Button */}
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-full w-full hover:opacity-90 transition"
                        >
                            Daftar
                        </button>
                    </form>

                    {/* Daftar Isi */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">
                            Kategori
                        </h3>
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-2">
                                Kategori
                            </h3>
                            <ul className="text-sm text-gray-700 flex flex-col gap-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                                {categories.length > 0 ? (
                                    categories.map((cat) => (
                                        <li key={cat.id}>
                                            <Link
                                                href={route(
                                                    "posts.indexForGuest",
                                                    { category: cat.slug }
                                                )}
                                                preserveScroll
                                                preserveState
                                                className={`block px-3 py-1 rounded-full transition-all hover:bg-gray-200 ${
                                                    selectedCategory ===
                                                    cat.slug
                                                        ? "bg-indigo-100 text-indigo-600 font-semibold"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                {toTitleCase(cat.name)}
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-400 italic px-3 py-1 rounded-full bg-gray-50">
                                        Belum ada kategori
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Konten utama kanan 80% */}
                <main className="w-4/5 flex flex-col gap-6">
                    {/* Promo Banner */}
                    {!selectedCategory && !isHomepage && (
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                            {/* Card Kiri: Promo Affiliate */}
                            <div className="h-72 flex-1 p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">
                                        🔥 Promo Affiliate!
                                    </h2>
                                    <p className="text-sm md:text-base leading-relaxed opacity-90">
                                        Dapatkan diskon 20% untuk produk pilihan
                                        melalui link affiliate kami. Bergabung
                                        sebagai affiliate, dapatkan komisi
                                        menarik setiap transaksi, promo
                                        eksklusif, materi marketing, dan
                                        dukungan penuh tim kami.
                                    </p>
                                </div>
                                <a
                                    href="https://affiliate-link.com"
                                    target="_blank"
                                    className="mt-4 self-start bg-white text-purple-600 px-5 py-2 rounded-full font-semibold hover:bg-purple-50 transition"
                                >
                                    Klaim Sekarang
                                </a>
                            </div>

                            {/* Card Kanan: Penawaran Author Blog */}
                            <div className="flex-1 p-6 bg-gradient-to-r from-green-500 to-lime-400 text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">
                                        ✍️ Jadi Author Blog
                                    </h2>
                                    <p className="text-sm md:text-base leading-relaxed opacity-90">
                                        Bergabung menjadi penulis kami dan
                                        bagikan artikel menarikmu. Sebagai
                                        author, dapat menulis konten
                                        berkualitas, tingkatkan personal
                                        branding, insight analytics pembaca,
                                        serta ikut kegiatan edukatif dan
                                        komunitas.
                                    </p>
                                </div>
                                <a
                                    href="/author-rules"
                                    className="mt-4 self-start bg-white text-green-600 px-5 py-2 rounded-full font-semibold hover:bg-green-50 transition"
                                >
                                    Lihat lebih lanjut
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Posts Grid */}
                    {/* Posts Grid */}
                    <main className="w-full   flex flex-col gap-6">
                        {!selectedCategory && !isHomepage && (
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-700">
                                    Recent Article
                                </h2>
                                <Link
                                    href="/posts/blog-home"
                                    className="text-sm text-blue-500 hover:underline"
                                >
                                    Lihat semua &gt;
                                </Link>
                            </div>
                        )}
                        {selectedCategory && (
                            <div className="p-2 justify-center text-center rounded-lg text-gray-700 py-4">
                                <span className="font-semibold">
                                    Kategori{" "}
                                    {
                                        categories.find(
                                            (cat) =>
                                                cat.slug === selectedCategory
                                        )?.name
                                    }
                                </span>{" "}
                                | {posts.meta?.total ?? posts.data.length} hasil
                                ditemukan
                            </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.data.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
                                >
                                    <div className="mb-4">
                                        {/* Thumbnail */}
                                        <img
                                            src={
                                                post.thumbnail
                                                    ? `/storage/${post.thumbnail}`
                                                    : "/images/no-img.png"
                                            }
                                            alt={post.title}
                                            className="rounded mb-2 w-full h-36 object-cover"
                                        />

                                        {/* Kategori */}
                                        <div className="flex flex-wrap gap-2 mb-1">
                                            {post.categories &&
                                            post.categories.length > 0 ? (
                                                post.categories.map((cat) => (
                                                    <span
                                                        key={cat.id}
                                                        className="bg-gray-200 text-gray-700 text-xs px-2 py-1 "
                                                    >
                                                        {cat.name}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 italic text-xs">
                                                    Tanpa Kategori
                                                </span>
                                            )}
                                        </div>

                                        {/* Judul */}
                                        <h2 className="font-semibold text-lg mb-1">
                                            <Link
                                                href={`/posts/${post.slug}`}
                                                className="hover:text-blue-500 transition-colors"
                                            >
                                                {post.title}
                                            </Link>
                                        </h2>

                                        {/* Excerpt 150 karakter */}
                                        {post.excerpt && (
                                            <p className="text-gray-600 text-sm mb-1">
                                                {post.excerpt.length > 150
                                                    ? post.excerpt.substring(
                                                          0,
                                                          150
                                                      ) + "..."
                                                    : post.excerpt}
                                            </p>
                                        )}

                                        {/* Author + Foto */}
                                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1 mt-4">
                                            <img
                                                src={
                                                    auth?.user
                                                        ?.profile_photo_url ??
                                                    "/images/profile.png"
                                                }
                                                alt={post.author?.name}
                                                className="w-6 h-6 rounded-full object-cover"
                                            />
                                            <span>
                                                {post.author?.name} •{" "}
                                                {new Date(
                                                    post.created_at
                                                ).toLocaleDateString("id-ID")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {!selectedCategory && posts.links && (
                            <div className="flex justify-center mt-6 gap-2">
                                {posts.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            if (link.url) {
                                                router.get(
                                                    link.url,
                                                    {},
                                                    {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    }
                                                );
                                            }
                                        }}
                                        className={`px-3 py-1 rounded ${
                                            link.active
                                                ? "bg-indigo-600 text-white"
                                                : "bg-gray-200 text-gray-700"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </main>
                </main>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6 mt-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 mx-10 mb-20 h-64">
                {/* Teks promo / info */}
                <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                        Jelajahi berbagai tips dan solusi praktis dari Mekari
                        Sign
                    </h2>
                    <p className="text-sm md:text-base opacity-90">
                        Subscribe untuk mendapatkan informasi digitalisasi
                        bisnis, keamanan, dan rangkuman konten pilihan untuk
                        kebutuhan Anda.
                    </p>
                </div>

                {/* Form subscribe */}
                <form
                    onSubmit={handleSubscribe}
                    className="flex gap-2 w-full md:w-auto mt-4 md:mt-0"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Anda"
                        required
                        className="px-4 py-2 rounded-full text-gray-800 flex-1"
                    />
                    <button
                        type="submit"
                        className="bg-green-500 px-5 py-2 rounded-full font-semibold hover:opacity-90 transition"
                    >
                        Daftar
                    </button>
                </form>
            </div>

            <FooterLayout />
        </>
    );
}
