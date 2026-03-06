import { useState, useEffect, useRef, useCallback } from "react";

// ── LOGO SVG (matches the isometric cube style of the brand) ──────────────
const LogoSVG = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    {/* Outer glow */}
    <circle cx="24" cy="24" r="22" fill="url(#logoGlow)" opacity="0.15"/>
    {/* Isometric cube faces */}
    <polygon points="24,6 40,15 40,33 24,42 8,33 8,15" fill="url(#cubeBg)" stroke="url(#cubeStroke)" strokeWidth="0.5"/>
    {/* Top face */}
    <polygon points="24,6 40,15 24,24 8,15" fill="url(#topFace)"/>
    {/* Right face */}
    <polygon points="40,15 40,33 24,42 24,24" fill="url(#rightFace)"/>
    {/* Left face */}
    <polygon points="8,15 24,24 24,42 8,33" fill="url(#leftFace)"/>
    {/* Circuit lines on top */}
    <line x1="24" y1="10" x2="24" y2="20" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.7"/>
    <line x1="18" y1="13" x2="30" y2="17" stroke="#0ea5e9" strokeWidth="0.8" opacity="0.7"/>
    <circle cx="24" cy="15" r="1.5" fill="#0ea5e9" opacity="0.9"/>
    <circle cx="30" cy="17" r="1" fill="#38bdf8" opacity="0.8"/>
    <circle cx="18" cy="13" r="1" fill="#38bdf8" opacity="0.8"/>
    {/* Circuit on right */}
    <line x1="35" y1="22" x2="28" y2="34" stroke="#0369a1" strokeWidth="0.8" opacity="0.5"/>
    <circle cx="35" cy="22" r="1" fill="#0369a1" opacity="0.7"/>
    {/* Circuit on left */}
    <line x1="13" y1="22" x2="20" y2="34" stroke="#075985" strokeWidth="0.8" opacity="0.5"/>
    <circle cx="20" cy="34" r="1" fill="#075985" opacity="0.7"/>
    <defs>
      <radialGradient id="logoGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0ea5e9"/>
        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="cubeBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e0f2fe"/>
        <stop offset="100%" stopColor="#bae6fd"/>
      </linearGradient>
      <linearGradient id="cubeStroke" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0ea5e9"/>
        <stop offset="100%" stopColor="#0284c7"/>
      </linearGradient>
      <linearGradient id="topFace" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.6"/>
      </linearGradient>
      <linearGradient id="rightFace" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#0284c7" stopOpacity="0.7"/>
      </linearGradient>
      <linearGradient id="leftFace" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="#0369a1" stopOpacity="0.6"/>
      </linearGradient>
    </defs>
  </svg>
);

// ── ICONS ────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const icons = {
    snowflake: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="m17 7-5-5-5 5"/><path d="m17 17-5 5-5-5"/><line x1="2" y1="12" x2="22" y2="12"/><path d="m7 7-5 5 5 5"/><path d="m17 7 5 5-5 5"/><path d="m7 17-3-3 3-3"/><path d="m17 7 3 3-3 3"/></svg>,
    droplets: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>,
    zap: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    zapOff: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.513 4.856 13 2l-1 8h9L11 22l.5-4"/><path d="m2 2 20 20"/><path d="M8.5 8.5 3 14h6.5"/></svg>,
    lock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    unlock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>,
    alertTriangle: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    checkCircle: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    database: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
    wifi: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    cpu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="6" height="6"/><rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/></svg>,
    trendingDown: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  };
  return icons[name] || null;
};

// ── DEMO DATA ────────────────────────────────────────────────────
const POINTS = [
  { id: 1, codigo: "PC-01", nombre: "Punto Frío 1", ubicacion: "Almacén A — Vacunas",       temp_min: -8,  temp_max: 2,   hum_min: 30, hum_max: 60, color: "#0ea5e9" },
  { id: 2, codigo: "PC-02", nombre: "Punto Frío 2", ubicacion: "Almacén B — Medicamentos",  temp_min: 2,   temp_max: 8,   hum_min: 35, hum_max: 65, color: "#0284c7" },
  { id: 3, codigo: "PC-03", nombre: "Punto Frío 3", ubicacion: "Almacén C — Biológicos",    temp_min: -20, temp_max: -15, hum_min: 20, hum_max: 50, color: "#0369a1" },
];

