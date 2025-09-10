import { Link, usePage } from "@inertiajs/react";
import {
    Home,
    FileText,
    LayoutDashboard,
    CircleDashed,
    Users,
    ClipboardList,
    Dock,
    ArrowsUpFromLine,
    LogOut,
    ArchiveRestore,
    Settings,
    ChartNoAxesGantt,
    ChevronDown,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
    const { auth } = usePage().props;
    const isProfilePage =
        route().current("profile.index") || route().current("password.edit");

    const [openProfile, setOpenProfile] = useState(isProfilePage);

    const role = auth?.user?.role;

    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg flex flex-col z-50">
            {/* Logo */}
            <div className="flex items-center justify-center h-16 border-b ">
                <Link href="/" className="flex items-center mt-2 ">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        className="h-16 w-16 "
                    />
                    <p className="text-2xl font-bold  ">Pemenang Karir</p>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {/* Guest */}

                {/* Author */}
                {role === "author" && (
                    <>
                        <Link
                            href={route("dashboard")}
                            className={
                                route().current("dashboard")
                                    ? "flex items-center space-x-3 px-3 py-2 text-blue-600 font-semibold"
                                    : "flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                            }
                        >
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </Link>

                        <Link
                            href={route("posts.index")}
                            className={
                                route().current("posts.index")
                                    ? "flex items-center space-x-3 px-3 py-2 text-blue-600 font-semibold"
                                    : "flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                            }
                        >
                            <Home size={20} />
                            <span>Blog Home</span>
                        </Link>
                        <Link
                            href={route("posts.create")}
                            className={
                                route().current("posts.create")
                                    ? "flex items-center space-x-3 px-3 py-2 text-blue-600 font-semibold"
                                    : "flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                            }
                        >
                            <ArrowsUpFromLine size={20} />
                            <span>Posting</span>
                        </Link>
                        <Link
                            href={route("posts.manage")}
                            className={
                                route().current("posts.manage")
                                    ? "flex items-center space-x-3 px-3 py-2 text-blue-600 font-semibold"
                                    : "flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                            }
                        >
                            <ChartNoAxesGantt size={20} />
                            <span>Kelola</span>
                        </Link>

                        <Link
                            href={route("restore.index")}
                            className={
                                route().current("restore.index")
                                    ? "flex items-center space-x-3 px-3 py-2 text-blue-600 font-semibold"
                                    : "flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                            }
                        >
                            <ArchiveRestore size={20} />
                            <span>Restore Post</span>
                        </Link>
                    </>
                )}

                {/* Admin */}
                {role === "admin" && (
                    <>
                        <Link
                            href={route("dashboard")}
                            className={
                                route().current("dashboard")
                                    ? "flex items-center space-x-3 px-3 py-2 text-blue-600 font-semibold"
                                    : "flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                            }
                        >
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </Link>

                        <Link
                            href={route("posts.index")}
                            className={
                                route().current("posts.index")
                                    ? "flex items-center space-x-3 px-3 py-2 text-blue-600 font-semibold"
                                    : "flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                            }
                        >
                            <Home size={20} />
                            <span>Blog Home</span>
                        </Link>

                        <Link
                            href={route("posts.create")}
                            className={
                                route().current("posts.create")
                                    ? "flex items-center space-x-3 px-3 py-2 text-blue-600 font-semibold"
                                    : "flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                            }
                        >
                            <ArrowsUpFromLine size={20} />
                            <span>Posting</span>
                        </Link>

                        <Link
                            href={route("posts.manage")}
                            className={
                                route().current("posts.manage")
                                    ? "flex items-center space-x-3 px-3 py-2 text-blue-600 font-semibold"
                                    : "flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                            }
                        >
                            <ChartNoAxesGantt size={20} />
                            <span>Kelola</span>
                        </Link>
                        <Link
                            href={route("restore.index")}
                            className={
                                route().current("restore.index")
                                    ? "flex items-center space-x-3 px-3 py-2 text-blue-600 font-semibold"
                                    : "flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                            }
                        >
                            <ArchiveRestore size={20} />
                            <span>Restore Post</span>
                        </Link>
                        <Link
                            href={route("posts.pending")}
                            className={
                                route().current("posts.pending")
                                    ? "flex items-center space-x-3 px-3 py-2 text-blue-600 font-semibold"
                                    : "flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                            }
                        >
                            <CircleDashed size={20} />
                            <span>Post Pending</span>
                        </Link>

                        <Link
                            href={route("author.index")}
                            className={
                                route().current("author.index")
                                    ? "flex items-center space-x-3 px-3 py-2 text-blue-600 font-semibold"
                                    : "flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-blue-600 transition"
                            }
                        >
                            <Dock size={20} />
                            <span>Author Applications</span>
                        </Link>
                    </>
                )}

                {/* Profile dropdown */}
                {auth?.user && (
                    <div>
                        <button
                            onClick={() => setOpenProfile(!openProfile)}
                            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
                        >
                            <div className="flex items-center space-x-3">
                                <Settings size={20} />
                                <span>Profil</span>
                            </div>
                            <ChevronDown
                                size={18}
                                className={`transition-transform duration-200 ${
                                    openProfile ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {openProfile && (
                            <div className="ml-8 mt-1 flex flex-col space-y-1">
                                <Link
                                    href={route("profile.index")}
                                    className={
                                        route().current("profile.index")
                                            ? "px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold"
                                            : "px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
                                    }
                                >
                                    Profile
                                </Link>

                                <Link
                                    href={route("password.edit")}
                                    className={
                                        route().current("password.edit")
                                            ? "px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-semibold"
                                            : "px-3 py-2 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition"
                                    }
                                >
                                    Ganti Kata Sandi
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </nav>

            {/* Profile Section */}
            {auth?.user && (
                <div className="border-t p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img
                            src={
                                auth?.user?.profile_photo_url ??
                                "/images/profile.png"
                            }
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                {auth?.user?.name ?? "Guest"}
                            </p>
                        </div>
                    </div>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="p-2 rounded-full hover:bg-red-100 text-red-600"
                    >
                        <LogOut size={18} />
                    </Link>
                </div>
            )}
        </aside>
    );
}
