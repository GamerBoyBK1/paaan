import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';

import Sidebar from '@/components/Sidebar';
import routes from '@/routers/routes';
import Can from '@/components/elements/Can';
import { ServerContext } from '@/state/server';

export default () => {
    const match = useRouteMatch<{ id: string }>();

    const rootAdmin = useStoreState(
        state => state.user.data!.rootAdmin
    );

    // ✅ CORRECT: server data comes from ServerContext
    const serverId = ServerContext.useStoreState(
        state => state.server.data?.internalId
    );

    const to = (value: string) =>
        `${match.url.replace(/\/*$/, '')}/${value.replace(/^\/+/, '')}`;

    return (
        <Sidebar id="server-sidebar">
            {routes.server
                .filter(route => !!route.name)
                .map(route =>
                    route.permission ? (
                        <Can key={route.path} action={route.permission} matchAny>
                            <NavLink to={to(route.path)} exact={route.exact}>
                                <div className="icon">
                                    <FontAwesomeIcon
                                        icon={route.iconProp as IconProp}
                                    />
                                </div>
                                {route.name}
                            </NavLink>
                        </Can>
                    ) : (
                        <NavLink
                            key={route.path}
                            to={to(route.path)}
                            exact={route.exact}
                        >
                            <div className="icon">
                                <FontAwesomeIcon
                                    icon={route.iconProp as IconProp}
                                />
                            </div>
                            {route.name}
                        </NavLink>
                    )
                )}

            {rootAdmin && serverId && (
                <a
                    href={`/admin/servers/view/${serverId}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <div className="icon">
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </div>
                    Admin
                </a>
            )}
        </Sidebar>
    );
};