function initState() {
  return POINTS.map(p => ({
    ...p,
    temp: (p.temp_min + p.temp_max) / 2,
    hum: (p.hum_min + p.hum_max) / 2,
    power: true,
    door: false,
    history: Array(24).fill((p.temp_min + p.temp_max) / 2),
  }));
}

// ── MINI SPARKLINE ───────────────────────────────────────────────
function Sparkline({ data, tempMin, tempMax, color }) {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length < 2) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    const min = Math.min(...data) - 0.5;
    const max = Math.max(...data) + 0.5;
    const range = max - min || 1;
    const step = W / (data.length - 1);
    ctx.clearRect(0, 0, W, H);

    // Safe zone
    const sy1 = H - ((tempMax - min) / range) * H;
    const sy2 = H - ((tempMin - min) / range) * H;
    ctx.fillStyle = "rgba(14,165,233,0.06)";
    ctx.fillRect(0, Math.max(0, sy1), W, Math.min(H, sy2) - Math.max(0, sy1));

    // Line
    const pts = data.map((v, i) => ({ x: i * step, y: H - ((v - min) / range) * H }));
    const grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0, color + "50");
    grad.addColorStop(1, color);
    ctx.beginPath();
    pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = grad; ctx.lineWidth = 2; ctx.lineJoin = "round"; ctx.stroke();

    // Fill area
    ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
    ctx.fillStyle = color + "12"; ctx.fill();

    // Last dot
    const l = pts[pts.length - 1];
    ctx.beginPath(); ctx.arc(l.x, l.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();
    ctx.beginPath(); ctx.arc(l.x, l.y, 5.5, 0, Math.PI * 2);
    ctx.strokeStyle = color + "40"; ctx.lineWidth = 2; ctx.stroke();
  }, [data, tempMin, tempMax, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: 52, display: "block" }}
    />
  );
}

// ── STATUS BADGE ─────────────────────────────────────────────────
function StatusBadge({ ok, label, okLabel, failLabel, icon, failIcon }) {
  return (
    <div style={{
      flex: 1,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
      padding: "8px 10px",
      borderRadius: 8,
      background: ok ? "#f0fdf4" : "#fff1f2",
      border: `1.5px solid ${ok ? "#bbf7d0" : "#fecdd3"}`,
      color: ok ? "#16a34a" : "#e11d48",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      transition: "all 0.3s",
      animation: !ok ? "failPulse 1s infinite" : "none",
    }}>
      <Icon name={ok ? icon : failIcon} size={13} color={ok ? "#16a34a" : "#e11d48"} />
      {ok ? okLabel : failLabel}
    </div>
  );
}

