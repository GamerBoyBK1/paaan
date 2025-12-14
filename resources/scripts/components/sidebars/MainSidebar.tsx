import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLayerGroup,
    faCogs,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import Sidebar from '@/components/Sidebar';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import http from '@/api/http';
import Avatar from '@/components/Avatar';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';

export default () => {
    const rootAdmin = useStoreState(
        (state: ApplicationStore) => state.user.data!.rootAdmin
    );

    const logout = () => {
        http.post('/auth/logout').finally(() => {
            window.location.href = '/';
        });
    };

    return (
        <Sidebar id="dashboard-sidebar">
            {/* Dashboard */}
            <Tooltip content="Dashboard" placement="right">
                <NavLink exact to="/">
                    <div className="icon">
                        <FontAwesomeIcon icon={faLayerGroup} />
                    </div>
                    Dashboard
                </NavLink>
            </Tooltip>

            {/* Admin */}
            {rootAdmin && (
                <Tooltip content="Admin" placement="right">
                    <a href="/admin" rel="noreferrer">
                        <div className="icon">
                            <FontAwesomeIcon icon={faCogs} />
                        </div>
                        Admin
                    </a>
                </Tooltip>
            )}

            {/* Account */}
            <NavLink to="/account">
                <div className="icon">
                    <Avatar.User />
                </div>
                Account
            </NavLink>

            {/* Logout */}
            <button className="sidebar-btn" onClick={logout}>
                <div className="icon">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
                Logout
            </button>
        </Sidebar>
    );
};