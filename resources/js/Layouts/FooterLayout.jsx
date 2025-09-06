import emailjs from "emailjs-com";
import { useEffect } from "react";
import { Link } from "@inertiajs/react";
const FooterLayout = () => {
    emailjs.init("KA1948RXTL38AVhqi");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="xs:bg-[url('/images/footer-2.svg')] lg:bg-[url('/images/footer-3.svg')] bg-cover  text-white bg-[#000000] ">
            <footer className="w-full font-outfit xs:text-medium md:text-lg ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12 gap-8 py-14 lg:grid-cols-8">
                        <div className="mb-0 col-span-full lg:col-span-3 ">
                            <Link
                                href="/"
                                className="flex items-center mt-2 gap-2"
                            >
                                <img
                                    src="/images/logo.png"
                                    alt="Logo"
                                    className="h-16 w-16"
                                />
                                <p className="text-2xl font-bold">
                                    | Pemenang Karir
                                </p>
                            </Link>

                            <p className="mt-6   ">
                                Kami hadir untuk memberikan wawasan mendalam
                                tentang IT, membantu kamu menggali kebutuhan
                                sistem pada bisnis, serta mengembangkannya agar
                                lebih efisien dan produktif.
                            </p>
                        </div>
                        <div className="w-full text-center lg:w-auto lg:text-left col-span-full sm:col-span-4 md:col-span-4 lg:col-span-2 ">
                            <div className="flex">
                                <h4 className="text-2xl  font-medium mb-7">
                                    | Kontak Kami
                                </h4>
                            </div>
                            <ul className=" transition-all duration-500">
                                <div className="flex">
                                    <li className="mb-6 ">
                                        mseptiawan017@gmail.com
                                    </li>
                                </div>
                                <div className="flex">
                                    <li className="mb-6 ">+62 896-3090-9617</li>
                                </div>
                                <div className="flex text-left">
                                    <li className="mb-6  ">
                                        Suka Maju, Kec. Sako, Kota Palembang,
                                        Sumatera Selatan, Indonesia.
                                    </li>
                                </div>
                            </ul>
                        </div>
                        <div className="w-full text-center lg:w-auto lg:text-left col-span-full sm:order-last sm:col-span-4 md:col-span-4 lg:order-none lg:col-span-1">
                            <div className="flex">
                                <h4 className="text-2xl font-medium mb-7">
                                    | Link cepat
                                </h4>
                            </div>
                            <ul className=" transition-all duration-500  ">
                                <li className="mb-6">
                                    <div className="flex space-x-2">
                                        <img
                                            src="images/sudut.webp"
                                            alt=""
                                            className="w-4 h-6 filter invert"
                                        />

                                        <Link href="/pemenang-karir">
                                            beranda
                                        </Link>
                                    </div>
                                </li>
                                <li className="mb-6">
                                    <div className="flex space-x-2">
                                        <img
                                            src="/images/sudut.webp"
                                            alt=""
                                            className="w-4 h-6 filter invert"
                                        />
                                        <a href="/pemenang-karir#paket">
                                            Pilihan website
                                        </a>
                                    </div>
                                </li>
                                <li className="mb-6">
                                    <div className="flex space-x-2">
                                        <img
                                            src="/images/sudut.webp"
                                            alt=""
                                            className="w-4 h-6 filter invert"
                                        />
                                        <Link href="/portofolio-web">
                                            Portofolio web
                                        </Link>
                                    </div>
                                </li>
                                <li className="sm:mb-6">
                                    <div className="flex space-x-2">
                                        <img
                                            src="/images/sudut.webp"
                                            alt=""
                                            className="w-4 h-6 filter invert"
                                        />
                                        <Link href="/hubungi-kami">
                                            Kontak kami
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="w-full text-center lg:w-auto lg:text-left col-span-full sm:col-span-4 md:col-span-4 lg:col-span-2 ">
                            <div className="flex">
                                <div className="flex">
                                    <h4 className="text-2xl text-center  font-medium mb-7 lg:text-left">
                                        | Sosial Media
                                    </h4>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 ">
                                <a
                                    href="https://www.instagram.com/agensiwebid/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex justify-center items-center w-16 h-16 bg-white rounded-xl scale-75 hover:scale-100 duration-75"
                                >
                                    <img
                                        src="/images/instagram.webp"
                                        alt="Ikon Instagram untuk mengunjungi profil kami"
                                        className="w-14 filter invert"
                                    />
                                </a>

                                <a
                                    href="https://wa.me/6287789035813?text=Halo.."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex justify-center items-center w-16 h-16 bg-white rounded-lg scale-75 hover:scale-100 duration-75"
                                >
                                    <img
                                        src="/images/whatsapp.webp"
                                        alt="Ikon WhatsApp untuk menghubungi kami"
                                        className="w-14 filter invert"
                                    />
                                </a>

                                <a
                                    href="mailto:mseptiawan017@gmail.com?subject=Halo.."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex justify-center items-center w-16 h-16 bg-white rounded-lg scale-75 hover:scale-100 duration-75"
                                >
                                    <img
                                        src="/images/email.webp"
                                        alt="Ikon email untuk menghubungi kami"
                                        className="w-14 filter invert"
                                    />
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/m-septiawan-771305246/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex justify-center items-center w-16 h-16 bg-white rounded-lg scale-75 hover:scale-100 duration-75"
                                >
                                    <img
                                        src="/images/linkedin.webp"
                                        alt="Ikon LinkedIn untuk mengunjungi profil kami"
                                        className="w-14 filter invert"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="py-7 border-t border-gray-200">
                        <div className="flex  justify-center text-center flex-col  lg:flex-row">
                            <span className="   ">
                                Copyright © 2025<a href=""> Pemenang Karir</a>,
                                Powered by Pemenang Karir.
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FooterLayout;
