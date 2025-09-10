import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import PostSummary from "./PostSummary";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    FaLinkedin,
    FaInstagram,
    FaFacebook,
    FaTwitter,
    FaWhatsapp,
    FaEnvelope,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import CommentForm from "./Comments/CommentForm";
import CommentList from "./Comments/CommentList";
import Sidebar from "@/Layouts/Sidebar";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { generateTOC } from "@/utils/generateTOC";

export default function Show({ post, auth, user }) {
    // const [toc, setToc] = useState([]);
    const [shareUrl, setShareUrl] = useState("");
    const role = auth?.user?.role;
    const { html, toc } = generateTOC(post.content);
    useEffect(() => {
        if (typeof window !== "undefined") {
            setShareUrl(window.location.href);
        }
    }, []);

    // useEffect(() => {
    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(post.content, "text/html");
    //     const headings = doc.querySelectorAll("h1, h2, h3");
    //     setToc(
    //         Array.from(headings).map((h, i) => ({
    //             text: h.textContent,
    //             id: h.id || `heading-${i}`,
    //             level: h.tagName.toLowerCase(),
    //         }))
    //     );
    // }, [post.content]);
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
                                    href="/posts/blog-home"
                                    className="hover:text-gray-800"
                                >
                                    Blog
                                </Link>{" "}
                                /{" "}
                                {post.categories &&
                                post.categories.length > 0 ? (
                                    post.categories.map((cat, i) => (
                                        <Link
                                            key={cat.id}
                                            href={route("posts.indexForGuest", {
                                                category: cat.slug,
                                            })}
                                            preserveScroll
                                            preserveState
                                            className="hover:text-gray-800"
                                        >
                                            {cat.name}
                                            {i < post.categories.length - 1 &&
                                                ", "}
                                        </Link>
                                    ))
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
                                {new Date(
                                    post.status === "pending"
                                        ? post.created_at
                                        : post.published_at
                                ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>

                            {/* Tombol share */}

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
                                    __html: html, // BUKAN post.content
                                }}
                            />
                            <div className="flex items-center gap-3 mt-20 mb-6">
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
                                    <FaLinkedin size={22} />
                                </a>

                                <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-pink-600 hover:text-pink-800 transition"
                                >
                                    <FaInstagram size={22} />
                                </a>

                                <a
                                    href={`mailto:?subject=${encodeURIComponent(
                                        post.title
                                    )}&body=${encodeURIComponent(shareUrl)}`}
                                    className="text-gray-600 hover:text-black transition"
                                >
                                    <FaEnvelope size={22} />
                                </a>

                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                        shareUrl
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-700 hover:text-blue-900 transition"
                                >
                                    <FaFacebook size={22} />
                                </a>

                                <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                        shareUrl
                                    )}&text=${encodeURIComponent(post.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sky-500 hover:text-sky-700 transition"
                                >
                                    <FaTwitter size={22} />
                                </a>

                                <a
                                    href={`https://wa.me/?text=${encodeURIComponent(
                                        shareUrl
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:text-green-800 transition"
                                >
                                    <FaWhatsapp size={22} />
                                </a>
                            </div>
                        </article>
                        {/* Card Author */}
                        <div className="mt-10 bg-white rounded-2xl shadow p-6 flex items-start gap-4">
                            <img
                                src={
                                    post.author?.profile_photo_url ||
                                    "/default-avatar.png"
                                }
                                alt={post.author?.full_name}
                                className="w-16 h-16 rounded-full object-cover border"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {post.author?.full_name}
                                </h3>
                                <p className="text-sm text-blue-600 font-medium">
                                    {post.author?.role
                                        ? post.author.role
                                              .charAt(0)
                                              .toUpperCase() +
                                          post.author.role.slice(1)
                                        : "Author"}
                                </p>

                                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                                    {post.author?.bio ||
                                        "Penulis belum menambahkan bio."}
                                </p>
                                <div className="flex space-x-4 mt-3">
                                    {post.author?.social_links?.linkedin && (
                                        <a
                                            href={
                                                post.author.social_links
                                                    .linkedin
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 hover:text-blue-800"
                                        >
                                            <FaLinkedin size={20} />
                                        </a>
                                    )}

                                    {post.author?.email && (
                                        <a
                                            href={`mailto:${post.author.email}`}
                                            className="text-gray-700 hover:text-gray-900"
                                        >
                                            <MdEmail size={20} />
                                        </a>
                                    )}

                                    {post.author?.social_links?.instagram && (
                                        <a
                                            href={
                                                post.author.social_links
                                                    .instagram
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-pink-600 hover:text-pink-700"
                                        >
                                            <FaInstagram size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Komentar */}
                        <section className="mt-12">
                            <div className="bg-white shadow rounded-2xl p-6">
                                <h2 className="text-2xl font-bold mb-4">
                                    Tulis Komentar
                                </h2>
                                <CommentForm postId={post.slug} auth={auth} />
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
