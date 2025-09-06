const Layanan = () => {
    return (
        <div className="w-full mx-auto text-gray-800 font-outfit" id="paket">
            <section className="py-16 bg-gray-50">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Layanan</h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                        Penawaran profesional dengan fitur premium untuk bisnis
                        dan karier IT.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto px-4 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {/* Card 1 */}
                    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300 flex flex-col">
                        <img
                            src="/images/zoom.webp"
                            alt="Ikon konsultasi online"
                            className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <div className="p-6 flex-1 flex flex-col">
                            <span className="text-lg font-bold mb-2">
                                Harga 100.000/Jam
                            </span>
                            <p className="text-gray-600 flex-1">
                                Layanan konsultasi online untuk membantu
                                peningkatan layanan bisnis serta memberi arahan
                                bagi calon mahasiswa yang ingin berkarier di
                                bidang IT.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300 flex flex-col">
                        <img
                            src="/images/Jasa-SEO-Medan.jpg"
                            alt="Ikon SEO untuk layanan optimasi mesin pencari"
                            className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <div className="p-6 flex-1 flex flex-col">
                            <span className="text-lg font-bold mb-2">
                                Harga Mulai 500.000
                            </span>
                            <p className="text-gray-600 flex-1">
                                Optimalkan website Anda agar muncul di peringkat
                                teratas mesin pencari, meningkatkan visibilitas
                                dan kunjungan calon pelanggan.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300 flex flex-col">
                        <img
                            src="/images/sistem-analis.webp"
                            alt="Ikon sistem analis"
                            className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <div className="p-6 flex-1 flex flex-col">
                            <span className="text-lg font-bold mb-2">
                                Harga Mulai 2.000.000
                            </span>
                            <p className="text-gray-600 flex-1">
                                Analisis proses bisnis Anda, identifikasi
                                kebutuhan, dan rancang solusi sistem yang tepat
                                sebelum pengembangan.
                            </p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300 flex flex-col">
                        <img
                            src="/images/jasa-pembuatan-website.jpg"
                            alt="Ikon layanan pembuatan website"
                            className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <div className="p-6 flex-1 flex flex-col">
                            <span className="text-lg font-bold mb-2">
                                Harga Mulai 500.000
                            </span>
                            <p className="text-gray-600 flex-1">
                                Mewujudkan sistem atau website sesuai hasil
                                analisis kebutuhan, mulai desain, pengembangan,
                                hingga implementasi.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Layanan;
