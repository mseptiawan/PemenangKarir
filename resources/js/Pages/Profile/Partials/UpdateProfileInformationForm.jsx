// UpdateProfileInformationForm.jsx
import { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import AvatarUpload from "../AvatarUpload";

export default function UpdateProfileInformationForm({ className = "" }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    // Auto-save debounce 1 detik
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (
                (data.name && data.name !== user.name) ||
                (data.email && data.email !== user.email) ||
                data.avatar
            ) {
                patch(route("profile.update"), {
                    preserveScroll: true,
                    onSuccess: () => console.log("Auto-saved!"),
                });
            }
        }, 1000);

        return () => clearTimeout(timeout);
    }, [data]);

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your profile, email, and photo.
                </p>
            </header>

            <form
                encType="multipart/form-data"
                className="mt-6 space-y-6"
                onSubmit={(e) => {
                    e.preventDefault();
                    patch(route("profile.update"), {
                        preserveScroll: true,
                    });
                }}
            >
            <AvatarUpload value={user.profile_photo_url} />
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
