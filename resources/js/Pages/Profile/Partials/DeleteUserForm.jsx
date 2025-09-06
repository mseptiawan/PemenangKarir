import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => setConfirmingUserDeletion(true);

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section
            className={`rounded-2xl border border-red-200 bg-white shadow-sm p-6 space-y-4 ${className}`}
        >
            <header className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <Trash2 size={20} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Hapus Akun
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Setelah akun dihapus, semua data akan hilang permanen.
                        Pastikan sudah menyimpan data penting sebelum
                        melanjutkan.
                    </p>
                </div>
            </header>

            <DangerButton
                onClick={confirmUserDeletion}
                className="px-4 py-2 rounded-lg shadow hover:shadow-md transition flex items-center gap-2"
            >
                <Trash2 size={16} />
                Hapus Akun
            </DangerButton>

            {/* Modal Konfirmasi */}
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900">
                        Konfirmasi Penghapusan
                    </h2>
                    <p className="text-sm text-gray-600">
                        Akun kamu akan dihapus permanen. Untuk melanjutkan,
                        masukkan password akun.
                    </p>

                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-2 block w-full rounded-lg"
                            placeholder="Masukkan password"
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <SecondaryButton
                            onClick={closeModal}
                            className="rounded-lg"
                        >
                            Batal
                        </SecondaryButton>
                        <DangerButton
                            className="rounded-lg px-4 py-2"
                            disabled={processing}
                        >
                            {processing ? "Menghapus..." : "Hapus Akun"}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
