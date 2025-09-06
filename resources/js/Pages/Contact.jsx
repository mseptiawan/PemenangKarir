import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-hot-toast";
import FooterLayout from "@/Layouts/FooterLayout";
import { Head } from "@inertiajs/react";
import NavigationLayout from "@/Layouts/NavigationLayout";
const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        user_email: "",
        message: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_dfrrrjr",
                "template_nwfn9pp",
                e.target,
                "KA1948RXTL38AVhqi"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    toast.success("Terima kasih telah menghubungi kami.");
                },
                (error) => {
                    console.log(error.text);
                    toast.error("Opps, Terjadi kesalahan.");
                }
            );

        setFormData({ name: "", user_email: "", message: "" });
    };

    return (
        <>
            <NavigationLayout />
            <section
                className="-mt-10 text-black  font-outfit xs:text-sm md:text-medium"
                id="contact"
            >
                <Head title="Kontak" />

                <div className="mx-auto  max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <div className="mb-4">
                        <div className="mb-6  text-center sm:text-center md:mx-auto md:mb-12">
                            <h2 className="font-heading mb-4 text-center font-bold tracking-tight  text-3xl sm:text-5xl mt-2">
                                Hubungi kami
                            </h2>
                            <p className="mx-auto mt-4 max-w-3xl text-xl ">
                                Kami sangat menunggu kabar dari anda
                            </p>
                        </div>
                    </div>
                    <div className="flex items-stretch justify-center">
                        <div className="grid md:grid-cols-2">
                            <div className="h-full pr-6 mt-4">
                                <p className="mt-3  ml-4  ">
                                    Jika ada suatu hal yang membingungkan Anda,
                                    jangan sungkan untuk bertanya. Kami akan
                                    membaca dan membalas pesan Anda. Anda bisa
                                    menghubungi kami melalui formulir atau
                                    langsung kontak WhatsApp untuk informasi
                                    lebih lanjut.
                                </p>
                                <ul className=" md:mb-0">
                                    <li className="   ">
                                        <div className=" h-10 w-10  rounded text-gray-50"></div>
                                        <div className="ml-4 md:ml-4 ">
                                            <h3 className="text-lg font-medium leading-6">
                                                Alamat kami
                                            </h3>
                                            <p className="">
                                                Suka Maju, Kec. Sako, Kota
                                                Palembang, Sumatera Selatan,
                                                Indonesia.
                                            </p>
                                        </div>
                                    </li>
                                    <li className=" ">
                                        <div className=" h-10 w-10  rounded text-gray-50"></div>
                                        <div className="ml-4 md:ml-4">
                                            <h3 className=" text-lg font-medium leading-6">
                                                Kontak
                                            </h3>
                                            <p className="">
                                                Handphone: +62 896-3090-9617
                                            </p>
                                            <p className="">
                                                Email: mseptiawan017@gmail.com
                                            </p>
                                        </div>
                                    </li>
                                    <li className=" ">
                                        <div className=" h-10 w-10 rounded text-gray-50"></div>
                                        <div className="ml-4 md:ml-4">
                                            <h3 className=" text-lg font-medium leading-6">
                                                Jam kerja
                                            </h3>
                                            <p className="">
                                                Senin - Sabtu: 08:00 - 17:00
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div
                                className="card h-fit max-w-6xl p-5 md:p-12"
                                id="form"
                            >
                                <h2 className="mb-4 text-xl font-bold dark:text-white xs:mt-4 md:mt-0">
                                    Silahkan tanyakan pada kami
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-6">
                                        <div className="mx-0 mb-4">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Masukkan nama"
                                                className="mb-2 w-full text-black rounded-md border border-gray-700 py-2 pl-2 pr-4  font-outfit shadow-md"
                                                required
                                            />
                                        </div>
                                        <div className="mx-0 mb-4">
                                            <input
                                                type="email"
                                                name="user_email"
                                                value={formData.user_email}
                                                onChange={handleInputChange}
                                                placeholder="Masukkan alamat email"
                                                className="mb-2 w-full text-black rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md font-outfit"
                                                required
                                            />
                                        </div>
                                        <div className="mx-0 mb-4">
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                cols="30"
                                                rows="5"
                                                placeholder="Tulis pesanmu ..."
                                                className="mb-2 w-full text-black rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md font-outfit"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center relative">
                                        <button
                                            type="submit"
                                            className="w-full bg-black text-white shadow-xl border-2 border-double  px-6 py-3 font-bold rounded-md hover:scale-95 duration-75"
                                        >
                                            Kirim pesan
                                            <img
                                                src="images/klik-ikon.webp"
                                                alt="Ikon klik untuk melakukan tindakan"
                                                className="absolute   xs:w-10 xs:right-[60px] xs:top-4 md:right-[200px] w-10"
                                            />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterLayout />
        </>
    );
};

export default Contact;
