import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';

const toggleSidebarById = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active-nav');
};

const closeAll = () => {
    ['dashboard-sidebar', 'server-sidebar'].forEach(id => {
        document.getElementById(id)?.classList.remove('active-nav');
    });
};

export default () => {
    const name = useStoreState(
        (state: ApplicationStore) => state.settings.data!.name
    );

    const location = useLocation();
    const [showBars, setShowBars] = useState(false);

    useEffect(() => {
        closeAll();

        setShowBars(
            location.pathname === '/' ||
            location.pathname.startsWith('/server') ||
            location.pathname.startsWith('/account')
        );
    }, [location.pathname]);

    const onBarsClick = () => {
        if (location.pathname.startsWith('/server')) {
            toggleSidebarById('server-sidebar');
        } else {
            toggleSidebarById('dashboard-sidebar');
        }
    };

    return (
        <div className="topbar bg-neutral-700 shadow-md">
            <div className="mx-auto w-full flex items-center h-[3.5rem] max-w-[1200px]">
                
                {/* ☰ LEFT */}
                {showBars && (
                    <FontAwesomeIcon
                        icon={faBars}
                        className="navbar-button"
                        onClick={onBarsClick}
                    />
                )}

                {/* LOGO */}
                <Link
                    to="/"
                    className="text-2xl font-header px-4 no-underline text-neutral-200"
                >
                    {name}
                </Link>

                {/* 🔍 RIGHT SIDE SEARCH */}
                <div className="ml-auto pr-4">
                    <SearchContainer />
                </div>
            </div>
        </div>
    );
};
