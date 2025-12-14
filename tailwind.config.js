const colors = require('tailwindcss/colors');

/* ===============================
   Custom Gray (Neutral)
   =============================== */
const gray = {
    50: colors.neutral[50],
    100: colors.neutral[100],
    200: colors.neutral[200],
    300: colors.neutral[300],
    400: colors.neutral[400],
    500: colors.neutral[500],
    600: colors.neutral[600],
    700: colors.neutral[700],
    800: colors.neutral[800],
    900: colors.neutral[900],
};

module.exports = {
    content: ['./resources/scripts/**/*.{js,ts,tsx}'],

    theme: {
        extend: {
            /* ===============================
               Fonts
               =============================== */
            fontFamily: {
                header: ['"IBM Plex Sans"', '"Roboto"', 'system-ui', 'sans-serif'],
            },

            /* ===============================
               Colors (CoRamTix)
               =============================== */
            colors: {
                black: '#131a20',

                /* Primary = Purple SaaS */
                primary: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed', // MAIN
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                },

                /* Accent */
                cyan: colors.cyan,
                orange: colors.orange,

                /* Neutral / Gray (White Panel friendly) */
                gray: gray,
                neutral: gray,
            },

            /* ===============================
               Font Sizes
               =============================== */
            fontSize: {
                '2xs': '0.625rem',
            },

            /* ===============================
               Transitions
               =============================== */
            transitionDuration: {
                250: '250ms',
            },

            /* ===============================
               Borders
               =============================== */
            borderColor: theme => ({
                DEFAULT: theme('colors.neutral.300', 'currentColor'),
            }),
        },
    },

    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ],
};
