import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/App';
import { setConfig } from 'react-hot-loader';

// 🌍 i18n
import './i18n';

// 🎨 GLOBAL STYLES (VERY IMPORTANT)
import GlobalStylesheet from '@/assets/css/GlobalStylesheet';

// Prevents page reloads while making component changes
setConfig({ reloadHooks: false });

ReactDOM.render(
    <>
        {/* Apply global white theme */}
        <GlobalStylesheet />
        <App />
    </>,
    document.getElementById('app')
);
