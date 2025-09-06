import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function ReviewPost({ post }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-6xl mx-auto mt-8">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-4">
                    <Link href="/" className="hover:text-gray-800">
                        Home
                    </Link>{" "}
                    /{" "}
                    <Link href="/blog" className="hover:text-gray-800">
                        Blog
                    </Link>{" "}
                    /{" "}
                    {post.category ? (
                        <Link
                            href={`/blog/${post.category.slug}`}
                            className="hover:text-gray-800"
                        >
                            {post.category.name}
                        </Link>
                    ) : (
                        <span className="text-gray-400 italic">
                            Tanpa Kategori
                        </span>
                    )}{" "}
                    / <span className="text-gray-800">{post.title}</span>
                </nav>

                {/* Judul & info */}
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
                        post.published_at || post.created_at
                    ).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </p>

                {/* Thumbnail */}
                {post.thumbnail && (
                    <img
                        src={`/storage/${post.thumbnail}`}
                        alt={post.title}
                        className="rounded-xl mb-6 w-full object-cover shadow"
                    />
                )}

                {/* Konten full */}
                <div
                    className="prose prose-lg prose-blue max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </AuthenticatedLayout>
    );
}
