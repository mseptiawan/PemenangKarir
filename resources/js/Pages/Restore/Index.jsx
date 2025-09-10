import { router } from "@inertiajs/react";
import React, { useState } from "react";
import { ArrowPathIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "@/Layouts/Sidebar";

export default function RestoreIndex({ posts }) {
    const [postsState, setPostsState] = useState(posts || []);
    const [selected, setSelected] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [modalPost, setModalPost] = useState(null);

    const toggleSelect = (id) =>
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );

    const openSingleRestoreModal = (post) => {
        setModalType("restore-single");
        setModalPost(post);
        setModalOpen(true);
    };

    const openBulkRestoreModal = () => {
        if (selected.length === 0) return toast.error("Pilih minimal 1 post");
        setModalType("restore-bulk");
        setModalPost(null);
        setModalOpen(true);
    };

    const openSingleDeleteModal = (post) => {
        setModalType("delete-single");
        setModalPost(post);
        setModalOpen(true);
    };

    const openBulkDeleteModal = () => {
        if (selected.length === 0) return toast.error("Pilih minimal 1 post");
        setModalType("delete-bulk");
        setModalPost(null);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalPost(null);
        setModalType(null);
    };

    const restorePost = () => {
        if (!modalPost?.id) return;
        const id = modalPost.id;
        closeModal();
        router.post(
            route("restore.restore", id),
            {},
            {
                onSuccess: () => {
                    toast.success("Post berhasil dipulihkan!");
                    setPostsState((prev) => prev.filter((p) => p.id !== id));
                    setSelected((prev) => prev.filter((i) => i !== id));
                },
                onError: () => toast.error("Gagal memulihkan post."),
            }
        );
    };

    const restoreSelected = () => {
        if (selected.length === 0) return;
        const ids = selected;
        closeModal();
        router.post(
            route("restore.restoreSelected"),
            { ids },
            {
                onSuccess: () => {
                    toast.success("Post terpilih berhasil dipulihkan!");
                    setPostsState((prev) =>
                        prev.filter((p) => !ids.includes(p.id))
                    );
                    setSelected([]);
                },
                onError: () => toast.error("Gagal memulihkan post."),
            }
        );
    };

    const deletePost = () => {
        if (!modalPost?.id) return;
        const id = modalPost.id;
        closeModal();
        router.delete(route("restore.forceDeleteSelected"), {
            data: { ids: [id] },
            onSuccess: () => {
                toast.success("Post berhasil dihapus permanen!");
                setPostsState((prev) => prev.filter((p) => p.id !== id));
                setSelected((prev) => prev.filter((i) => i !== id));
            },
            onError: () => toast.error("Gagal menghapus post."),
        });
    };

    const deleteSelected = () => {
        if (selected.length === 0) return;
        const ids = selected;
        closeModal();
        router.delete(route("restore.forceDeleteSelected"), {
            data: { ids },
            onSuccess: () => {
                toast.success("Post terpilih berhasil dihapus permanen!");
                setPostsState((prev) =>
                    prev.filter((p) => !ids.includes(p.id))
                );
                setSelected([]);
            },
            onError: () => toast.error("Gagal menghapus post."),
        });
    };

    const openDetailModal = (post) => {
        setModalPost(post);
        setDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setDetailModalOpen(false);
        setModalPost(null);
    };

    return (
        <>
            <Sidebar />
            <div className="p-6 ml-64 min-h-screen bg-gray-100">
                <Toaster position="top-right" />
                <h1 className="text-3xl font-bold mb-6 text-gray-900">
                    Pulihkan / Hapus Permanen Postingan
                </h1>

                {postsState.length > 0 ? (
                    <>
                        <div className="flex gap-3 mb-6">
                            <button
                                onClick={openBulkRestoreModal}
                                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
                            >
                                Pulihkan Terpilih
                            </button>

                            <button
                                onClick={openBulkDeleteModal}
                                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition"
                            >
                                Hapus Permanen Terpilih
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {postsState.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col overflow-hidden"
                                >
                                    <div className="p-4 flex flex-col flex-1">
                                        <div className="flex justify-between items-start mb-3">
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(
                                                    post.id
                                                )}
                                                onChange={() =>
                                                    toggleSelect(post.id)
                                                }
                                                className="h-5 w-5 text-blue-600"
                                            />
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        openSingleRestoreModal(
                                                            post
                                                        )
                                                    }
                                                    className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition"
                                                    title="Pulihkan"
                                                >
                                                    <ArrowPathIcon className="h-5 w-5 text-green-600" />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        openSingleDeleteModal(
                                                            post
                                                        )
                                                    }
                                                    className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition"
                                                    title="Hapus Permanen"
                                                >
                                                    <TrashIcon className="h-5 w-5 text-red-600" />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        openDetailModal(post)
                                                    }
                                                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                                                    title="Detail"
                                                >
                                                    <EyeIcon className="h-5 w-5 text-gray-600" />
                                                </button>
                                            </div>
                                        </div>

                                        <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-500 text-sm mb-2 truncate">
                                            {post.author?.name}
                                        </p>
                                        <p className="text-gray-600 text-sm flex-1 line-clamp-3">
                                            {post.excerpt ||
                                                (post.content
                                                    ? post.content.substring(
                                                          0,
                                                          80
                                                      ) + "..."
                                                    : "")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500 text-lg">
                        Tidak ada post yang dihapus.
                    </p>
                )}

                {/* Confirm Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                            <h3 className="text-xl font-bold mb-4">
                                {modalType === "restore-single" &&
                                    "Yakin ingin memulihkan post ini?"}
                                {modalType === "restore-bulk" &&
                                    "Yakin ingin memulihkan semua post terpilih?"}
                                {modalType === "delete-single" &&
                                    "Yakin ingin menghapus permanen post ini? Tindakan ini tidak bisa dibatalkan."}
                                {modalType === "delete-bulk" &&
                                    "Yakin ingin menghapus permanen semua post terpilih? Tindakan ini tidak bisa dibatalkan."}
                            </h3>

                            <div className="flex justify-end space-x-3 mt-4">
                                <button
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                    onClick={closeModal}
                                >
                                    Batal
                                </button>

                                {modalType?.startsWith("restore") && (
                                    <button
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        onClick={
                                            modalType === "restore-single"
                                                ? restorePost
                                                : restoreSelected
                                        }
                                    >
                                        Pulihkan
                                    </button>
                                )}

                                {modalType?.startsWith("delete") && (
                                    <button
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                        onClick={
                                            modalType === "delete-single"
                                                ? deletePost
                                                : deleteSelected
                                        }
                                    >
                                        Hapus Permanen
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Detail Modal */}
                {detailModalOpen && modalPost && (
                    <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 overflow-auto p-6">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl my-8">
                            <div className="flex justify-end p-4 border-b">
                                <button
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                    onClick={closeDetailModal}
                                >
                                    Tutup
                                </button>
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-2 text-gray-900">
                                    {modalPost.title}
                                </h2>
                                <p className="text-gray-500 text-sm mb-4">
                                    Oleh: {modalPost.author?.name}
                                </p>
                                <div className="prose prose-lg max-w-none text-gray-800">
                                    <p>{modalPost.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
