import { useState } from "react";
import "sweetalert2/dist/sweetalert2.min.css";
import { Menu } from "@headlessui/react";
import {
    EllipsisVerticalIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import { Head, Link, router } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "@/Layouts/Sidebar";
export default function Index({ posts, auth, search: initialSearch }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletePostSlug, setDeletePostSlug] = useState(null);
    const [search, setSearch] = useState(initialSearch || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get("/posts/manage", { search }, { preserveState: true });
    };
    const openDeleteModal = (slug) => {
        setDeletePostSlug(slug);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeletePostSlug(null);
    };

    return (
        <>
            <Head title="Kelola Post" />
            <Toaster position="top-right" />

            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />

                {deleteModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                            <h3 className="text-lg font-bold mb-4">
                                Yakin ingin menghapus post ini?
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Data yang dihapus tidak bisa dikembalikan!
                            </p>
                            <div className="flex justify-end space-x-2">
                                <button
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                    onClick={closeDeleteModal}
                                >
                                    Batal
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    onClick={() => {
                                        router.delete(
                                            route("posts.destroy", {
                                                post: deletePostSlug,
                                            }),
                                            {
                                                onSuccess: () => {
                                                    toast.success(
                                                        "Post berhasil dihapus, anda bisa pulihkan!"
                                                    );
                                                    closeDeleteModal();
                                                },
                                                onError: () =>
                                                    toast.error(
                                                        "Gagal menghapus post."
                                                    ),
                                            }
                                        );
                                    }}
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 p-6 ml-64">
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

                    <h1 className="text-2xl font-bold mb-6">Daftar Blog</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {posts.data.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-xl shadow p-4 flex flex-col hover:shadow-md transition"
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
                                <h2 className="text-lg font-semibold mb-1">
                                    {post.title}
                                </h2>
                                <p className="text-gray-500 text-sm mb-1">
                                    {post.author?.name} &bull;{" "}
                                    {new Date(
                                        post.created_at
                                    ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                                <p className="text-gray-600 mb-3 text-sm">
                                    {post.excerpt ||
                                        post.content.substring(0, 60) + "..."}
                                </p>
                                <div className="flex mt-auto">
                                    <Menu as="div" className="relative ml-auto">
                                        <Menu.Button className="p-2 rounded-full hover:bg-gray-200">
                                            <EllipsisVerticalIcon className="w-6 h-6 text-gray-600" />
                                        </Menu.Button>

                                        <Menu.Items className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href={`/posts/${post.slug}`}
                                                        className={`block px-4 py-2 text-sm rounded ${
                                                            active
                                                                ? "bg-gray-100"
                                                                : ""
                                                        }`}
                                                    >
                                                        👁️ Lihat Detail
                                                    </Link>
                                                )}
                                            </Menu.Item>

                                            {(auth.user?.role === "admin" ||
                                                auth.user?.id ===
                                                    post.user_id) && (
                                                <>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                href={`/posts/${post.slug}/edit`}
                                                                className={`block px-4 py-2 text-sm rounded ${
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : ""
                                                                }`}
                                                            >
                                                                ✏️ Edit
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() =>
                                                                    openDeleteModal(
                                                                        post.slug
                                                                    )
                                                                }
                                                                className="w-full text-left block px-4 py-2 text-sm rounded text-red-600 hover:bg-red-100"
                                                            >
                                                                🗑️ Hapus
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </>
                                            )}
                                        </Menu.Items>
                                    </Menu>
                                </div>
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
