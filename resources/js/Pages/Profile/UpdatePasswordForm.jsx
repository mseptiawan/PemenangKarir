import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";
import Sidebar from "@/Layouts/Sidebar";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 p-10 bg-gray-50 min-h-screen">
                <section
                    className={`max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 ${className}`}
                >
                    <header className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Update Password
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Pastikan kata sandi baru panjang & random biar akun
                            lebih aman.
                        </p>
                    </header>

                    <form
                        onSubmit={updatePassword}
                        className="space-y-6 w-full"
                    >
                        {/* Current Password */}
                        <div>
                            <InputLabel
                                htmlFor="current_password"
                                value="Password Saat Ini"
                            />

                            <TextInput
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) =>
                                    setData("current_password", e.target.value)
                                }
                                type="password"
                                className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                autoComplete="current-password"
                                placeholder="Masukkan password lama"
                            />

                            <InputError
                                message={errors.current_password}
                                className="mt-2"
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="Password Baru"
                            />

                            <TextInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                type="password"
                                className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                autoComplete="new-password"
                                placeholder="Minimal 8 karakter"
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Konfirmasi Password"
                            />

                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                type="password"
                                className="mt-1 block w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                autoComplete="new-password"
                                placeholder="Ulangi password baru"
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        {/* Action */}
                        <div className="flex items-center gap-4">
                            <PrimaryButton
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-semibold shadow"
                            >
                                {processing ? "Menyimpan..." : "Simpan"}
                            </PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-green-600 font-medium">
                                    ✅ Password berhasil diperbarui!
                                </p>
                            </Transition>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}
