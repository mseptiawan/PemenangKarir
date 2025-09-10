import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            //            backgroundImage: {
            //     'bg-footer-2': "url('/images/bg-footer-2.svg')",
            //     'bg-footer-3': "url('/images/bg-footer-3.svg')",
            //   },
        },
    },

    plugins: [forms, require("@tailwindcss/typography")],
};
