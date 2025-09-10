// resources/js/Pages/Blog/CommentList.jsx

import SingleComment from "./SingleComment";

export default function CommentList({ comments, postId, auth }) {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold">
                Komentar ({comments.length})
            </h3>
            <div className="ml-6 mt-2">
                {comments.length === 0 ? (
                    <div className="text-gray-500">
                        Belum ada komentar — jadi yang pertama nih.
                    </div>
                ) : null}
                {comments.map((c) => (
                    <SingleComment
                        key={c.id}
                        comment={c}
                        postId={postId}
                        auth={auth}
                    />
                ))}
            </div>
        </div>
    );
}
