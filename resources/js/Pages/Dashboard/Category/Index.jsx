import React, { useState, useEffect } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "@/Layouts/Sidebar";

export default function CategoriesIndex({
    categories: parentCategories = [],
    flash,
}) {
    const { props } = usePage();
    // fallback ke props Inertia jika parent tidak kirim
    const { categories: initialCategories = [], flash: flashFromPage } = props;

    const [categories, setCategories] = useState(
        parentCategories.length ? parentCategories : initialCategories
    );
    const [editingId, setEditingId] = useState(null);

    const [createData, setCreateData] = useState({ name: "", slug: "" });
    const [editData, setEditData] = useState({ name: "", slug: "" });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        else if (flashFromPage?.success) toast.success(flashFromPage.success);
    }, [flash, flashFromPage]);
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = ""; // untuk trigger peringatan di browser
            // begitu user paksa refresh, redirect ke /categories
            router.visit("/categories");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    // ------------------- CREATE -------------------
    const handleCreateInput = (field, value) =>
        setCreateData((prev) => ({ ...prev, [field]: value }));

    const handleCreate = () => {
        if (!createData.name || !createData.slug) return;

        axios
            .post("/categories", createData)
            .then((res) => {
                setCategories(res.data.categories);
                setCreateData({ name: "", slug: "" });
                toast.success(res.data.flash.success);
            })
            .catch(() => toast.error("Gagal membuat kategori!"));
    };
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
    }, [flash]);

    // ------------------- EDIT -------------------
    const handleEdit = (cat) => {
        setEditingId(cat.id);
        setEditData({ name: cat.name, slug: cat.slug });
    };
    const handleEditInput = (field, value) =>
        setEditData((prev) => ({ ...prev, [field]: value }));

    const handleUpdate = (id) => {
        router.put(route("categories.update", id), editData, {
            preserveScroll: true,
            preserveState: true,
            replace: false,
            onSuccess: (page) => {
                setCategories(page.props.categories || []);
                setEditingId(null);
                toast.success("Kategori berhasil diperbarui!");
            },
            onError: () => toast.error("Gagal memperbarui kategori!"),
        });
    };

    // ------------------- DELETE -------------------
    const handleDelete = (id) => {
        if (!confirm("Yakin ingin menghapus kategori ini?")) return;

        router.delete(route("categories.destroy", id), {
            onSuccess: (page) => {
                setCategories(page.props.categories || []);
                toast.success("Kategori berhasil dihapus!");
            },
            onError: () => toast.error("Gagal menghapus kategori!"),
        });
    };

    return (
        <>
            <Head title="Kategori" />
            <Toaster position="top-right" />
            <Sidebar />

            <div className="max-w-4xl mx-auto p-6 ml-64">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    Kategori
                </h1>

                {/* Form Create */}
                <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded-xl shadow flex gap-2 items-center">
                    <input
                        type="text"
                        placeholder="Nama kategori"
                        value={createData.name}
                        onChange={(e) =>
                            handleCreateInput("name", e.target.value)
                        }
                        className="flex-1 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Slug"
                        value={createData.slug}
                        onChange={(e) =>
                            handleCreateInput("slug", e.target.value)
                        }
                        className="flex-1 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                    <button
                        onClick={handleCreate}
                        disabled={!createData.name || !createData.slug}
                        className={`px-3 py-1 rounded-lg text-sm transition
                            ${
                                !createData.name || !createData.slug
                                    ? "bg-gray-400 cursor-not-allowed text-gray-200"
                                    : "bg-green-500 hover:bg-green-600 text-white"
                            }`}
                    >
                        Tambah
                    </button>
                </div>

                {/* List Kategori */}
                <div className="grid grid-cols-1 gap-2">
                    {categories?.map((cat) => (
                        <div
                            key={cat.id}
                            className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded-xl shadow text-sm"
                        >
                            {editingId === cat.id ? (
                                <div className="flex gap-2 flex-1">
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) =>
                                            handleEditInput(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        className="flex-1 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={editData.slug}
                                        onChange={(e) =>
                                            handleEditInput(
                                                "slug",
                                                e.target.value
                                            )
                                        }
                                        className="flex-1 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    />
                                </div>
                            ) : (
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                                        {cat.name}
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        Slug: {cat.slug}
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-1">
                                {editingId === cat.id ? (
                                    <button
                                        onClick={() => handleUpdate(cat.id)}
                                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                                    >
                                        Simpan
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(cat)}
                                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                    {categories?.length === 0 && (
                        <p className="text-gray-500 text-sm mt-2">
                            Belum ada kategori.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
