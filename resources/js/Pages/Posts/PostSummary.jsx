import { useMemo } from "react";

function readingStatsFromHTML(html) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  const wpm = 200;
  const minutes = Math.max(1, Math.ceil(words / wpm));
  return { words, minutes };
}

export default function PostSummary({ post, toc }) {
  const { words, minutes } = useMemo(
    () => readingStatsFromHTML(post?.content || ""),
    [post?.content]
  );

  return (
    <aside className="w-full lg:w-80">
      <div className="sticky top-24 rounded-xl border bg-white shadow-sm p-4">
        <h3 className="font-semibold mb-2">Daftar Isi</h3>
        <ul className="space-y-1 text-sm">
          {toc.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="hover:underline">
                {item.text}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-4 text-xs text-gray-500">
          {words.toLocaleString()} kata • {minutes} menit baca
        </div>
      </div>
    </aside>
  );
}
