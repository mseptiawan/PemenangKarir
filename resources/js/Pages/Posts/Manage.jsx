import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Head, Link, router } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Layouts/Sidebar";
export default function Manage({ posts, auth }) {
    const { delete: destroy } = useForm();
    return (
        <>
            <Head title="Kelola" />
            <Toaster position="top-right" />

            <div className="flex min-h-screen  bg-gray-100">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 p-6 ml-64">
                    <h1 className="text-2xl font-bold mb-6">Daftar Blog</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {posts.map((post) => (
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
                                        post.status === "published"
                                            ? post.published_at
                                            : post.created_at
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
                                            {/* Lihat Detail */}
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

                                            {/* Edit */}
                                            {(auth.user?.role === "admin" ||
                                                auth.user?.id ===
                                                    post.user_id) && (
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
                                            )}

                                            {/* Hapus */}
                                            {(auth.user?.role === "admin" ||
                                                auth.user?.id ===
                                                    post.user_id) && (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => {
                                                                router.delete(
                                                                    route(
                                                                        "posts.destroy",
                                                                        {
                                                                            post: post.slug,
                                                                        }
                                                                    ),
                                                                    {
                                                                        onSuccess:
                                                                            () =>
                                                                                toast.success(
                                                                                    "Post berhasil dihapus!"
                                                                                ),
                                                                        onError:
                                                                            () =>
                                                                                toast.error(
                                                                                    "Gagal menghapus post."
                                                                                ),
                                                                    }
                                                                );
                                                            }}
                                                            className={`w-full text-left block px-4 py-2 text-sm rounded ${
                                                                active
                                                                    ? "bg-red-100 text-red-700"
                                                                    : "text-red-600"
                                                            }`}
                                                        >
                                                            🗑️ Hapus
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            )}
                                        </Menu.Items>
                                    </Menu>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
