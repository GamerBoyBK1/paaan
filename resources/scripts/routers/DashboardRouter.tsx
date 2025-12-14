import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import { NotFound } from '@/components/elements/ScreenBlock';
import TransitionRouter from '@/TransitionRouter';
import { useLocation } from 'react-router';
import Spinner from '@/components/elements/Spinner';
import routes from '@/routers/routes';
import Sidebar from '@/components/Sidebar';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import MainSidebar from '@/components/sidebars/MainSidebar';

export default () => {
    const location = useLocation();

    return (
        <>
            <NavigationBar />

            {/* ✅ DASHBOARD SIDEBAR */}
            {location.pathname === '/' && <MainSidebar />}

            {/* ✅ ACCOUNT SIDEBAR */}
            {location.pathname.startsWith('/account') && (
                <Sidebar id="dashboard-sidebar">
                    {routes.account
                        .filter(route => !!route.name)
                        .map(({ path, name, exact = false, iconProp }) => (
                            <NavLink
                                key={path}
                                to={`/account/${path}`.replace('//', '/')}
                                exact={exact}
                            >
                                <div className="icon">
                                    <FontAwesomeIcon
                                        icon={iconProp as IconProp}
                                    />
                                </div>
                                {name}
                            </NavLink>
                        ))}
                </Sidebar>
            )}

            <TransitionRouter>
                <React.Suspense fallback={<Spinner centered />}>
                    <Switch location={location}>
                        <Route path="/" exact>
                            <DashboardContainer />
                        </Route>

                        {routes.account.map(
                            ({ path, component: Component }) => (
                                <Route
                                    key={path}
                                    path={`/account/${path}`.replace(
                                        '//',
                                        '/'
                                    )}
                                    exact
                                >
                                    <Component />
                                </Route>
                            )
                        )}

                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </React.Suspense>
            </TransitionRouter>
        </>
    );
};
