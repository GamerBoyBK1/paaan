export const toggleSidebar = (id = 'dashboard-sidebar') => {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.toggle('active-nav');
};

export const closeSidebar = (id = 'dashboard-sidebar') => {
    document.getElementById(id)?.classList.remove('active-nav');
};

export const toggleCollapse = (id = 'dashboard-sidebar') => {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.toggle('collapsed');
};