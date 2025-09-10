import Sidebar from "@/Layouts/Sidebar";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

export default function Dashboard({
    posts,
    auth,
    postsStats,
    approvedPercentPost,
    lastPost,
    categories = [],
    authorStats,
    lastApplicant,
    authorPostsStats = null,
    lastAuthorPost = null,
}) {
    const approvedPercent =
        authorStats.total > 0
            ? (authorStats.published / authorStats.total) * 100
            : 0;
    return (
        <>
            <Head title="Dashboard" />

            <div className="flex min-h-screen ">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 p-6 ml-64">
                    {auth.user.role === "admin" && (
                        <div className="grid grid-cols-3 gap-4 mb-6 mt-10">
                            {/* ACC Post Blog */}
                            <div className="p-6 bg-white rounded-lg shadow border">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    Permohonan Publish Post
                                    {postsStats.pending > 0 && (
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                                            {postsStats.pending} pending
                                        </span>
                                    )}
                                </h3>

                                <ul className="text-sm space-y-2">
                                    <li className="flex justify-between">
                                        <span>Total</span>
                                        <span className="font-semibold text-indigo-600">
                                            {postsStats.total}
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Pending</span>
                                        <span className="font-semibold text-yellow-500">
                                            {postsStats.pending}
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Disetujui</span>
                                        <span className="font-semibold text-green-500">
                                            {postsStats.published}
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Ditolak</span>
                                        <span className="font-semibold text-red-500">
                                            {postsStats.rejected}
                                        </span>
                                    </li>
                                </ul>

                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{
                                                width: `${approvedPercentPost}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {approvedPercentPost.toFixed(0)}% post
                                        sudah disetujui
                                    </p>
                                </div>

                                {/* Last Post Pending */}
                                {lastPost && (
                                    <div className="mt-4 text-sm text-gray-600">
                                        <p className="font-medium text-gray-700">
                                            Post terbaru:
                                        </p>
                                        <p>{lastPost.title}</p>
                                        <p className="text-xs text-gray-400">
                                            {lastPost.author?.name}
                                        </p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="mt-4 flex gap-3">
                                    <Link
                                        href={route("posts.pending")}
                                        className="text-sm text-indigo-600 hover:underline"
                                    >
                                        Kelola semua →
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6 bg-white rounded-lg shadow border">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    Permohonan Author
                                    {authorStats.pending > 0 && (
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                                            {authorStats.pending} pending
                                        </span>
                                    )}
                                </h3>

                                <ul className="text-sm space-y-2">
                                    <li className="flex justify-between">
                                        <span>Total</span>
                                        <span className="font-semibold text-indigo-600">
                                            {authorStats.total}
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Pending</span>
                                        <span className="font-semibold text-yellow-500">
                                            {authorStats.pending}
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Disetujui</span>
                                        <span className="font-semibold text-green-500">
                                            {authorStats.approved}
                                        </span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Ditolak</span>
                                        <span className="font-semibold text-red-500">
                                            {authorStats.rejected}
                                        </span>
                                    </li>
                                </ul>

                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{
                                                width: `${approvedPercent}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {approvedPercent.toFixed(0)}% aplikasi
                                        sudah disetujui
                                    </p>
                                </div>

                                {/* Last Applicant */}
                                {lastApplicant && (
                                    <div className="mt-4 text-sm text-gray-600">
                                        <p className="font-medium text-gray-700">
                                            Pendaftar terbaru:
                                        </p>
                                        <p>{lastApplicant.name}</p>
                                        <p className="text-xs text-gray-400">
                                            {lastApplicant.email}
                                        </p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="mt-4 flex gap-3">
                                    <Link
                                        href={route("author.index")}
                                        className="text-sm text-indigo-600 hover:underline"
                                    >
                                        Kelola semua →
                                    </Link>
                                </div>
                            </div>
                            <div className="block p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center justify-between">
                                    <span>Kategori</span>
                                    <span className="text-xs text-gray-400">
                                        {categories.length} total
                                    </span>
                                </h2>

                                <ul className="text-sm text-gray-700 space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                    {categories.length > 0 ? (
                                        categories.map((cat) => (
                                            <li
                                                key={cat.id}
                                                className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition"
                                            >
                                                <span className="font-medium text-gray-800">
                                                    {cat.name}
                                                </span>
                                                <span className="text-gray-400 text-xs italic">
                                                    slug: {cat.slug}
                                                </span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-400 italic">
                                            Belum ada kategori
                                        </li>
                                    )}
                                </ul>

                                <Link
                                    href={route("categories.index")}
                                    className="mt-4 inline-block text-indigo-600 text-sm font-medium hover:text-indigo-800 hover:underline"
                                >
                                    Kelola kategori →
                                </Link>
                            </div>
                        </div>
                    )}
                    {/* Card khusus author */}
                    {auth.user.role === "author" && authorPostsStats && (
                        <div className="p-6 bg-white rounded-lg shadow border">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                Status Postingan Kamu
                                {authorPostsStats.pending > 0 && (
                                    <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                                        {authorPostsStats.pending} pending
                                    </span>
                                )}
                            </h3>

                            <ul className="text-sm space-y-2">
                                <li className="flex justify-between">
                                    <span>Total</span>
                                    <span className="font-semibold text-indigo-600">
                                        {authorPostsStats.total}
                                    </span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Pending</span>
                                    <span className="font-semibold text-yellow-500">
                                        {authorPostsStats.pending}
                                    </span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Disetujui</span>
                                    <span className="font-semibold text-green-500">
                                        {authorPostsStats.published}
                                    </span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Ditolak</span>
                                    <span className="font-semibold text-red-500">
                                        {authorPostsStats.rejected}
                                    </span>
                                </li>
                            </ul>

                            {lastAuthorPost && (
                                <div className="mt-4 text-sm text-gray-600">
                                    <p className="font-medium text-gray-700">
                                        Post terakhir:
                                    </p>
                                    <p>{lastAuthorPost.title}</p>
                                    <p className="text-xs text-gray-400">
                                        Status: {lastAuthorPost.status}
                                    </p>
                                </div>
                            )}

                            <div className="mt-4 flex gap-3">
                                <Link
                                    href={route("posts.manage")}
                                    className="text-sm text-indigo-600 hover:underline"
                                >
                                    Kelola semua →
                                </Link>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
