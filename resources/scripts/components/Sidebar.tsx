import React, { ReactNode } from 'react';
import '@/assets/css/sidebar.css';

type Props = {
    id: string;
    children: ReactNode;
};

export default ({ id, children }: Props) => {
    return (
        <div className="sidebar" id={id}>
            {children}
        </div>
    );
};
