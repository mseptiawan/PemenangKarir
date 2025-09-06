import toast, { Toaster } from "react-hot-toast";
import { Head, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

import React, { useRef, useMemo } from "react";
import { useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Layouts/Sidebar";

export default function Edit({ post, categories }) {
    const quillRef = useRef();
    const { flash } = usePage().props;

    const imageHandler = () => {
        const url = prompt("Masukkan URL gambar:");
        if (url) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            quill.insertEmbed(range.index, "image", url);
        }
    };

    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category_id: post.category_id,
        thumbnail: null,
        status: post.status,
        meta_title: post.meta_title,
        meta_description: post.meta_description,
        meta_keywords: post.meta_keywords,
    });

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);
    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("posts.update", post.slug), {
            onSuccess: () => {
                toast.success("Post berhasil diupdate!");
            },
            onError: () => {
                toast.error("Gagal mengupdate post.");
            },
        });
    };

    const handleFileChange = (e) => {
        setData("thumbnail", e.target.files[0]);
    };

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                ],
                handlers: { image: imageHandler },
            },
        }),
        []
    );

    return (
        <>
            <div className="flex">
                <Sidebar />
                <main className="ml-64 flex-1 p-8 bg-gray-100">
                    <Head title="Edit Postingan" />

                    <Toaster position="top-right" />
                    <div className="max-w-3xl mx-auto mt-12">
                        <div className="bg-white rounded-2xl shadow p-8 space-y-8">
                            <h1 className="text-3xl font-bold text-gray-800">
                                ✍️ Edit Post
                            </h1>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                                encType="multipart/form-data"
                            >
                                {/* Thumbnail */}
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Thumbnail
                                    </label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    {post.thumbnail && (
                                        <img
                                            src={`/storage/${post.thumbnail}`}
                                            alt="Thumbnail"
                                            className="mt-2 w-32 h-20 object-cover rounded"
                                        />
                                    )}
                                    {errors.thumbnail && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.thumbnail}
                                        </p>
                                    )}
                                </div>

                                {/* Judul */}
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Judul
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                {/* Slug */}
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Slug
                                    </label>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData("slug", e.target.value)
                                        }
                                        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    {errors.slug && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.slug}
                                        </p>
                                    )}
                                </div>

                                {/* Excerpt */}
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Excerpt
                                    </label>
                                    <textarea
                                        value={data.excerpt}
                                        onChange={(e) =>
                                            setData("excerpt", e.target.value)
                                        }
                                        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        rows="3"
                                    />
                                    {errors.excerpt && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.excerpt}
                                        </p>
                                    )}
                                </div>

                                {/* Konten */}
                                <div>
                                    <label className="block text-sm font-semibold mb-1">
                                        Konten
                                    </label>
                                    <ReactQuill
                                        ref={quillRef}
                                        value={data.content}
                                        onChange={(val) =>
                                            setData("content", val)
                                        }
                                        modules={modules}
                                        style={{ minHeight: "10px" }}
                                        className="bg-white rounded-lg"
                                    />
                                    {errors.content && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.content}
                                        </p>
                                    )}
                                </div>

                                {/* Kategori & Status */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">
                                            Kategori
                                        </label>
                                        <select
                                            value={data.category_id}
                                            onChange={(e) =>
                                                setData(
                                                    "category_id",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        >
                                            <option value="">
                                                Pilih kategori
                                            </option>
                                            {categories.map((cat) => (
                                                <option
                                                    key={cat.id}
                                                    value={cat.id}
                                                >
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category_id && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.category_id}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">
                                            Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) =>
                                                setData(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">
                                                Published
                                            </option>
                                        </select>
                                        {errors.status && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.status}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* SEO Section */}
                                <div className="border-t pt-6 space-y-4">
                                    <h2 className="text-lg font-semibold text-gray-700">
                                        SEO Metadata
                                    </h2>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">
                                            Meta Title
                                        </label>
                                        <input
                                            type="text"
                                            value={data.meta_title}
                                            onChange={(e) =>
                                                setData(
                                                    "meta_title",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                        {errors.meta_title && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.meta_title}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">
                                            Meta Description
                                        </label>
                                        <textarea
                                            value={data.meta_description}
                                            onChange={(e) =>
                                                setData(
                                                    "meta_description",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            rows="2"
                                        />
                                        {errors.meta_description && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.meta_description}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1">
                                            Meta Keywords
                                        </label>
                                        <input
                                            type="text"
                                            value={data.meta_keywords}
                                            onChange={(e) =>
                                                setData(
                                                    "meta_keywords",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        />
                                        {errors.meta_keywords && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {errors.meta_keywords}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 w-full py-3 rounded-xl text-white font-semibold shadow hover:bg-blue-700 transition"
                                    >
                                        {processing
                                            ? "⏳ Menyimpan..."
                                            : "🚀 Update Postingan"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
