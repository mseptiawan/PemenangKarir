import { Link } from "@inertiajs/react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Halaman tidak ditemukan
            </h2>
            <p className="text-gray-500 mb-8 text-center">
                Maaf, halaman yang kamu cari mungkin telah dipindahkan atau
                tidak ada.
            </p>
            <Link
                href={route("home")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
}