// ── COLD POINT CARD ──────────────────────────────────────────────
function ColdCard({ point, index }) {
  const tMin = point.temp_min; const tMax = point.temp_max;
  const hMin = point.hum_min;  const hMax = point.hum_max;
  const t = point.temp; const h = point.hum;

  const tempStatus = t < tMin - 2 || t > tMax + 2 ? "danger"
    : t < tMin || t > tMax ? "warn" : "ok";
  const humStatus  = h < hMin || h > hMax ? "warn" : "ok";
  const isCritical = !point.power || tempStatus === "danger";
  const isWarning  = point.door || tempStatus === "warn" || humStatus === "warn";

  const tempColor = tempStatus === "danger" ? "#e11d48" : tempStatus === "warn" ? "#d97706" : point.color;
  const humColor  = humStatus === "warn" ? "#d97706" : point.color;

  return (
    <div style={{
      background: "#ffffff",
      borderRadius: 16,
      border: isCritical ? "2px solid #fecdd3"
            : isWarning  ? "2px solid #fde68a"
            : "2px solid #e0f2fe",
      boxShadow: isCritical ? "0 4px 24px rgba(225,29,72,0.10)"
               : isWarning  ? "0 4px 24px rgba(217,119,6,0.08)"
               : "0 4px 24px rgba(14,165,233,0.08)",
      overflow: "hidden",
      transition: "all 0.3s",
      animation: isCritical ? "cardPulse 2s infinite" : "none",
      animationDelay: `${index * 0.15}s`,
    }}>
      {/* Card top accent bar */}
      <div style={{
        height: 4,
        background: isCritical ? "linear-gradient(90deg,#e11d48,#fb7185)"
                  : isWarning  ? "linear-gradient(90deg,#d97706,#fbbf24)"
                  : `linear-gradient(90deg,${point.color},#38bdf8)`,
      }} />

      {/* Header */}
      <div style={{
        padding: "16px 20px 12px",
        borderBottom: "1px solid #f0f9ff",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: isCritical ? "#e11d48" : isWarning ? "#d97706" : "#22c55e",
              boxShadow: `0 0 6px ${isCritical ? "#e11d48" : isWarning ? "#d97706" : "#22c55e"}`,
              animation: "pulse 2s infinite",
            }} />
            <span style={{ fontSize: 15, fontWeight: 800, color: "#0c4a6e", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em" }}>
              {point.nombre}
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#7ea9be", letterSpacing: "0.04em" }}>{point.ubicacion}</div>
        </div>
        <div style={{
          padding: "3px 10px", borderRadius: 20,
          background: "#f0f9ff", border: "1px solid #bae6fd",
          fontSize: 11, fontWeight: 700, color: point.color, letterSpacing: "0.08em",
        }}>
          {point.codigo}
        </div>
      </div>

      {/* Metrics */}
      <div style={{ padding: "14px 20px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {/* Temp */}
        <div style={{
          background: "#f8faff", borderRadius: 10, padding: "12px 14px",
          border: `1px solid ${tempColor}20`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
            <Icon name="snowflake" size={12} color={tempColor} />
            <span style={{ fontSize: 10, color: "#7ea9be", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>Temperatura</span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: tempColor, fontFamily: "'Syne', sans-serif", lineHeight: 1, transition: "color 0.3s" }}>
            {t > 0 ? "+" : ""}{t.toFixed(1)}
            <span style={{ fontSize: 13, fontWeight: 500, color: "#94bad0", marginLeft: 2 }}>°C</span>
          </div>
          <div style={{ fontSize: 10, color: "#b0cedd", marginTop: 4 }}>
            Rango: {tMin}°C — {tMax}°C
          </div>
        </div>

        {/* Humidity */}
        <div style={{
          background: "#f8faff", borderRadius: 10, padding: "12px 14px",
          border: `1px solid ${humColor}20`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
            <Icon name="droplets" size={12} color={humColor} />
            <span style={{ fontSize: 10, color: "#7ea9be", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600 }}>Humedad</span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: humColor, fontFamily: "'Syne', sans-serif", lineHeight: 1, transition: "color 0.3s" }}>
            {h.toFixed(1)}
            <span style={{ fontSize: 13, fontWeight: 500, color: "#94bad0", marginLeft: 2 }}>%RH</span>
          </div>
          <div style={{ fontSize: 10, color: "#b0cedd", marginTop: 4 }}>
            Rango: {hMin}% — {hMax}%
          </div>
        </div>
      </div>

      {/* Status pills */}
      <div style={{ padding: "10px 20px", display: "flex", gap: 8 }}>
        <StatusBadge ok={point.power} icon="zap" failIcon="zapOff" okLabel="Energía OK" failLabel="Sin Energía" />
        <StatusBadge ok={!point.door} icon="lock" failIcon="unlock" okLabel="Puerta Cerrada" failLabel="Puerta Abierta" />
      </div>

      {/* Sparkline */}
      <div style={{ padding: "0 20px 6px" }}>
        <div style={{ fontSize: 10, color: "#b0cedd", marginBottom: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Historial de Temperatura
        </div>
        <Sparkline data={point.history} tempMin={tMin} tempMax={tMax} color={point.color} />
      </div>

      {/* Footer */}
      <div style={{
        padding: "8px 20px 12px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontSize: 10, color: "#b0cedd",
        borderTop: "1px solid #f0f9ff",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Icon name="cpu" size={11} color="#b0cedd" />
          <span>Arduino → MariaDB</span>
        </div>
        <span>Últ. lectura: ahora</span>
      </div>
    </div>
  );
}

// ── ALERT ITEM ───────────────────────────────────────────────────
function AlertItem({ alert }) {
  const colors = {
    red:   { bg: "#fff1f2", border: "#fecdd3", dot: "#e11d48", text: "#9f1239" },
    amber: { bg: "#fffbeb", border: "#fde68a", dot: "#d97706", text: "#92400e" },
    green: { bg: "#f0fdf4", border: "#bbf7d0", dot: "#16a34a", text: "#14532d" },
  };
  const c = colors[alert.type] || colors.green;
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 12,
      padding: "10px 18px", borderBottom: "1px solid #f0f9ff",
      transition: "background 0.2s",
    }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.dot, flexShrink: 0, marginTop: 4 }} />
      <div style={{ flex: 1, fontSize: 12, color: "#334155", lineHeight: 1.5 }}>{alert.msg}</div>
      <div style={{ fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap" }}>{alert.time}</div>
    </div>
  );
}

// ── STAT CARD ────────────────────────────────────────────────────
function StatCard({ label, value, icon, color, subtext }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 12, padding: "16px 20px",
      border: "1.5px solid #e0f2fe",
      boxShadow: "0 2px 12px rgba(14,165,233,0.06)",
      display: "flex", alignItems: "center", gap: 14,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: color + "15", display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <Icon name={icon} size={20} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 11, color: "#7ea9be", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#0c4a6e", fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>{value}</div>
        {subtext && <div style={{ fontSize: 10, color: "#94bad0", marginTop: 2 }}>{subtext}</div>}
      </div>
    </div>
  );
}

// ── SMTP MODAL ───────────────────────────────────────────────────
function SmtpModal({ open, onClose, alertData }) {
  const [sent, setSent] = useState(false);
  const [to, setTo]     = useState("supervisor@thermochain.com");

  useEffect(() => { if (open) setSent(false); }, [open]);
  if (!open) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(15,52,74,0.35)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 16, width: "100%", maxWidth: 500,
        boxShadow: "0 20px 60px rgba(14,165,233,0.15)",
        border: "1.5px solid #bae6fd",
        animation: "slideUp 0.25s ease",
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #f0f9ff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#fff1f2", border: "1px solid #fecdd3", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="mail" size={18} color="#e11d48" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#0c4a6e", fontFamily: "'Syne', sans-serif" }}>Configuración SMTP Gmail</div>
              <div style={{ fontSize: 11, color: "#7ea9be" }}>Alertas automáticas por correo</div>
            </div>
          </div>
          <button onClick={onClose} style={{ border: "1px solid #e0f2fe", background: "#f8faff", borderRadius: 8, padding: 6, cursor: "pointer" }}>
            <Icon name="x" size={16} color="#7ea9be" />
          </button>
        </div>

        <div style={{ padding: 22 }}>
          {/* SMTP info */}
          <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 12, color: "#0369a1", lineHeight: 1.7 }}>
            <strong>smtp.gmail.com</strong> · Puerto 587 (STARTTLS)<br/>
            Configurar en <code style={{ background: "#e0f2fe", padding: "1px 5px", borderRadius: 3 }}>.env</code>: <code style={{ background: "#e0f2fe", padding: "1px 5px", borderRadius: 3 }}>SMTP_USER</code> / <code style={{ background: "#e0f2fe", padding: "1px 5px", borderRadius: 3 }}>SMTP_PASS</code> (App Password)
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            {[
              { label: "Remitente (Gmail)", placeholder: "alertas@thermochain.com", type: "email" },
              { label: "App Password", placeholder: "xxxx xxxx xxxx xxxx", type: "password" },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize: 11, color: "#7ea9be", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>{f.label}</div>
                <input type={f.type} placeholder={f.placeholder} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e0f2fe", borderRadius: 8, fontSize: 12, color: "#0c4a6e", background: "#f8faff", outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#7ea9be", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>Destinatario(s)</div>
            <input type="email" value={to} onChange={e => setTo(e.target.value)} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e0f2fe", borderRadius: 8, fontSize: 12, color: "#0c4a6e", background: "#f8faff", outline: "none", boxSizing: "border-box" }} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: "#7ea9be", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>Vista previa del mensaje</div>
            <textarea readOnly rows={4} defaultValue={alertData} style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e0f2fe", borderRadius: 8, fontSize: 11, color: "#334155", background: "#f8faff", resize: "none", outline: "none", boxSizing: "border-box", lineHeight: 1.6 }} />
          </div>

          <button onClick={() => setSent(true)} style={{
            width: "100%", padding: 12, borderRadius: 10, border: "none", cursor: "pointer",
            background: sent ? "linear-gradient(135deg,#16a34a,#22c55e)" : "linear-gradient(135deg,#0284c7,#0ea5e9)",
            color: "#fff", fontSize: 14, fontWeight: 800, fontFamily: "'Syne', sans-serif",
            letterSpacing: "0.03em", transition: "all 0.3s",
            boxShadow: sent ? "0 4px 16px rgba(22,163,74,0.25)" : "0 4px 16px rgba(2,132,199,0.25)",
          }}>
            {sent ? "✅ Enviado (Simulación)" : "📨 Simular Envío de Alerta"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── CONFIG PANEL ─────────────────────────────────────────────────
function ConfigPanel({ open }) {
  if (!open) return null;
  return (
    <div style={{
      background: "#fff", borderRadius: 14, border: "1.5px solid #bae6fd",
      marginBottom: 20, overflow: "hidden",
      boxShadow: "0 4px 20px rgba(14,165,233,0.08)",
      animation: "slideDown 0.2s ease",
    }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid #f0f9ff", background: "#f0f9ff" }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#0c4a6e", fontFamily: "'Syne', sans-serif" }}>
          ⚙ Configuración de Umbrales y Sistema
        </div>
      </div>
      <div style={{ padding: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
        {[
          { label: "Temperatura PC-01 (°C)", min: "-8", max: "2" },
          { label: "Temperatura PC-02 (°C)", min: "2",  max: "8" },
          { label: "Temperatura PC-03 (°C)", min: "-20",max: "-15" },
          { label: "Humedad (% RH)",          min: "30", max: "60" },
        ].map(f => (
          <div key={f.label}>
            <div style={{ fontSize: 11, color: "#7ea9be", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{f.label}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input defaultValue={f.min} style={{ flex: 1, padding: "7px 10px", border: "1.5px solid #e0f2fe", borderRadius: 7, fontSize: 12, color: "#0c4a6e", background: "#f8faff", outline: "none", textAlign: "center" }} />
              <span style={{ fontSize: 11, color: "#b0cedd" }}>a</span>
              <input defaultValue={f.max} style={{ flex: 1, padding: "7px 10px", border: "1.5px solid #e0f2fe", borderRadius: 7, fontSize: 12, color: "#0c4a6e", background: "#f8faff", outline: "none", textAlign: "center" }} />
            </div>
          </div>
        ))}
        <div>
          <div style={{ fontSize: 11, color: "#7ea9be", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>URL API (Node.js)</div>
          <input defaultValue="http://localhost:3000/api/dashboard" style={{ width: "100%", padding: "7px 10px", border: "1.5px solid #e0f2fe", borderRadius: 7, fontSize: 11, color: "#0c4a6e", background: "#f8faff", outline: "none", boxSizing: "border-box" }} />
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────
export default function App() {
  const [points, setPoints]         = useState(initState);
  const [logs, setLogs]             = useState([]);
  const [alertCount, setAlertCount] = useState(0);
  const [time, setTime]             = useState(new Date());
  const [showConfig, setShowConfig] = useState(false);
  const [showSmtp, setShowSmtp]     = useState(false);
  const [smtpData, setSmtpData]     = useState("");
  const [dbMode, setDbMode]         = useState("demo"); // demo | live
  const [totalReadings, setTotal]   = useState(0);
  const [criticalBanner, setCritical] = useState(null);
  const debounce = useRef({});

  const addLog = useCallback((type, msg) => {
    const t = new Date().toLocaleTimeString("es-PA", { hour12: false });
    setLogs(prev => [{ type, msg, time: t, id: Date.now() }, ...prev].slice(0, 60));
  }, []);

  const deb = useCallback((key, ms = 12000) => {
    const now = Date.now();
    if (debounce.current[key] && now - debounce.current[key] < ms) return true;
    debounce.current[key] = now;
    return false;
  }, []);

  // Clock
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    addLog("green", "✅ ThermoChain Solutions — Sistema iniciado. Arduino conectado.");
    return () => clearInterval(t);
  }, []);

  // Simulate sensor data
  useEffect(() => {
    const interval = setInterval(() => {
      setTotal(n => n + 3);
      let criticals = [];

      setPoints(prev => prev.map(s => {
        const newTemp = Math.round((s.temp + (Math.random() - 0.49) * 0.5) * 10) / 10;
        const newHum  = Math.round(Math.max(15, Math.min(95, s.hum + (Math.random() - 0.5) * 1.5)) * 10) / 10;
        const power   = Math.random() < 0.006 ? !s.power : s.power;
        const door    = Math.random() < 0.005 ? !s.door  : s.door;
        const history = [...s.history.slice(1), newTemp];

        if (!power && !deb(`power-${s.id}`)) {
          addLog("red", `🔴 ${s.nombre} — FALLO DE ENERGÍA. Alerta SMTP activada.`);
          criticals.push(s.nombre);
          setSmtpData(`ALERTA CRÍTICA — ${s.nombre}\nFallo de energía: ${new Date().toLocaleString()}\nTemp: ${newTemp}°C | Hum: ${newHum}%`);
          setTimeout(() => setShowSmtp(true), 300);
        }
        if (door && !deb(`door-${s.id}`)) {
          addLog("amber", `🔓 ${s.nombre} — Puerta ABIERTA detectada por sensor.`);
        }
        const tMin = s.temp_min; const tMax = s.temp_max;
        if ((newTemp > tMax + 2 || newTemp < tMin - 2) && !deb(`tempd-${s.id}`))
          addLog("red", `🌡 ${s.nombre} — Temperatura crítica: ${newTemp}°C`);
        else if ((newTemp > tMax || newTemp < tMin) && !deb(`tempw-${s.id}`))
          addLog("amber", `⚠ ${s.nombre} — Temperatura en límite: ${newTemp}°C`);

        return { ...s, temp: newTemp, hum: newHum, power, door, history };
      }));

      setCritical(criticals.length ? criticals.join(", ") : null);
    }, 5000);
    return () => clearInterval(interval);
  }, [addLog, deb]);

  const activeAlerts = points.filter(p => !p.power || p.door || p.temp > p.temp_max + 2 || p.temp < p.temp_min - 2).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0f9ff; font-family: 'Space Mono', monospace; }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:.4;} }
        @keyframes failPulse { 0%,100%{opacity:1;} 50%{opacity:.8;} }
        @keyframes cardPulse { 0%,100%{box-shadow:0 4px 24px rgba(225,29,72,0.10);} 50%{box-shadow:0 4px 32px rgba(225,29,72,0.22);} }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-10px);} to{opacity:1;transform:translateY(0);} }
        @keyframes bannerSlide { from{opacity:0;transform:translateY(-100%);} to{opacity:1;transform:translateY(0);} }
        input:focus { border-color: #0ea5e9 !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f0f9ff; }
        ::-webkit-scrollbar-thumb { background: #bae6fd; border-radius: 5px; }
      `}</style>

      {/* CRITICAL BANNER */}
      {criticalBanner && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          background: "linear-gradient(90deg,#e11d48,#f43f5e)",
          padding: "10px 24px", display: "flex", alignItems: "center", gap: 12,
          fontSize: 12, color: "#fff", fontWeight: 700, letterSpacing: "0.05em",
          animation: "bannerSlide 0.3s ease",
          boxShadow: "0 4px 20px rgba(225,29,72,0.4)",
        }}>
          <Icon name="alertTriangle" size={16} color="#fff" />
          ⚠ ALERTA CRÍTICA — {criticalBanner.toUpperCase()} — SIN ENERGÍA — NOTIFICACIÓN SMTP ENVIADA
          <button onClick={() => setCritical(null)} style={{ marginLeft: "auto", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 6, padding: "3px 10px", color: "#fff", cursor: "pointer", fontSize: 11 }}>
            Descartar
          </button>
        </div>
      )}

      <div style={{ paddingTop: criticalBanner ? 48 : 0, minHeight: "100vh", background: "linear-gradient(160deg,#f0f9ff 0%,#e0f2fe 40%,#f8faff 100%)" }}>

        {/* HEADER */}
        <header style={{
          background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)",
          borderBottom: "1.5px solid #e0f2fe",
          padding: "14px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 12,
          boxShadow: "0 2px 16px rgba(14,165,233,0.08)",
          position: "sticky", top: criticalBanner ? 48 : 0, zIndex: 100,
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <LogoSVG />
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.25rem", color: "#0c4a6e", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Thermo<span style={{ color: "#0ea5e9" }}>Chain</span>
                <span style={{ color: "#475569", fontWeight: 600 }}> Solutions</span>
              </div>
              <div style={{ fontSize: "0.58rem", color: "#7ea9be", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Monitoreo Cadena de Frío Farmacéutica
              </div>
            </div>
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {/* DB badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6, padding: "5px 12px",
              borderRadius: 20, border: `1.5px solid ${dbMode === "live" ? "#bbf7d0" : "#fde68a"}`,
              background: dbMode === "live" ? "#f0fdf4" : "#fffbeb",
              fontSize: 11, fontWeight: 700,
              color: dbMode === "live" ? "#16a34a" : "#d97706",
              cursor: "pointer",
            }} onClick={() => { setDbMode(d => d === "demo" ? "live" : "demo"); addLog("green", dbMode === "demo" ? "🔌 Cambiado a modo Live (MariaDB)" : "🖥 Cambiado a modo Demo"); }}>
              <Icon name="database" size={12} color={dbMode === "live" ? "#16a34a" : "#d97706"} />
              {dbMode === "live" ? "MariaDB Live" : "Demo"}
            </div>

            {/* Alert badge */}
            {activeAlerts > 0 && (
              <div style={{
                display: "flex", alignItems: "center", gap: 6, padding: "5px 12px",
                borderRadius: 20, border: "1.5px solid #fecdd3", background: "#fff1f2",
                fontSize: 11, fontWeight: 700, color: "#e11d48",
                animation: "pulse 1.5s infinite",
              }}>
                <Icon name="bell" size={12} color="#e11d48" />
                {activeAlerts} Alerta{activeAlerts > 1 ? "s" : ""}
              </div>
            )}

            <button onClick={() => setShowConfig(c => !c)} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 8,
              background: showConfig ? "#0ea5e9" : "#f0f9ff",
              border: "1.5px solid #bae6fd", cursor: "pointer",
              fontSize: 12, fontWeight: 600, color: showConfig ? "#fff" : "#0369a1",
              transition: "all 0.2s",
            }}>
              <Icon name="settings" size={13} color={showConfig ? "#fff" : "#0369a1"} />
              Umbrales
            </button>

            <button onClick={() => setShowSmtp(true)} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 8,
              background: "#f0f9ff", border: "1.5px solid #bae6fd",
              cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#0369a1",
            }}>
              <Icon name="mail" size={13} color="#0369a1" />
              SMTP
            </button>

            {/* Clock */}
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0c4a6e", fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>
                {time.toLocaleTimeString("es-PA", { hour12: false })}
              </div>
              <div style={{ fontSize: 10, color: "#7ea9be" }}>
                {time.toLocaleDateString("es-PA", { weekday: "short", month: "short", day: "numeric" })}
              </div>
            </div>

            {/* System active */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6, padding: "6px 14px",
              borderRadius: 20, background: "#f0fdf4", border: "1.5px solid #bbf7d0",
              fontSize: 11, fontWeight: 700, color: "#16a34a",
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite" }} />
              Sistema Activo
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 20px" }}>

          {/* Config panel */}
          <ConfigPanel open={showConfig} />

          {/* Stats strip */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12, marginBottom: 24,
          }}>
            <StatCard label="Lecturas Totales" value={totalReadings.toLocaleString()} icon="database" color="#0ea5e9" subtext="Desde inicio de sesión" />
            <StatCard label="Alertas Activas"  value={activeAlerts} icon="alertTriangle" color={activeAlerts > 0 ? "#e11d48" : "#16a34a"} subtext={activeAlerts === 0 ? "Todo normal" : "Requiere atención"} />
            <StatCard label="Fallos Energía"   value={points.filter(p => !p.power).length} icon="zapOff" color="#d97706" subtext="Puntos sin suministro" />
            <StatCard label="Puertas Abiertas" value={points.filter(p => p.door).length}  icon="unlock" color="#d97706" subtext="Sensores reed switch" />
          </div>

          {/* Dashboards */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, color: "#7ea9be", textTransform: "uppercase", letterSpacing: "0.18em", whiteSpace: "nowrap" }}>
                Puntos de Monitoreo Activos
              </span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#bae6fd,transparent)" }} />
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 18,
            }}>
              {points.map((p, i) => <ColdCard key={p.id} point={p} index={i} />)}
            </div>
          </div>

          {/* Alert history */}
          <div style={{ marginTop: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 11, color: "#7ea9be", textTransform: "uppercase", letterSpacing: "0.18em" }}>Registro de Eventos</span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#bae6fd,transparent)" }} />
              <div style={{
                padding: "3px 12px", borderRadius: 20,
                background: activeAlerts > 0 ? "#fff1f2" : "#f0fdf4",
                border: `1px solid ${activeAlerts > 0 ? "#fecdd3" : "#bbf7d0"}`,
                fontSize: 11, fontWeight: 700,
                color: activeAlerts > 0 ? "#e11d48" : "#16a34a",
              }}>
                {logs.length} eventos
              </div>
            </div>

            <div style={{
              background: "#fff", borderRadius: 14, border: "1.5px solid #e0f2fe",
              overflow: "hidden", boxShadow: "0 4px 20px rgba(14,165,233,0.06)",
            }}>
              <div style={{ padding: "12px 18px", background: "#f0f9ff", borderBottom: "1px solid #e0f2fe", display: "flex", alignItems: "center", gap: 10 }}>
                <Icon name="bell" size={14} color="#0369a1" />
                <span style={{ fontSize: 13, fontWeight: 800, color: "#0c4a6e", fontFamily: "'Syne', sans-serif" }}>Historial de Alertas</span>
                <span style={{ marginLeft: "auto", fontSize: 10, color: "#7ea9be" }}>Actualización: 5s</span>
              </div>
              <div style={{ maxHeight: 220, overflowY: "auto" }}>
                {logs.length === 0
                  ? <div style={{ padding: "20px 18px", fontSize: 12, color: "#94a3b8", textAlign: "center" }}>Sin eventos registrados.</div>
                  : logs.map(l => <AlertItem key={l.id} alert={l} />)
                }
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div style={{
            marginTop: 20, padding: "12px 18px", borderRadius: 10,
            background: "#fff", border: "1.5px solid #e0f2fe",
            display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
            fontSize: 11, color: "#7ea9be",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="cpu" size={13} color="#7ea9be" />
              Arduino → POST /api/lectura
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="database" size={13} color="#7ea9be" />
              MariaDB: thermochain
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="wifi" size={13} color="#7ea9be" />
              Node.js API :3000
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="mail" size={13} color="#7ea9be" />
              Alertas: smtp.gmail.com:587
            </div>
          </div>
        </main>

        <footer style={{ textAlign: "center", padding: "14px", fontSize: 10, color: "#b0cedd", borderTop: "1px solid #e0f2fe", background: "rgba(255,255,255,0.6)" }}>
          THERMOCHAIN SOLUTIONS v2.0 · MONITOREO CADENA DE FRÍO FARMACÉUTICA · MARIADB + ARDUINO + SMTP GMAIL
        </footer>
      </div>

      <SmtpModal open={showSmtp} onClose={() => setShowSmtp(false)} alertData={smtpData} />
    </>
  );
}
