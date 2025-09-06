import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
                        Verify Your Email
                    </h1>

                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Thanks for signing up! Before getting started, please
                        verify your email address by clicking on the link we
                        just emailed to you. If you didn't receive the email, we
                        will gladly send you another.
                    </div>

                    {status === "verification-link-sent" && (
                        <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                            A new verification link has been sent to the email
                            address you provided during registration.
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <PrimaryButton
                            type="submit"
                            className="w-full py-3 rounded-xl text-white font-semibold shadow hover:bg-blue-700 transition"
                            disabled={processing}
                        >
                            Resend Verification Email
                        </PrimaryButton>

                        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                            <span>Or </span>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
