const Testimoni = () => {
    return (
        <div className="">
            <section
                id="testimonials"
                aria-label="What our customers are saying"
                className=" bg-gray-50 py-20 sm:py-10  -mt-10 font-outfit lg:bg-none  xs:bg-background-komentar bg-cover bg-center z-10 mb-32"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="font-display  font-bold  mt-2  text-3xl tracking-tight  sm:text-4xl">
                            Apa Komentar orang tentang kami?
                        </h2>
                    </div>
                    <ul
                        role="list"
                        className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
                    >
                        {[...Array(3)].map((_, index) => (
                            <li key={index}>
                                <ul
                                    role="list"
                                    className="flex  flex-col gap-y-6 sm:gap-y-8"
                                >
                                    <li>
                                        <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                                            <svg
                                                aria-hidden="true"
                                                width="105"
                                                height="78"
                                                className="absolute left-6 top-6 fill-slate-100"
                                            >
                                                <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"></path>
                                            </svg>
                                            <blockquote className="relative ">
                                                <p className="sm:text-lg xs:text-xs tracking-tight text-slate-900">
                                                    {index === 0 &&
                                                        "saya pelaku usaha yang udah punya website untuk mempromosikan usaha saya dengan organik, namun sulit sekali untuk mencapai banyak pelanggan, saya pikir ada yang kurang performanya dari website saya lalu saya coba bayar jasa seo di pemenang karir, entah apa yang dia lakukan, website saya ada kemajuan  dan mencapai penjualan mencapai titik tertinggi, menang pemenang karir adalah solusi bagi kita yang mau berkarir"}
                                                    {index === 1 &&
                                                        "awalnya saya seorang lulusan sma yang mau melanjutkan pendidikan karir dengan kuliah jurusan it, saya dapat pilihan sistem informasi dan teknik informatika, kedua mata kuliah itu arahnya pada it semua, saya ga tau perbedaan itu, singkat cerita saya konsultasi ke pemenang karir , cari tau perbedaan antara kedua jurusan tersebut, perbincangan kami sangat dalam yang ngebahas arah karir, peluang kerja, hingga kecocokan dengan minat saya dan akhirnya saya tau dengan detail apa bedanya, sehingga saya pilih jurusan sistem informasi "}
                                                    {index === 2 &&
                                                        "Saya buka usaha loundry. dan suatu ketika usaha saya sepi, disaat itu saya termenung sambil scroll facebook, setelah 5 menit scroll saya menemukan sebuah postingan dari Halaman facebook kami dengan kalimat 'Usaha anda sepi? Makanya pindah ke digital, sedikit tersinggung dan berpikir. akhirnya setelah saya baca postingan tersebut. saya tertarik untuk membuat website company profile untuk usaha saya dan syukur dengan bantuan kami, OMSEtttt saya naik 2x lipattt"}
                                                </p>
                                            </blockquote>
                                            <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                                                <div>
                                                    <div className="font-display text-base text-slate-900">
                                                        {index === 0 && "Ilham"}
                                                        {index === 1 &&
                                                            "Dedi Suharta"}
                                                        {index === 2 && "Rati"}
                                                    </div>
                                                </div>
                                                <div className="overflow-hidden rounded-full bg-slate-50">
                                                    <div className="font-display text-base text-slate-900">
                                                        {index === 0 && "2025"}
                                                        {index === 1 && "2024"}
                                                        {index === 2 && "2024"}
                                                    </div>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Testimoni;
