
const Tujuan = () => {
  return (
    <div>
      <section className="font-outfit py-16 xl:py-32 scale-110 mt-4   mx-auto mb-10">
        <div className=" xs:w-5/6   md:w-4/6 ss:w-5/6  xxl:w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className=" text-3xl font-bold text-left mt-2  ">Visi Misi</h2>
          <div className=" mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2  xs:grid-cols-1">

            <div className="bg-white shadow-lg  text-black rounded-lg  p-4">
              <div className="flex items-center justify-center h-12 w-20 rounded-md  text-white">
                <img src="/images/visi.webp"  alt="Ikon untuk melihat visi perusahaan" className="" />
              </div>
              <div className="mt-6 ">
                <h3 className="text-lg font-bold  ">Visi</h3>
                <p className="mt-2 xs:text-normal ">
                 Menjadi mitra terpercaya di tanah air yang melayani rekan bisnis serta memberikan konsultasi pengembangan karir di bidang teknologi informasi.
                </p>
              </div>
            </div>
            <div className="bg-[#f9fafb] shadow-lg text-black rounded-lg  p-4">
              <div className="flex items-center justify-center h-12 w-20 rounded-md  text-white">
                <img src="/images/misi.webp" alt="Ikon misi untuk menggambarkan tujuan atau misi perusahaan kami" className="" />
              </div>
              <div className="mt-6 ">
                <h3 className=" text-lg font-bold ">Misi</h3>


                <div className="flex flex-col  space-y-4 ">
                  <div className="flex mt-2 items-start">

                    <p>
               Menyediakan layanan terbaik dengan terus berinovasi, mengikuti perkembangan teknologi terkini, serta mendampingi klien dalam merancang dan mengembangkan karir profesional di dunia IT.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tujuan;
