import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import PostSummary from "./PostSummary";
import { Head, Link, usePage } from "@inertiajs/react";
import { Linkedin, Instagram, Mail } from "lucide-react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import Sidebar from "@/Layouts/Sidebar";
import NavigationLayout from "@/Layouts/NavigationLayout";

export default function Show({ post, auth, user }) {
    const [toc, setToc] = useState([]);
    const [shareUrl, setShareUrl] = useState("");
    const role = auth?.user?.role;

    useEffect(() => {
        if (typeof window !== "undefined") {
            setShareUrl(window.location.href);
        }
    }, []);

    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(post.content, "text/html");
        const headings = doc.querySelectorAll("h1, h2, h3");
        setToc(
            Array.from(headings).map((h) => ({
                text: h.textContent,
                id: h.id || h.textContent.toLowerCase().replace(/\s+/g, "-"),
                level: h.tagName.toLowerCase(),
            }))
        );
    }, [post.content]);

    // Tentukan apakah user pakai sidebar atau nav biasa
    const useSidebar = role === "admin" || role === "author";

    return (
        <>
            <Head title={post.title} />

            {/* Kalau guest/reader, tampilkan NavigationLayout */}
            {!useSidebar && <NavigationLayout />}

            <div className="py-4 bg-gray-100">
                <div
                    className={`grid gap-8 max-w-7xl mx-auto px-4
                        ${
                            useSidebar
                                ? "lg:grid-cols-[16rem,1fr,20rem]"
                                : "lg:grid-cols-[1fr,20rem]"
                        }`}
                >
                    {/* Sidebar kiri untuk admin/author */}
                    {useSidebar && (
                        <aside className="hidden lg:block">
                            <Sidebar />
                        </aside>
                    )}

                    {/* Konten utama */}
                    <div>
                        <article className="prose max-w-none bg-white p-6 rounded-xl shadow">
                            {/* Breadcrumb */}
                            <nav className="text-sm text-gray-500 mb-4">
                                <Link href="/" className="hover:text-gray-800">
                                    Home
                                </Link>{" "}
                                /{" "}
                                <Link
                                    href="/blog"
                                    className="hover:text-gray-800"
                                >
                                    Blog
                                </Link>{" "}
                                /{" "}
                                {post.category ? (
                                    <Link
                                        href={`/blog/${post.category.slug}`}
                                        className="hover:text-gray-800"
                                    >
                                        {post.category.name}
                                    </Link>
                                ) : (
                                    <span className="text-gray-400 italic">
                                        Tanpa Kategori
                                    </span>
                                )}{" "}
                                /{" "}
                                <span className="text-gray-800">
                                    {post.title}
                                </span>
                            </nav>

                            {/* Judul & metadata */}
                            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
                                {post.title}
                            </h1>
                            <p className="mb-4 text-gray-600">
                                Ditulis oleh{" "}
                                <span className="font-medium text-gray-800">
                                    {post.author?.name}
                                </span>{" "}
                                •{" "}
                                {new Date(post.published_at).toLocaleDateString(
                                    "id-ID",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </p>

                            {/* Tombol share */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className="font-medium text-gray-700">
                                    Bagikan:
                                </span>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                        shareUrl
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 transition"
                                >
                                    <Linkedin size={22} />
                                </a>
                                <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-pink-600 hover:text-pink-800 transition"
                                >
                                    <Instagram size={22} />
                                </a>
                                <a
                                    href={`mailto:?subject=${encodeURIComponent(
                                        post.title
                                    )}&body=${encodeURIComponent(shareUrl)}`}
                                    className="text-gray-600 hover:text-black transition"
                                >
                                    <Mail size={22} />
                                </a>
                            </div>

                            {/* Thumbnail */}
                            <img
                                src={
                                    post.thumbnail
                                        ? `/storage/${post.thumbnail}`
                                        : "/default-thumbnail.png"
                                }
                                alt={post.title}
                                className="rounded-xl mb-6 w-full object-cover shadow"
                            />

                            {/* Isi artikel */}
                            <div
                                className="prose prose-lg prose-blue max-w-none text-gray-800"
                                dangerouslySetInnerHTML={{
                                    __html: post.content,
                                }}
                            />
                        </article>

                        {/* Komentar */}
                        <section className="mt-12">
                            <div className="bg-white shadow rounded-2xl p-6">
                                <h2 className="text-2xl font-bold mb-4">
                                    Tulis Komentar
                                </h2>
                                <CommentForm postId={post.slug} auth={auth} />
                                {!auth.user && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        Kamu berkomentar sebagai{" "}
                                        <span className="font-medium">
                                            Guest
                                        </span>
                                        .{" "}
                                        <Link
                                            href="/login"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Masuk
                                        </Link>{" "}
                                        jika ingin komentar dengan akunmu.
                                    </p>
                                )}
                            </div>

                            <div className="mt-6 bg-gray-50 border rounded-2xl p-6">
                                <h3 className="text-xl font-semibold mb-4">
                                    Komentar
                                </h3>
                                <CommentList
                                    comments={post.comments ?? []}
                                    postId={post.slug}
                                    auth={auth}
                                />
                            </div>
                        </section>
                    </div>

                    {/* Sidebar kanan (TOC + ringkasan) */}
                    <aside className="hidden lg:block space-y-6">
                        <PostSummary post={post} toc={toc} />
                    </aside>
                </div>
            </div>
        </>
    );
}
