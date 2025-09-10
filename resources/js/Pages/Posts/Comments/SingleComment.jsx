import { useState } from "react";
import { useForm } from "@inertiajs/react";
import CommentForm from "./CommentForm";
import CommentActions from "./CommentActions";

export default function SingleComment({ comment, postId, depth = 0, auth }) {
    const [replyOpen, setReplyOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        content: comment.content,
    });

    function submitEdit(e) {
        e.preventDefault();
        put(route("comments.update", comment.id), {
            onSuccess: () => setEditOpen(false),
        });
    }

    return (
        <div className={`mt-4 ${depth > 0 ? "ml-6" : ""}`}>
            <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                    {comment.user
                        ? comment.user.name.charAt(0).toUpperCase()
                        : "U"}
                </div>
                <div className="flex-1">
                    <div className="text-sm font-medium">
                        {comment.user
                            ? comment.user.name
                            : comment.guest_name ?? "Guest"}
                    </div>

                    {/* Konten komentar atau form edit */}
                    {editOpen ? (
                        <form onSubmit={submitEdit} className="mt-1">
                            <textarea
                                value={data.content}
                                onChange={(e) =>
                                    setData("content", e.target.value)
                                }
                                className="w-full rounded border px-3 py-2"
                                rows={3}
                            />
                            {errors.content && (
                                <div className="text-red-500 mt-1">
                                    {errors.content}
                                </div>
                            )}
                            <div className="mt-2 flex gap-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-3 py-1 bg-blue-600 text-white rounded"
                                >
                                    {processing ? "Menyimpan..." : "Update"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditOpen(false)}
                                    className="px-3 py-1 bg-gray-300 rounded"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                            {comment.content}
                        </div>
                    )}

                    {/* Actions tombol tetap dibawah konten utama */}
                    <div className="mt-2">
                        <CommentActions
                            comment={comment}
                            auth={auth}
                            onEdit={() => setEditOpen(true)}
                        />
                    </div>

                    {/* Reply button + tanggal */}
                    <div className="mt-2 flex gap-3 text-xs text-gray-500">
                        {depth < 2 && (
                            <button
                                onClick={() => setReplyOpen((s) => !s)}
                                className="hover:underline"
                            >
                                Balas
                            </button>
                        )}
                        <div>
                            {new Date(comment.created_at).toLocaleString(
                                "id-ID"
                            )}
                        </div>
                    </div>

                    {/* Form balas */}
                    {replyOpen && (
                        <div className="mt-2">
                            <CommentForm
                                postId={postId}
                                parentId={comment.id}
                                auth={auth}
                                onSuccess={() => setReplyOpen(false)}
                                placeholder={`Balas ke ${
                                    comment.user
                                        ? comment.user.name
                                        : comment.guest_name ?? "Guest"
                                }`}
                            />
                        </div>
                    )}

                    {/* Child comments */}
                    {/* Child comments */}
                    {comment.children &&
                        comment.children.length > 0 &&
                        depth < 2 && (
                            <div className="ml-6 mt-2">
                                {comment.children.map((c) => (
                                    <SingleComment
                                        key={c.id}
                                        comment={c}
                                        postId={postId}
                                        auth={auth}
                                        depth={depth + 1} // naikkan depth tiap level
                                    />
                                ))}
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}
