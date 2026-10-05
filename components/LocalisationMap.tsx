"use client";

import { useEffect, useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type MapPoint = {
    name: string;
    lat: number;
    lng: number;
};

const pinSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';

function makeIcon(active: boolean) {
    const size = active ? 44 : 34;
    const cls = active
        ? "bg-primary text-primary-content ring-4 ring-primary/25 shadow-lg"
        : "bg-base-100 text-base-content/70 ring-1 ring-base-300 shadow-md";
    return L.divIcon({
        className: "",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        html: `<div class="flex h-full w-full items-center justify-center rounded-full transition-all ${cls}">${pinSvg}</div>`,
    });
}

function FlyTo({ point }: { point: MapPoint }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo([point.lat, point.lng], 14, { duration: 1.2 });
    }, [map, point.lat, point.lng]);
    return null;
}

export default function LocalisationMap({
    points,
    activeIndex,
    onSelect,
}: {
    points: MapPoint[];
    activeIndex: number;
    onSelect: (i: number) => void;
}) {
    const active = points[activeIndex];
    const activeIcon = useMemo(() => makeIcon(true), []);
    const idleIcon = useMemo(() => makeIcon(false), []);

    return (
        <MapContainer
            center={[active.lat, active.lng]}
            zoom={13}
            scrollWheelZoom={false}
            dragging={!L.Browser.mobile}
            zoomControl={false}
            className="h-full w-full bg-base-200"
        >
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={19}
                className="saturate-[0.6] contrast-[0.95]"
            />

            {points.map((p, i) => (
                <Marker
                    key={p.name}
                    position={[p.lat, p.lng]}
                    icon={i === activeIndex ? activeIcon : idleIcon}
                    zIndexOffset={i === activeIndex ? 1000 : 0}
                    eventHandlers={{ click: () => onSelect(i) }}
                />
            ))}

            <FlyTo point={active} />
        </MapContainer>
    );
}