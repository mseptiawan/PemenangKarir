import Sidebar from "@/Layouts/Sidebar";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Pending({ posts }) {
    const [reasons, setReasons] = useState({});
    const form = useForm({ reason: "" });

    const reject = (slug) => {
        form.setData("reason", reasons[slug] || "");
        form.post(route("posts.reject", slug), {
            preserveScroll: true,
            onSuccess: () => setReasons((prev) => ({ ...prev, [slug]: "" })),
        });
    };

    const approve = (slug) => {
        form.post(route("posts.approve", slug));
    };

    return (
        <>
            <Head title="Pengajuan" />

            <div className="flex min-h-screen ">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 p-6 ml-64">
                    <h1 className="text-2xl font-bold mb-6">
                        Post Pending Approval
                    </h1>

                    {posts.length === 0 ? (
                        <p className="text-gray-600">Tidak ada post pending.</p>
                    ) : (
                        <div className="space-y-6">
                            {posts.map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
                                >
                                    {/* Info Post */}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="font-semibold text-lg mb-1">
                                                {p.title}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                Author: {p.author.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Tanggal:{" "}
                                                {new Date(
                                                    p.created_at
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Kategori:{" "}
                                                {p.category
                                                    ? p.category.name
                                                    : "Tanpa Kategori"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-4 flex gap-3">
                                        <button
                                            onClick={() => approve(p.slug)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                        >
                                            Approve
                                        </button>
                                    </div>

                                    {/* Reject Section */}
                                    <div className="mt-4">
                                        <textarea
                                            value={reasons[p.slug] || ""}
                                            onChange={(e) =>
                                                setReasons((prev) => ({
                                                    ...prev,
                                                    [p.slug]: e.target.value,
                                                }))
                                            }
                                            placeholder="Alasan tolak"
                                            className="border rounded-lg px-3 py-2 w-full resize-none focus:ring focus:ring-red-200"
                                            rows={3}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => reject(p.slug)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg mt-2 hover:bg-red-700 transition"
                                        >
                                            Reject
                                        </button>
                                        {form.errors.reason && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {form.errors.reason}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
