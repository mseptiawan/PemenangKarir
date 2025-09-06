import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import Tujuan from "./Landing/Tujuan";
import emailjs from "emailjs-com";
import Layanan from "./Landing/Layanan";
import Pertanyaan from "./Landing/Pertanyaan";
import Testimoni from "./Landing/Testimoni";
import Ajakan from "./Landing/Ajakan";
import FooterLayout from "@/Layouts/FooterLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NavigationLayout from "@/Layouts/NavigationLayout";

const Landing = () => {
    const [setServices] = useState([]);

    useEffect(() => {
        fetch("/data/layanan.json")
            .then((response) => response.json())
            .then((data) => setServices(data.services));
    }, []);

    emailjs.init("KA1948RXTL38AVhqi");
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            {" "}
            <div className="">
                <NavigationLayout />
                <div className=" mx-auto    font-outfit ">
                    <div className="">
                        <div className="md:flex md:justify-center md:space-x-36 -mt-12">
                            <div className=" lg:mt-52 lg:ml-20 lg:scale-[1.5] xs:mt-0 sm:mt-36 ss:ml-0 md:ml-20 sm:scale-[1.2] ">
                                <h2 className="xs:text-center md:text-left font-outfit text-lg xs:mt-20 md:mt-0 ">
                                    <span className="text-[#000000] font-bold">
                                        Penawaran menarik
                                    </span>
                                </h2>
                                <div className="xs:text-center md:text-left ">
                                    <h1 className="font-outfit text-2xl font-bold mb-2">
                                        Solusi IT & Konsultasi Karir di <br />{" "}
                                        Bidang Teknologi
                                        <br />
                                    </h1>
                                </div>

                                <h2 className="font-outfit xs:text-center text-lg  mb-2 md:text-left">
                                    Kami hadir untuk membantu bisnis dan <br />{" "}
                                    pengembangan karir Anda di dunia IT:
                                </h2>

                                <ul className="xs:block md:hidden flex flex-col items-center md:items-start text-center md:text-left mx-auto w-[300px]  text-sm ">
                                    <div className="ml-10">
                                        <li className="flex items-center -mb-2 ">
                                            <img
                                                src="/images/cek.webp"
                                                alt="Ikon check untuk menandai tindakan yang sudah selesai"
                                                className="w-10 "
                                            />
                                            <span>
                                                Pembuatan Website Profesional
                                            </span>
                                        </li>
                                        <li className="flex items-center -mb-2">
                                            <img
                                                src="/images/cek.webp"
                                                alt="Ikon check untuk menandai tindakan yang sudah selesai"
                                                className="w-10 "
                                            />
                                            <span>Jasa SEO Terpercaya</span>
                                        </li>
                                        <li className="flex items-center -mb-2">
                                            <img
                                                src="/images/cek.webp"
                                                alt="Ikon check untuk menandai tindakan yang sudah selesai"
                                                className="w-10 "
                                            />
                                            <span>
                                                Konsultasi Karir via Zoom
                                            </span>
                                        </li>
                                    </div>
                                </ul>

                                <ul className="xs:hidden md:block flex flex-col items-center md:items-start text-center md:text-left mx-auto font-outfit">
                                    <li className="flex items-center ">
                                        <img
                                            src="/images/cek.webp"
                                            alt="Ikon check untuk menandai tindakan yang sudah selesai"
                                            className="w-10 mr-2"
                                        />
                                        <span>
                                            Pembuatan Website Profesional.
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <img
                                            src="/images/cek.webp"
                                            alt="Ikon check untuk menandai tindakan yang sudah selesai"
                                            className="w-10 mr-2"
                                        />
                                        <span>Jasa SEO Terpercaya.</span>
                                    </li>
                                    <li className="flex items-center">
                                        <img
                                            src="/images/cek.webp"
                                            alt="Ikon check untuk menandai tindakan yang sudah selesai"
                                            className="w-10 mr-2"
                                        />
                                        <span>Konsultasi Karir via Zoom. </span>
                                    </li>
                                </ul>

                                <div className="flex flex-col xs:text-center md:text-left mt-4 mx-auto xs:items-center md:items-start">
                                    <div className="relative flex flex-col xs:items-center md:items-start space-y-4">
                                        <button
                                            onClick={() =>
                                                (window.location.href =
                                                    "https://wa.me/6289630909617?text=Halo...")
                                            }
                                            className="bg-white shadow-lg text-black font-bold md:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 xs:px-2 hover:scale-95 duration-75"
                                        >
                                            Mulai sekarang
                                            <img
                                                src="/images/klik-ikon.webp"
                                                alt="Ikon klik untuk melakukan tindakan"
                                                className="absolute top-4 right-1 w-10"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end xs:justify-center">
                                <img
                                    src="/images/latar-belakang-utama.webp"
                                    alt="Ikon background utama untuk elemen desain situs atau aplikasi"
                                    className="lg:w-[600px] ss:w-[500px] xs:w-[300px] "
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Tujuan />
                <Layanan />
                <Pertanyaan />
                <Testimoni />
                <Ajakan />
                <FooterLayout />
            </div>
        </div>
    );
};

export default Landing;
