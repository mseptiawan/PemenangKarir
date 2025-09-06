import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NavigationLayout from "@/Layouts/NavigationLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        full_name: "",
        email: "",
        phone: "",
        address: "",
        bio: "",
        profile_photo: null,
        cv: null,
        social_links: {},
        topic: "",
    });

    const [socialInputs, setSocialInputs] = useState({
        instagram: "",
        linkedin: "",
        email: "",
    });

    const handleSocialChange = (platform, value) => {
        setSocialInputs((prev) => {
            const updated = { ...prev, [platform]: value };
            setData("social_links", updated);
            return updated;
        });
    };
    const submit = (e) => {
        e.preventDefault();

        post(route("author.store"), {
            onSuccess: () => {
                toast.success(
                    "Pendaftaran berhasil dikirim!\nSilakan cek email secara berkala.",
                    { duration: 3000 }
                );
                setTimeout(() => {
                    window.location.href = route("home");
                }, 3000);
            },
            onError: () => {
                toast.error(
                    "Pendaftaran gagal. Periksa kembali form kamu.",
                    {
                        duration: 4000,
                    }
                );
            },
        });
    };

    return (
        <>
            <Head title="Daftar Penulis" />
            <NavigationLayout />
            <div className="max-w-3xl mx-auto p-6">
                <Toaster position="top-right" />
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Form Pendaftaran Author
                </h1>

                <form
                    onSubmit={submit}
                    className="space-y-6 bg-white p-6 rounded-2xl shadow"
                    encType="multipart/form-data"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama Panggilan
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.name && (
                            <div className="text-red-600 text-sm">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    {/* Nama */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            value={data.full_name}
                            onChange={(e) =>
                                setData("full_name", e.target.value)
                            }
                            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.full_name && (
                            <div className="text-red-600 text-sm">
                                {errors.full_name}
                            </div>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.email && (
                            <div className="text-red-600 text-sm">
                                {errors.email}
                            </div>
                        )}
                    </div>

                    {/* Nomor HP */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nomor HP
                        </label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.phone && (
                            <div className="text-red-600 text-sm">
                                {errors.phone}
                            </div>
                        )}
                    </div>

                    {/* Alamat */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Alamat
                        </label>
                        <textarea
                            rows="2"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.address && (
                            <div className="text-red-600 text-sm">
                                {errors.address}
                            </div>
                        )}
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Bio Singkat
                        </label>
                        <textarea
                            rows="3"
                            value={data.bio}
                            onChange={(e) => setData("bio", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.bio && (
                            <div className="text-red-600 text-sm">
                                {errors.bio}
                            </div>
                        )}
                    </div>

                    {/* Avatar */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Foto Profil
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData("profile_photo", e.target.files[0])
                            }
                        />
                        {errors.profile_photo && (
                            <div className="text-red-600 text-sm">
                                {errors.profile_photo}
                            </div>
                        )}
                    </div>

                    {/* CV */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Upload CV
                        </label>
                        <input
                            type="file"
                            onChange={(e) => setData("cv", e.target.files[0])}
                            className="mt-1 block w-full text-sm text-gray-600"
                        />
                        {errors.cv && (
                            <div className="text-red-600 text-sm">
                                {errors.cv}
                            </div>
                        )}
                    </div>

                    {/* Social Links */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Link Media Sosial
                        </label>
                        {["instagram", "linkedin", "email"].map((platform) => (
                            <input
                                key={platform}
                                type="text"
                                placeholder={platform}
                                value={socialInputs[platform]}
                                onChange={(e) =>
                                    handleSocialChange(platform, e.target.value)
                                }
                                className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                            />
                        ))}
                    </div>

                    {/* Tema / Keahlian */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tema / Keahlian
                        </label>
                        <input
                            type="text"
                            value={data.topic}
                            onChange={(e) => setData("topic", e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Misal: Teknologi, Bisnis, Lifestyle"
                        />
                        {errors.topic && (
                            <div className="text-red-600 text-sm">
                                {errors.topic}
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
                        >
                            Kirim Pendaftaran
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
