import { Head, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef } from "react";
import { useMemo } from "react";
import Select from "react-select";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Layouts/Sidebar";
export default function Create({ categories }) {
    const options = categories.map((cat) => ({
        value: cat.id,
        label: cat.name,
    }));
    const quillRef = useRef();
    const imageHandler = () => {
        const url = prompt("Masukkan URL gambar:");
        if (url) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            quill.insertEmbed(range.index, "image", url);
        }
    };
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        categories: [],
        thumbnail: null,
        status: "draft",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("posts.store"));
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
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "link",
        "image",
    ];

    return (
        <>
            <Head title="Buat Postingan" />
            <div className="flex min-h-screen ml-64 ">
                <Sidebar />
                <main className="flex-1 flex items-center justify-center p-6">
                    <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8 space-y-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            ✍️ Buat Post Baru
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
                                    placeholder="Tulis judul yang menarik..."
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
                                    placeholder="contoh-slug-post"
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
                                    placeholder="Tulis ringkasan singkat..."
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
  onChange={(val) => setData("content", val)}
  modules={modules}
  formats={formats}
  style={{ minHeight: "200px" }}
  className="bg-white rounded-lg"
/>

                                {errors.content && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.content}
                                    </p>
                                )}
                            </div>
                            {/* Kategori & Status */}
                            <Select
                                isMulti
                                name="categories"
                                options={options}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={options.filter((o) =>
                                    data.categories.includes(o.value)
                                )}
                                onChange={(selected) =>
                                    setData(
                                        "categories",
                                        selected
                                            ? selected.map((s) => s.value)
                                            : []
                                    )
                                }
                                placeholder="Cari & pilih kategori..."
                            />
                            {errors.categories && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.categories}
                                </p>
                            )}
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
                                        : "🚀 Simpan Postingan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
