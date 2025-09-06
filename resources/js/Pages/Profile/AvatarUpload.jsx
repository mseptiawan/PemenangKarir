import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function AvatarUpload({ value, onChange }) {
    const { post } = useForm(); // <-- benar, di sini

    const [preview, setPreview] = useState(value || "/images/profile.png");

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // preview dulu
        setPreview(URL.createObjectURL(file));

        // upload ke server
        const formData = new FormData();
        formData.append("avatar", file);

        post(route("profile.avatar.update"), {
            data: formData,
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                // reload props user
                window.location.reload();
            },
        });
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <label htmlFor="avatar-upload" className="cursor-pointer">
                <img
                    src={preview}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                />
            </label>
            <input
                id="avatar-upload"
                type="file"
                className="hidden"
                onChange={handleChange}
            />
        </div>
    );
}
