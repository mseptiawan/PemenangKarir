import Sidebar from "@/Layouts/Sidebar";
import { Head } from "@inertiajs/react";

export default function Dashboard({ posts }) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="flex min-h-screen ">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 p-6 ml-64">
                    <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

                    {posts.length === 0 ? (
                        <p className="text-gray-600">Belum ada post.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="bg-white rounded-xl shadow p-4 hover:shadow-md transition"
                                >
                                    <h2 className="text-lg font-semibold mb-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Status:{" "}
                                        <span
                                            className={`font-semibold ${
                                                post.status === "published"
                                                    ? "text-green-600"
                                                    : post.status === "pending"
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {post.status}
                                        </span>
                                    </p>

                                    {post.status === "rejected" && (
                                        <p className="text-sm text-red-500">
                                            Alasan ditolak:{" "}
                                            {post.rejection_reason ||
                                                "Tidak ada alasan"}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
