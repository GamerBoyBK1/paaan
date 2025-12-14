import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faUser } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '@/components/Sidebar';

export default () => {
    return (
        <Sidebar id="dashboard-sidebar">
            <NavLink exact to="/">
                <div className="icon">
                    <FontAwesomeIcon icon={faLayerGroup} />
                </div>
                Dashboard
            </NavLink>

            <NavLink to="/account">
                <div className="icon">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                Account
            </NavLink>
        </Sidebar>
    );
};