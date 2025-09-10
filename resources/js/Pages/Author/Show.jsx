import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import Sidebar from "@/Layouts/Sidebar";

export default function Show() {
    const { props } = usePage();
    const { application } = props;

    const statusClasses = {
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
        pending: "bg-yellow-100 text-yellow-700",
    };

const statusText = {
    approved: "Disetujui",
    rejected: "Ditolak",
    pending: "Menunggu",
};
    return (
        <>
            <Head title="Detail Calon Penulis" />
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />

                <main className="flex-1 p-6 ml-64">
                    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                        <h1 className="text-2xl font-bold mb-8 text-gray-800">
                            Detail Pendaftaran Author
                        </h1>

                        <div className="space-y-6">
                            {/* Nama */}
                            <div>
                                <p className="font-semibold text-gray-700">
                                    Nama Lengkap
                                </p>
                                <p className="text-gray-600">
                                    {application.full_name}
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700">
                                    Email
                                </p>
                                <p className="text-gray-600">
                                    {application.email}
                                </p>
                            </div>
                            {/* Nomor HP */}
                            <div>
                                <p className="font-semibold text-gray-700">
                                    Nomor HP
                                </p>
                                <p className="text-gray-600">
                                    {application.phone || "-"}
                                </p>
                            </div>

                            {/* Alamat */}
                            <div>
                                <p className="font-semibold text-gray-700">
                                    Alamat
                                </p>
                                <p className="text-gray-600">
                                    {application.address || "-"}
                                </p>
                            </div>

                            {/* Bio */}
                            <div>
                                <p className="font-semibold text-gray-700">
                                    Bio Singkat
                                </p>
                                <p className="text-gray-600">
                                    {application.bio || "-"}
                                </p>
                            </div>

                            {/* Foto Profil */}
                            <div>
                                <p className="font-semibold text-gray-700">
                                    Foto Profil
                                </p>
                                {application.profile_photo ? (
                                    <img
                                        src={`/storage/${application.profile_photo}`}
                                        alt="Profile"
                                        className="w-32 h-32 object-cover rounded-full shadow mt-2"
                                    />
                                ) : (
                                    <p className="text-gray-600">-</p>
                                )}
                            </div>

                            {/* CV */}
                            <div>
                                <p className="font-semibold text-gray-700">
                                    CV
                                </p>
                                {application.cv ? (
                                    <a
                                        href={`/storage/${application.cv}`}
                                        target="_blank"
                                        className="text-indigo-600 hover:underline"
                                    >
                                        Lihat CV
                                    </a>
                                ) : (
                                    <p className="text-gray-600">-</p>
                                )}
                            </div>

                            {/* Social Links */}
                            <div>
                                <p className="font-semibold text-gray-700">
                                    Social Links
                                </p>
                                {application.social_links &&
                                Object.keys(application.social_links).length ? (
                                    <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                                        {Object.entries(
                                            application.social_links
                                        ).map(([key, value]) => (
                                            <li key={key}>
                                                <span className="capitalize">
                                                    {key}:
                                                </span>{" "}
                                                <a
                                                    href={value}
                                                    target="_blank"
                                                    className="text-indigo-600 hover:underline"
                                                >
                                                    {value}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600">-</p>
                                )}
                            </div>

                            {/* Keahlian */}
                            <div>
                                <p className="font-semibold text-gray-700">
                                    Keahlian / Tema
                                </p>
                                <p className="text-gray-600">
                                    {application.topic || "-"}
                                </p>
                            </div>

                            {/* Status */}
                            <div>
                                <p className="font-semibold text-gray-700">
                                    Status
                                </p>
                                <span
                                    className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded ${
                                        statusClasses[application.status]
                                    }`}
                                >
                                    {statusText[application.status]}
                                </span>
                            </div>
                        </div>

                        {/* Back Button */}
                        <div className="mt-8">
                            <Link
                                href={route("author.index")}
                                className="inline-block px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                            >
                                ← Kembali ke daftar
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
