// resources/js/Pages/Blog/CommentForm.jsx
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function CommentForm({
    postId,
    auth,
    parentId = null,
    onSuccess = () => {},
    placeholder = "Tulis komentar...",
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        content: "",
        parent_id: parentId,
        guest_name: "", // tambahan untuk guest
    });

    useEffect(() => {
        setData("parent_id", parentId);
    }, [parentId]);

    function submit(e) {
        e.preventDefault();
        post(route("posts.comments.store", postId), {
            onSuccess: () => {
                reset("content", "guest_name");
                onSuccess();
            },
        });
    }

    return (
        <form onSubmit={submit} className="mt-3 space-y-3">
            {/* Kalau user belum login, tampilkan field Nama */}
            {!auth.user && (
                <div>
                    <input
                        type="text"
                        value={data.guest_name}
                        onChange={(e) => setData("guest_name", e.target.value)}
                        placeholder="Nama kamu"
                        className="w-full rounded border px-3 py-2"
                    />
                    {errors.guest_name && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.guest_name}
                        </div>
                    )}
                </div>
            )}

            <div>
                <textarea
                    value={data.content}
                    onChange={(e) => setData("content", e.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded border px-3 py-2 resize-y"
                    rows={3}
                />
                {errors.content && (
                    <div className="text-red-500 text-sm mt-1">
                        {errors.content}
                    </div>
                )}
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-blue-700"
                >
                    {processing ? "Kirim..." : parentId ? "Balas" : "Komentar"}
                </button>
            </div>
        </form>
    );
}
