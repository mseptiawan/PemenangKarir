import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { useEffect } from "react";
export default function Index2({ posts, auth, search: initialSearch }) {
    const [search, setSearch] = useState(initialSearch || "");
    const [email, setEmail] = useState("");
    const [debounced, setDebounced] = useState(search);

    // debounce 500ms
    useEffect(() => {
        const handler = setTimeout(() => setDebounced(search), 500);
        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        if (debounced) {
            router.get(
                "/posts/blog-home",
                { search: debounced },
                { preserveState: true }
            );
        }
    }, [debounced]);
    useEffect(() => {
        if (debounced === "") {
            router.get("/posts/blog-home", {}, { preserveState: true });
        }
    }, [debounced]);

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

    return (
        <>
            <Head title="Blog Home" />
            <NavigationLayout />
            <div className="px-10 mt-10 min-h-screen flex gap-6">
                {/* Sidebar kiri 20% */}
                <aside className="w-1/5 p-4 bg-gray-50 rounded-xl shadow flex flex-col gap-6">
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
                    <form
                        onSubmit={handleSearch}
                        className="flex flex-col gap-2"
                    >
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari judul atau author..."
                            className="border rounded px-3 py-2"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Cari
                        </button>
                    </form>

                    {/* Form Subscribe */}
                    <form
                        onSubmit={handleSubscribe}
                        className="flex flex-col gap-2"
                    >
                        <h3 className="font-semibold text-gray-700">
                            Subscribe
                        </h3>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Anda"
                            className="border rounded px-3 py-2"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Daftar
                        </button>
                    </form>

                    {/* Daftar Isi */}
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">
                            Daftar Isi
                        </h3>
                        <ul className="text-sm text-gray-600 flex flex-col gap-1">
                            <li>
                                <Link
                                    href="#kategori1"
                                    className="hover:underline"
                                >
                                    Kategori 1
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#kategori2"
                                    className="hover:underline"
                                >
                                    Kategori 2
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#kategori3"
                                    className="hover:underline"
                                >
                                    Kategori 3
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* Konten utama kanan 80% */}
                <main className="w-4/5 flex flex-col gap-6">
                    {/* Promo Banner */}
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        {/* Card Kiri: Promo Affiliate */}
                        <div className="h-72 flex-1 p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    🎁 Promo Affiliate!
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed">
                                    Dapatkan diskon 20% untuk produk pilihan
                                    melalui link affiliate kami. Dengan
                                    bergabung sebagai affiliate, kamu bisa
                                    mendapatkan komisi menarik setiap kali ada
                                    transaksi melalui link-mu, serta akses ke
                                    promo eksklusif, materi marketing, dan
                                    dukungan penuh dari tim kami agar performa
                                    penjualanmu maksimal.
                                </p>
                            </div>
                            <a
                                href="https://affiliate-link.com"
                                target="_blank"
                                className="mt-4 self-start bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                            >
                                Klaim Sekarang
                            </a>
                        </div>

                        {/* Card Kanan: Penawaran Author Blog */}
                        <div className="flex-1 p-6 bg-gradient-to-r from-green-500 to-lime-400 text-white rounded-xl shadow flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    ✍️ Jadi Author Blog
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed">
                                    Bergabung menjadi penulis kami dan bagikan
                                    artikel menarikmu ke pembaca blog kami.
                                    Sebagai author, kamu akan mendapatkan
                                    kesempatan untuk menulis konten berkualitas,
                                    meningkatkan personal branding, mendapatkan
                                    insight dari analytics pembaca, serta
                                    berpartisipasi dalam berbagai kegiatan
                                    edukatif dan komunitas yang kami
                                    selenggarakan. Semua ini bisa membantu
                                    mengembangkan karier dan jangkauan kontenmu
                                    secara profesional.
                                </p>
                            </div>
                            <a
                                href="/author-rules"
                                className="mt-4 self-start bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                            >
                                Lihat lebih lanjut
                            </a>
                        </div>
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
