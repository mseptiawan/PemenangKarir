import { useForm } from "@inertiajs/react";

export default function EditComment({ comment }) {
    const { data, setData, put, processing, errors } = useForm({
        content: comment.content,
    });

    function submit(e) {
        e.preventDefault();
        put(route("comments.update", comment.id), {
            onSuccess: () => alert("Komentar berhasil diupdate"),
        });
    }

    return (
        <div className="max-w-xl mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Edit Komentar</h1>
            <form onSubmit={submit}>
                {/* Guest TIDAK perlu isi nama lagi */}
                <textarea
                    value={data.content}
                    onChange={(e) => setData("content", e.target.value)}
                    className="w-full rounded border px-3 py-2"
                    rows={5}
                />
                {errors.content && (
                    <div className="text-red-500 mt-1">{errors.content}</div>
                )}
                <button
                    type="submit"
                    disabled={processing}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    {processing ? "Menyimpan..." : "Update"}
                </button>
            </form>
        </div>
    );
}
