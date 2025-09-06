import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Password" />

            <div className=" flex items-center justify-center  dark:bg-gray-900 p">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                        Lupa Password
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
                        Tidak perlu khawatir. Masukkan alamat email kamu di bawah, kami akan mengirimkan tautan untuk mengatur ulang password.
                    </p>

                    {status && (
                        <div className="text-sm font-medium text-green-600 dark:text-green-400 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                                isFocused
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Masukkan email"
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <PrimaryButton
                            type="submit"
                            className="w-full py-3 rounded-xl text-white font-semibold shadow hover:bg-blue-700 transition"
                            disabled={processing}
                        >
                            Kirim Tautan Reset Password
                        </PrimaryButton>
                    </form>

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Ingat passwordmu?{' '}
                        <a
                            href={route('login')}
                            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                        >
                            Masuk
                        </a>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
