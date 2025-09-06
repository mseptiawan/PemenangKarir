import { Bell } from "lucide-react";
import { useState } from "react";

export default function NavbarNotification() {
    const [open, setOpen] = useState(false);

    // Contoh dummy data notifikasi
    const notifications = [
        { id: 1, type: "success", message: "Pengajuan author kamu disetujui ✅" },
        { id: 2, type: "warning", message: "Revisi artikel sebelum publish ⚠️" },
        { id: 3, type: "error", message: "Pengajuan ditolak ❌" },
    ];

    return (
        <div className="relative ">
            {/* Icon lonceng */}
            <button
                onClick={() => setOpen(!open)}
                className="relative rounded-full p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            >
                <Bell className="h-6 w-6" />
                {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
                )}
            </button>

            {/* Dropdown notifikasi */}
            {open && (
                <div className="absolute right-0 mt-2 w-72 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 z-50">
                    <div className="p-3">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Notifikasi
                        </h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    {notif.message}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-sm text-gray-400">
                                Tidak ada notifikasi
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
