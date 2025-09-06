import { EyeIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "@/Layouts/Sidebar";

export default function Applications() {
    const { props } = usePage();
    const { applications, flash } = props;

    React.useEffect(() => {
        if (flash?.success) toast.success(flash.success);
    }, [flash]);

    const handleAction = (id, action) => {
        router.post(route(`author.applications.${action}`, id));
    };

    const statusClasses = {
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
        pending: "bg-yellow-100 text-yellow-700",
    };

    return (
        <>
            <Head title="Pengajuan Penulis" />
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />

                <main className="flex-1 p-6 ml-64">
                    <div className="max-w-5xl mx-auto">
                        <Toaster position="top-right" />
                        <h1 className="text-3xl font-bold mb-8 text-gray-800">
                            Daftar Pendaftaran Author
                        </h1>

                        <div className="space-y-4">
                            {applications.map((app) => (
                                <div
                                    key={app.id}
                                    className="bg-white shadow-md rounded-xl p-6 flex justify-between items-center"
                                >
                                    {/* Info Aplikasi */}
                                    <div>
                                        <p className="font-semibold text-lg text-gray-800">
                                            {app.full_name}
                                        </p>
                                        <span
                                            className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded ${
                                                statusClasses[app.status]
                                            }`}
                                        >
                                            {app.status}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center space-x-2">
                                        {app.status === "pending" ? (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleAction(
                                                            app.id,
                                                            "approve"
                                                        )
                                                    }
                                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleAction(
                                                            app.id,
                                                            "reject"
                                                        )
                                                    }
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : null}

                                        <Link
                                            href={route(
                                                "author.applications.show",
                                                app.id
                                            )}
                                            className="inline-flex items-center px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                                        >
                                            <EyeIcon className="w-5 h-5 mr-1 text-gray-700" />
                                            Lihat
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
