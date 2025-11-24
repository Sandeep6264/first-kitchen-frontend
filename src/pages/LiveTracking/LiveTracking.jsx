// src/pages/LiveTracking.jsx
import React, { useState, useEffect } from "react";
import "./LiveTracking.css";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import bike from "../../../public/bike.png";

// Fix default leaflet marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom bike icon
const bikeIcon = new L.Icon({
    iconUrl: bike,
    iconSize: [55, 55],
    iconAnchor: [27, 50],
});

// Haversine formula for real distance
function getDistanceKm(a, b) {
    const R = 6371;
    const dLat = ((b[0] - a[0]) * Math.PI) / 180;
    const dLon = ((b[1] - a[1]) * Math.PI) / 180;

    const lat1 = (a[0] * Math.PI) / 180;
    const lat2 = (b[0] * Math.PI) / 180;

    const h =
        Math.sin(dLat / 2) ** 2 +
        Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

    return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export default function LiveTracking() {
    const customerPos = [28.6102, 77.2021];

    const [bikePos, setBikePos] = useState([28.6250, 77.2050]);
    const [eta, setEta] = useState(0);

    // Simulate backend rider movement
    useEffect(() => {
        const interval = setInterval(() => {
            setBikePos((prev) => {
                const dx = customerPos[0] - prev[0];
                const dy = customerPos[1] - prev[1];
                const d = Math.sqrt(dx * dx + dy * dy);

                if (d < 0.00015) return customerPos;

                return [
                    prev[0] + dx * 0.015, // smooth realistic move
                    prev[1] + dy * 0.015,
                ];
            });
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    // Calculate ETA based on real distance every time rider moves
    useEffect(() => {
        const km = getDistanceKm(bikePos, customerPos);
        const speed = 18; // 18 km/h avg delivery speed in cities

        if (km < 0.03) {
            setEta(0);
            return;
        }

        const minutes = Math.ceil((km / speed) * 60);
        setEta(minutes);
    }, [bikePos]);

    return (
        <div className="tracking-final">
            {/* HEADER */}
            <div className="top-header">
                <h2>Your Order is on the way!</h2>
                <div className="eta-display">
                    <span>Arriving in</span>
                    <strong>{eta === 0 ? "Arrived!" : `${eta} min`}</strong>
                </div>
            </div>

            {/* MAP */}
            <div className="map-section">
                <MapContainer center={bikePos} zoom={16} className="leaflet-map">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <Marker position={customerPos} />
                    <Marker position={bikePos} icon={bikeIcon} />

                    <Polyline
                        positions={[bikePos, customerPos]}
                        color="#ee2a24"
                        weight={6}
                        opacity={0.9}
                    />
                </MapContainer>
            </div>

            {/* DRIVER CARD */}
            <div className="bottom-driver-card">
                <div className="driver-details">
                    <div className="avatar">RK</div>
                    <div>
                        <h3>Rahul Kumar</h3>
                        <p>Activa • DL10AB1234</p>
                    </div>
                </div>
                <div className="driver-buttons">
                    <button className="call-btn">Call</button>
                    <button className="chat-btn">Chat</button>
                </div>
            </div>
        </div>
    );
}
