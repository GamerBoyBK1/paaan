import React, { memo, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEthernet,
    faHdd,
    faMemory,
    faMicrochip,
    faServer,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Server } from '@/api/server/getServer';
import getServerResourceUsage, {
    ServerPowerState,
    ServerStats,
} from '@/api/server/getServerResourceUsage';
import { bytesToString, ip } from '@/lib/formatters';
import tw from 'twin.macro';
import Spinner from '@/components/elements/Spinner';
import styled from 'styled-components/macro';
import isEqual from 'react-fast-compare';
import '@/assets/css/CoRamTix.css';

/* ================= HELPERS ================= */

const isAlarmState = (current: number, limit: number): boolean =>
    limit > 0 && current / (limit * 1024 * 1024) >= 0.9;

/* ================= ICONS ================= */

const StatIcon = memo(
    styled(FontAwesomeIcon)<{ $alarm: boolean }>`
        ${(p) => (p.$alarm ? tw`text-red-400` : tw`text-indigo-400`)};
    `,
    isEqual
);

const StatText = styled.span<{ $alarm: boolean }>`
    ${tw`text-sm font-medium`};
    ${(p) => (p.$alarm ? tw`text-red-400` : tw`text-neutral-200`)};
`;

/* ================= CARD ================= */

const ServerCard = styled(Link)<{
    $status: ServerPowerState | undefined;
}>`
    ${tw`relative grid grid-cols-12 gap-4 p-5 rounded-xl transition-all duration-300 no-underline`};
    background: linear-gradient(145deg, #0b0f1a, #0f172a);
    border: 1px solid rgba(99,102,241,0.15);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 25px 45px rgba(0,0,0,0.4);
        border-color: rgba(99,102,241,0.5);
    }

    .status-strip {
        ${tw`absolute right-0 top-0 h-full w-1 rounded-tr-xl rounded-br-xl`};
        ${({ $status }) =>
            !$status || $status === 'offline'
                ? tw`bg-red-500`
                : $status === 'running'
                ? tw`bg-green-500`
                : tw`bg-yellow-400`};
    }
`;

type Timer = ReturnType<typeof setInterval>;

export default ({ server, className }: { server: Server; className?: string }) => {
    const interval = useRef<Timer | null>(null);
    const [stats, setStats] = useState<ServerStats | null>(null);
    const [isSuspended, setIsSuspended] = useState(
        server.status === 'suspended'
    );

    const fetchStats = () =>
        getServerResourceUsage(server.uuid)
            .then((data) => setStats(data))
            .catch(() => null);

    useEffect(() => {
        setIsSuspended(
            stats?.isSuspended || server.status === 'suspended'
        );
    }, [stats?.isSuspended, server.status]);

    useEffect(() => {
        if (isSuspended) return;

        fetchStats();
        interval.current = setInterval(fetchStats, 30000);

        return () => {
            if (interval.current) clearInterval(interval.current);
        };
    }, [isSuspended]);

    const alarms = { cpu: false, memory: false, disk: false };
    if (stats) {
        alarms.cpu =
            server.limits.cpu !== 0 &&
            stats.cpuUsagePercent >= server.limits.cpu * 0.9;

        alarms.memory = isAlarmState(
            stats.memoryUsageInBytes,
            server.limits.memory
        );

        alarms.disk =
            server.limits.disk !== 0 &&
            isAlarmState(stats.diskUsageInBytes, server.limits.disk);
    }

    return (
        <ServerCard
            to={`/server/${server.id}`}
            className={className}
            $status={stats?.status}
        >
            {/* LEFT INFO */}
            <div className="col-span-12 sm:col-span-6 flex items-center gap-4">
                <div className="coramtix-icon">
                    <FontAwesomeIcon icon={faServer} />
                </div>
                <div>
                    <h3 className="coramtix-title">{server.name}</h3>
                    {server.description && (
                        <p className="coramtix-sub">
                            {server.description}
                        </p>
                    )}
                </div>
            </div>

            {/* IP */}
            <div className="hidden lg:flex col-span-2 items-center justify-center coramtix-muted">
                <FontAwesomeIcon icon={faEthernet} />
                <span className="ml-2">
                    {server.allocations
                        .filter((a) => a.isDefault)
                        .map(
                            (a) =>
                                `${a.alias || ip(a.ip)}:${a.port}`
                        )}
                </span>
            </div>

            {/* STATS */}
            <div className="col-span-12 lg:col-span-4 flex justify-center gap-6">
                {!stats || isSuspended ? (
                    <Spinner size="small" />
                ) : (
                    <>
                        <div className="coramtix-stat">
                            <StatIcon
                                icon={faMicrochip}
                                $alarm={alarms.cpu}
                            />
                            <StatText $alarm={alarms.cpu}>
                                {stats.cpuUsagePercent.toFixed(1)}%
                            </StatText>
                        </div>

                        <div className="coramtix-stat">
                            <StatIcon
                                icon={faMemory}
                                $alarm={alarms.memory}
                            />
                            <StatText $alarm={alarms.memory}>
                                {bytesToString(
                                    stats.memoryUsageInBytes
                                )}
                            </StatText>
                        </div>

                        <div className="coramtix-stat">
                            <StatIcon
                                icon={faHdd}
                                $alarm={alarms.disk}
                            />
                            <StatText $alarm={alarms.disk}>
                                {bytesToString(
                                    stats.diskUsageInBytes
                                )}
                            </StatText>
                        </div>
                    </>
                )}
            </div>

            <div className="status-strip" />
        </ServerCard>
    );
};
