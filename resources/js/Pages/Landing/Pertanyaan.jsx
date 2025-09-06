import { useState } from "react";

const Pertanyaan = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [openIndex2, setOpenIndex2] = useState(null);
    const questionsAndAnswers = [
        {
            question: "Website apa saja yang bisa dibuat di sini??",
            answer: "Kami dapat membuat berbagai jenis website, seperti: Company Profile Landing Page (satu halaman untuk promosi/penawaran) Aplikasi berbasis website (contoh: perpustakaan online, absensi online, dan lainnya) Blog Website dikembangkan menggunakan PHP dengan framework Laravel, sehingga lebih aman, modern, dan mudah dikembangkan.",
        },
        {
            question: "Apakah konsultasi melalui Zoom bisa lebih dari 1 jam?",
            answer: "Ya, bisa. Namun, apabila durasi melebihi 1 jam akan dikenakan biaya tambahan.",
        },
        {
            question:
                "Apakah analisis kebutuhan hanya untuk wilayah Palembang?",
            answer: "Tidak. Analisis kebutuhan dapat dilakukan untuk klien di luar Kota Palembang juga..",
        },
        {
            question: "File apa saja yang diperlukan untuk membuat website?",
            answer: "Umumnya diperlukan file seperti logo, profil perusahaan, konten tulisan, gambar pendukung, atau materi lain sesuai jenis website yang akan dibuat..",
        },
        {
            question: "Bagaimana dengan layanan hosting?",
            answer: "Anda dapat memilih: Membeli layanan hosting secara mandiri, atau Menggunakan layanan “terima beres” di mana kami yang menguruskan hosting untuk Anda.",
        },
        {
            question: "Bagaimana jika ingin menambahkan fitur baru di website?",
            answer: "Kami dapat membantu menambahkan fitur tambahan sesuai kebutuhan Anda, dengan ketentuan adanya biaya tambahan.",
        },
    ];

    const toggleAnswer = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };
    const toggleAnswer2 = (index) => {
        if (openIndex2 === index) {
            setOpenIndex2(null);
        } else {
            setOpenIndex2(index);
        }
    };

    return (
        <div>
            <div className="relative  isolate font-outfit overflow-hidden bg-custom scale-100 mt-10 mb-20">
                <div className="py-10 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12 ">
                    <div className="flex flex-col text-left basis-1/2">
                        <p className="inline-block font-semibold mb-4 xs:text-center md:text-left">
                            F.A.Q
                        </p>
                        <p className="sm:text-4xl text-3xl font-extrabold text-base-content xs:text-center md:text-left">
                            Pertanyaan yang sering diajukan
                        </p>
                        <img
                            src="/images/pertanyaan.webp"
                            alt="Ikon pertanyaan untuk mengakses FAQ atau tanya jawab"
                            className="w-[400px] mt-6 xs:mx-auto md:ml-0"
                        />
                    </div>
                    <ul className="basis-1/2">
                        {questionsAndAnswers.map((item, index) => (
                            <li key={index} className="group">
                                <button
                                    onClick={() => toggleAnswer(index)}
                                    className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
                                    aria-expanded={
                                        openIndex === index ? "true" : "false"
                                    }
                                >
                                    <span className="flex-1 text-base-content">
                                        {item.question}
                                    </span>
                                    <svg
                                        className="flex-shrink-0 w-4 h-4 ml-auto fill-current"
                                        viewBox="0 0 16 16"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            y=" "
                                            width="16"
                                            height="2"
                                            rx="1"
                                            className={`transform origin-center transition duration-200 ease-out ${
                                                openIndex === index
                                                    ? "rotate-90"
                                                    : ""
                                            }`}
                                        ></rect>
                                        <rect
                                            y="7"
                                            width="16"
                                            height="2"
                                            rx="1"
                                            className="group-hover:opacity-0 transform origin-center transition-all duration-200 ease-out"
                                        ></rect>
                                    </svg>
                                </button>
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                        openIndex === index
                                            ? "max-h-60"
                                            : "max-h-0"
                                    }`}
                                    style={{
                                        transition:
                                            "max-height 0.3s ease-in-out 0s",
                                    }}
                                >
                                    <div className="pb-5 leading-relaxed">
                                        <div className="space-y-2 leading-relaxed">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Pertanyaan;
