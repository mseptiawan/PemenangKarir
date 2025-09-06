import NavigationLayout from "@/Layouts/NavigationLayout";
import Sidebar from "@/Layouts/Sidebar";
import { Head, Link } from "@inertiajs/react";

export default function Index() {
    return (
        <>
            <Head title="Penulis" />

            <div className="">
                {/* Sidebar */}
                <NavigationLayout />

                {/* Main Content */}
                <main className="flex-1 p-6 ">
                    <div className="max-w-3xl mx-auto">
                        {/* Judul */}
                        <h1 className="text-3xl font-bold mb-6 text-gray-800">
                            Bergabung Jadi Author
                        </h1>

                        {/* Informasi */}
                        <div className="space-y-6 bg-white p-6 rounded-2xl shadow">
                            <section>
                                <h2 className="text-xl font-semibold text-gray-700">
                                    Ketentuan
                                </h2>
                                <p className="mt-2 text-gray-600 leading-relaxed">
                                    Author wajib menulis artikel asli, tidak
                                    mengandung plagiarisme, dan sesuai dengan
                                    tema blog.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-700">
                                    Syarat
                                </h2>
                                <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                                    <li>Minimal 18 tahun.</li>
                                    <li>
                                        Punya pengalaman menulis di
                                        blog/website.
                                    </li>
                                    <li>
                                        Bersedia mengikuti aturan editorial.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-700">
                                    Manfaat
                                </h2>
                                <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                                    <li>
                                        Nama kamu tampil sebagai author di blog.
                                    </li>
                                    <li>Jaringan dengan penulis lain.</li>
                                    <li>
                                        Kesempatan dapat honor / program
                                        affiliate.
                                    </li>
                                </ul>
                            </section>

                            {/* Call to Action */}
                            <div className="pt-4">
                                <Link
                                    href={route("author.create")}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
                                >
                                    Daftar Jadi Penulis
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
