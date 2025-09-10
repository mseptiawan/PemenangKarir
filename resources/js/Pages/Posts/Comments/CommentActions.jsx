import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
export default function CommentActions({ comment, auth, onEdit }) {
    if (!comment) return null;

    // User login bisa edit/hapus miliknya sendiri
    const canEdit = auth.user && comment.user_id === auth.user.id;
    const canDelete =
        auth.user &&
        (comment.user_id === auth.user.id || auth.user.role === "admin");
    const handleDelete = () => {
        Swal.fire({
            title: "Yakin ingin menghapus komentar ini?",
            text: "Komentar akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("comments.destroy", comment.id));
                Swal.fire("Terhapus!", "Komentar berhasil dihapus.", "success");
            }
        });
    };

    return (
        <div className="flex gap-2">
            {canEdit && (
                <button
                    onClick={onEdit}
                    className="hover:underline text-sm text-blue-600"
                >
                    Edit
                </button>
            )}

            {canDelete && (
                <button
                    onClick={handleDelete}
                    className="hover:underline text-sm text-red-600"
                >
                    Hapus
                </button>
            )}
        </div>
    );
}
