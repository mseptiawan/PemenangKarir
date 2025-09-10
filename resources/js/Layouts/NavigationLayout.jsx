import { useState } from "react";
import { Link } from "@inertiajs/react";

const NavigationLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className=" ">
            <div className="w-11/12 xxl:w-[1850px] mx-auto mt-2 ">
                <div className="flex items-center justify-between -mt-14">
                    <div className="flex items-center">
                        <Link
                            href={route("home")} // gunakan nama route Laravel
                            className="text-2xl font-bold"
                        >
                            {/* <p className="">
                                Pemenang Karir
                            </p> */}
                            <img
                                src="/images/logo.png"
                                alt="Logo"
                                className="  text-black mt-14  h-20"
                            />
                        </Link>
                            <h2 className="font-bold font-poppins text-2xl mt-12 ">Pemenang Karir</h2>

                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden sm:block mt-14">
                        <div className="ml-10 font-outfit relative">
                            <div className="flex space-x-2">
                                <Link
                                    href={route("home")}
                                    className={
                                        route().current("home")
                                            ? "block px-3 py-2 text-base font-medium text-black border-b-2 border-blue-500"
                                            : "block px-3 py-2  text-base font-medium text-black hover:border-b-2 hover:border-blue-400 transition"
                                    }
                                >
                                    Beranda
                                </Link>
                                <Link
                                    href={route("portfolio")}
                                    className={
                                        route().current("portfolio")
                                            ? "block px-3 py-2 text-base font-medium text-black border-b-2 border-blue-500"
                                            : "block px-3 py-2  text-base font-medium text-black hover:border-b-2 hover:border-blue-400 transition"
                                    }
                                >
                                    Portofolio Web
                                </Link>
                                <Link
                                    href={route("posts.indexForGuest")}
                                    className={
                                        route().current("posts.indexForGuest")
                                            ? "block px-3 py-2 text-base font-medium text-black border-b-2 border-blue-500"
                                            : "block px-3 py-2  text-base font-medium text-black hover:border-b-2 hover:border-blue-400 transition"
                                    }
                                >
                                    Blog Home
                                </Link>
                                <Link
                                    href={route("contact")}
                                    className={
                                        route().current("contact")
                                            ? "block px-3 py-2 text-base font-medium text-black border-b-2 border-blue-500"
                                            : "block px-3 py-2  text-base font-medium text-black hover:border-b-2 hover:border-blue-400 transition"
                                    }
                                >
                                    Kontak Kami
                                </Link>{" "}
                                <Link
                                    href={route("login")}
                                    active={route().current("login")}
                                    className="block shadow-lg bg-blue-600 text-white hover:bg-blue-500 px-3 py-2 rounded-full text-base font-medium "
                                    activeClassName="bg-black text-white"
                                >
                                    Masuk
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile toggle button */}
                    <div className="-mr-2 mt-16 flex sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                        >
                            <svg
                                className="h-9 w-9 text-black"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden pt-4">
                    <div className="px-2 ml-5 font-poppins pt-2 pb-3 space-y-1 sm:px-3 bg-[#f9fafb] border mx-4 rounded-lg border-[#0a0422b6]">
                        <Link
                            href={route("home")} // gunakan nama route Laravel
                            active={route().current("pemenang-karir")}
                            className="block px-3 py-2 rounded-md text-base font-medium text-black"
                            activeClassName="bg-black text-white"
                        ></Link>

                        <Link
                            href={route("portfolio")}
                            active={route().current("portofolio-web")}
                            className="block px-3 py-2 rounded-md text-base font-medium text-black"
                            activeClassName="bg-black text-white"
                        >
                            Portofolio web
                        </Link>

                        <Link
                            href={route("contact")}
                            active={route().current("hubungi-kami")}
                            className="block px-3 py-2 rounded-md text-base font-medium text-black"
                            activeClassName="bg-black text-white"
                        >
                            Kontak kami
                        </Link>
                        <Link
                            href={route("register")}
                            active={route().current("register")}
                            className="block px-3 py-2 rounded-md text-base font-medium text-black"
                            activeClassName="bg-black text-white"
                        >
                            Buat Akun
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavigationLayout;
