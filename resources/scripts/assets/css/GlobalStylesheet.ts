import tw from 'twin.macro';
import { createGlobalStyle } from 'styled-components/macro';

export default createGlobalStyle`
    html, body {
        width: 100%;
        height: 100%;
    }

    body {
        ${tw`font-sans bg-white text-neutral-800 antialiased`};
        letter-spacing: 0.015em;
        margin: 0;
        padding: 0;
    }

    #app {
        ${tw`bg-white min-h-screen`};
    }

    /* ================= HEADINGS ================= */
    h1, h2, h3, h4, h5, h6 {
        ${tw`font-semibold tracking-tight font-header text-neutral-900`};
    }

    /* ================= TEXT ================= */
    p {
        ${tw`text-neutral-600 leading-relaxed`};
    }

    a {
        ${tw`text-primary-600 hover:text-primary-700 transition-colors`};
    }

    /* ================= FORMS ================= */
    textarea,
    select,
    input,
    button,
    button:focus,
    button:focus-visible {
        ${tw`outline-none`};
    }

    input,
    textarea,
    select {
        ${tw`bg-white text-neutral-800 border border-neutral-300 rounded-lg px-3 py-2 transition`};
    }

    input:focus,
    textarea:focus,
    select:focus {
        ${tw`border-primary-500`};
        box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
    }

    button {
        ${tw`bg-primary-600 text-white rounded-lg px-4 py-2 font-medium transition-all`};
    }

    button:hover {
        ${tw`bg-primary-700`};
        transform: translateY(-1px);
    }

    /* ================= SCROLLBAR ================= */
    ::-webkit-scrollbar {
        width: 12px;
        height: 12px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #d4d4d8;
        border-radius: 8px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #a1a1aa;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }
`;