import { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Pencil, Save, X } from "lucide-react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import Sidebar from "@/Layouts/Sidebar";
import DeleteUserForm from "./Partials/DeleteUserForm";

export default function ProfileCard() {
    const user = usePage().props.auth.user;
    const [isEditing, setIsEditing] = useState(false);
    const [previewPhoto, setPreviewPhoto] = useState(
        user.profile_photo_url || "/default-avatar.png"
    );

    const [socialInputs, setSocialInputs] = useState({
        instagram: user.social_links?.instagram || "",
        linkedin: user.social_links?.linkedin || "",
    });

    // Sinkronisasi social links ke Inertia form
    const handleSocialChange = (platform, value) => {
        setSocialInputs((prev) => {
            const updated = { ...prev, [platform]: value };
            setData("social_links", updated); // pastikan key sama dengan backend
            return updated;
        });
    };

    const { data, setData, post, errors, processing } = useForm({
        name: user.name || "",
        full_name: user.full_name || "",
        phone: user.phone || "",
        address: user.address || "",
        bio: user.bio || "",
        topic: user.topic || "",
        profile_photo: null, // file upload
        social_links: user.social_links || {
            instagram: "",
            linkedin: "",
        },
    });

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("profile.update"), {
            forceFormData: true, // penting untuk file upload
            preserveScroll: true,
            onSuccess: () => setIsEditing(false),
        });
    };

    // Preview dan upload foto
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setData("profile_photo", file); // kirim ke Inertia
        setPreviewPhoto(URL.createObjectURL(file)); // langsung preview
    };

    return (
        <>
            <Sidebar />
            <div className="ml-64 py-10 px-6">
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 w-full max-w-3xl">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Informasi Pribadi
                        </h2>
                        {isEditing ? (
                            <button
                                onClick={() => setIsEditing(false)}
                                className="text-sm text-red-500 hover:underline flex items-center"
                            >
                                <X size={16} className="mr-1" /> Batal
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-sm text-blue-600 hover:underline flex items-center"
                            >
                                <Pencil size={16} className="mr-1" /> Edit
                            </button>
                        )}
                    </div>

                    {/* Content */}
                    {!isEditing ? (
                        // Mode Lihat
                        <div className="space-y-4 text-gray-700 dark:text-gray-300">
                            <img
                                src={
                                    user.profile_photo_url ||
                                    "/default-avatar.png"
                                }
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <p>
                                <span className="font-medium">
                                    Nama Lengkap:
                                </span>{" "}
                                {user.full_name}
                            </p>
                            <p>
                                <span className="font-medium">Telepon:</span>{" "}
                                {user.phone || "-"}
                            </p>
                            <p>
                                <span className="font-medium">Email:</span>{" "}
                                {user.email || "-"}
                            </p>
                            <p>
                                <span className="font-medium">Alamat:</span>{" "}
                                {user.address || "-"}
                            </p>
                            <p>
                                <span className="font-medium">Bio:</span>{" "}
                                {user.bio || "-"}
                            </p>
                            <p>
                                <span className="font-medium">Topik:</span>{" "}
                                {user.topic || "-"}
                            </p>
                            <p>
                                <span className="font-medium">Peran:</span>{" "}
                                {user.role || "-"}
                            </p>
                            <div>
                                <span className="font-medium">
                                    Social Links:
                                </span>
                                <ul className="list-disc list-inside ml-4">
                                    {user.social_links &&
                                    Object.keys(user.social_links).length >
                                        0 ? (
                                        Object.entries(user.social_links).map(
                                            ([platform, link], i) => (
                                                <li key={i}>
                                                    <span className="capitalize">
                                                        {platform}:{" "}
                                                    </span>
                                                    <a
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {link}
                                                    </a>
                                                </li>
                                            )
                                        )
                                    ) : (
                                        <li>-</li>
                                    )}
                                </ul>
                            </div>

                            {user.cv_url && (
                                <p>
                                    <span className="font-medium">CV:</span>{" "}
                                    <a
                                        href={user.cv_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Lihat CV
                                    </a>
                                </p>
                            )}
                        </div>
                    ) : (
                        // Mode Edit
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Foto Profil */}
                            <div>
                                <InputLabel
                                    htmlFor="profile_photo"
                                    value="Foto Profil"
                                />
                                <div className="flex items-center gap-4">
                                    <img
                                        src={previewPhoto}
                                        alt="Preview"
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                    <input
                                        type="file"
                                        name="profile_photo"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                    />
                                </div>
                                <InputError message={errors.profile_photo} />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Nama Panggilan"
                                />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="full_name"
                                    value="Nama Lengkap"
                                />
                                <TextInput
                                    id="full_name"
                                    value={data.full_name}
                                    onChange={(e) =>
                                        setData("full_name", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.full_name} />
                            </div>

                            <div>
                                <InputLabel htmlFor="phone" value="Telepon" />
                                <TextInput
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.phone} />
                            </div>

                            <div>
                                <InputLabel htmlFor="address" value="Alamat" />
                                <textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100"
                                />
                                <InputError message={errors.address} />
                            </div>

                            <div>
                                <InputLabel htmlFor="bio" value="Bio" />
                                <textarea
                                    id="bio"
                                    value={data.bio}
                                    onChange={(e) =>
                                        setData("bio", e.target.value)
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100"
                                />
                                <InputError message={errors.bio} />
                            </div>

                            <div>
                                <InputLabel htmlFor="Topic" value="Topic" />
                                <TextInput
                                    id="topic"
                                    value={data.topic}
                                    onChange={(e) =>
                                        setData("topic", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError message={errors.topic} />
                            </div>

                            {/* Social Links */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Link Media Sosial
                                </label>

                                {/* Instagram */}
                                <input
                                    type="text"
                                    placeholder="Instagram"
                                    value={socialInputs.instagram}
                                    onChange={(e) =>
                                        handleSocialChange(
                                            "instagram",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                                />

                                {/* LinkedIn */}
                                <input
                                    type="text"
                                    placeholder="LinkedIn"
                                    value={socialInputs.linkedin}
                                    onChange={(e) =>
                                        handleSocialChange(
                                            "linkedin",
                                            e.target.value
                                        )
                                    }
                                    className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                                />

                                {/* Email */}
                            </div>

                            <div className="flex items-center gap-3">
                                <PrimaryButton disabled={processing}>
                                    <Save size={16} className="mr-1" /> Simpan
                                </PrimaryButton>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="text-sm text-gray-500 hover:underline"
                                >
                                    Batal
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}
